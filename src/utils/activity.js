import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'

// Writes an audit entry. Failures never block the main operation.
export function logActivity(actor, { action, collectionName, itemId, summary }) {
  if (!actor?.uid) return Promise.resolve()

  return addDoc(collection(db, 'activityLogs'), {
    actorUid: actor.uid,
    actorName: actor.name || actor.email || '',
    actorRole: actor.role || '',
    action,
    collection: collectionName,
    itemId: itemId || '',
    summary: (summary || '').slice(0, 200),
    createdAt: serverTimestamp(),
  }).catch(() => {})
}
