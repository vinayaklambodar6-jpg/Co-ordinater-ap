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
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// Subscribes to a Firestore collection in real time and exposes write helpers.
// Set `enabled` to false to skip the subscription (for example while signed out).
export function useFirestoreCollection(
  name,
  { orderField = 'createdAt', direction = 'desc', enabled = true } = {},
) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!enabled) {
      setItems([])
      setLoading(false)
      setError('')
      return undefined
    }

    const collectionQuery = query(collection(db, name), orderBy(orderField, direction))

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
        setLoading(false)
        setError('')
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [name, orderField, direction, enabled])

  async function addItem(data) {
    await addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() })
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
  }

  async function updateItem(id, data) {
    await updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() })
  }

  async function removeItem(id) {
    await deleteDoc(doc(db, name, id))
  }

  return { items, loading, error, addItem, addMany, updateItem, removeItem }
}
