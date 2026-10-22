import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// Subscribes to a Firestore collection in real time and exposes an add helper.
export function useFirestoreCollection(name) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const collectionQuery = query(collection(db, name), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        setLoading(false)
        setError('')
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [name])

  async function addItem(data) {
    await addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() })
  }

  return { items, loading, error, addItem }
}
