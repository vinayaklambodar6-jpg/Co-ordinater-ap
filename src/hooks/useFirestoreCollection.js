import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { logActivity } from '../utils/activity.js'

function timestampValue(value) {
  if (!value) return 0
  if (typeof value.toMillis === 'function') return value.toMillis()
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

function summarize(data) {
  const keys = ['title', 'name', 'classSection', 'subject', 'chapter', 'period', 'status', 'role', 'type']
  return keys
    .filter((key) => data?.[key] !== undefined && data[key] !== '')
    .map((key) => `${key}: ${String(data[key]).slice(0, 40)}`)
    .join(', ')
    .slice(0, 180)
}

// Subscribes to a Firestore collection in real time and exposes write helpers.
// Optional `filter` scopes the query for role-based access (e.g. a teacher's own
// tasks), and `actor` is used to write activity audit entries.
export function useFirestoreCollection(
  name,
  { orderField = 'createdAt', direction = 'desc', enabled = true, filter = null, actor = null } = {},
) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const filterField = filter?.field ?? ''
  const filterValue = filter?.value ?? ''

  useEffect(() => {
    if (!enabled) {
      setItems([])
      setLoading(false)
      setError('')
      return undefined
    }

    const base = collection(db, name)
    const scoped = filterField && filterValue !== ''
    const source = scoped
      ? query(base, where(filterField, '==', filterValue))
      : query(base, orderBy(orderField, direction))

    const unsubscribe = onSnapshot(
      source,
      (snapshot) => {
        let next = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))

        if (scoped) {
          next = next.sort((a, b) => {
            const delta = timestampValue(b[orderField]) - timestampValue(a[orderField])
            return direction === 'desc' ? delta : -delta
          })
        }

        setItems(next)
        setLoading(false)
        setError('')
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [name, orderField, direction, enabled, filterField, filterValue])

  async function addItem(data) {
    const reference = await addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() })
    logActivity(actor, {
      action: 'create',
      collectionName: name,
      itemId: reference.id,
      summary: summarize(data),
    })
    return reference
  }

  // Bulk insert (used by the NCERT syllabus import) in chunks of 400.
  async function addMany(items) {
    for (let start = 0; start < items.length; start += 400) {
      const batch = writeBatch(db)
      items.slice(start, start + 400).forEach((item) => {
        batch.set(doc(collection(db, name)), { ...item, createdAt: serverTimestamp() })
      })
      await batch.commit()
    }

    if (items.length) {
      logActivity(actor, {
        action: 'bulk-create',
        collectionName: name,
        itemId: '',
        summary: `${items.length} records imported`,
      })
    }
  }

  async function updateItem(id, data) {
    await updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() })
    logActivity(actor, {
      action: 'update',
      collectionName: name,
      itemId: id,
      summary: summarize(data),
    })
  }

  async function removeItem(id) {
    await deleteDoc(doc(db, name, id))
    logActivity(actor, {
      action: 'delete',
      collectionName: name,
      itemId: id,
      summary: 'record deleted',
    })
  }

  return { items, loading, error, addItem, addMany, updateItem, removeItem }
}
