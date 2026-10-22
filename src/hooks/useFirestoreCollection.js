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

  async function updateItem(id, data) {
    await updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() })
  }

  async function removeItem(id) {
    await deleteDoc(doc(db, name, id))
  }

  return { items, loading, error, addItem, updateItem, removeItem }
}
