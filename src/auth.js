import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from './firebase.js'

const googleProvider = new GoogleAuthProvider()

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signUpWithEmail(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  if (name) {
    await updateProfile(credential.user, { displayName: name })
  }
  return credential
}

export function logout() {
  return signOut(auth)
}

const MESSAGES = {
  'auth/invalid-credential': 'Email ya password galat hai.',
  'auth/wrong-password': 'Password galat hai.',
  'auth/user-not-found': 'Is email se koi account nahi mila.',
  'auth/invalid-email': 'Email address sahi nahi hai.',
  'auth/missing-password': 'Password bharein.',
  'auth/email-already-in-use': 'Is email se account pehle se bana hua hai — sign in karein.',
  'auth/weak-password': 'Password kam se kam 6 characters ka hona chahiye.',
  'auth/too-many-requests': 'Bahut zyada attempts ho gaye. Thodi der baad try karein.',
  'auth/popup-closed-by-user': 'Sign-in window band ho gayi. Dobara try karein.',
  'auth/popup-blocked': 'Browser ne popup block kiya. Popup allow karke dobara try karein.',
  'auth/unauthorized-domain':
    'Yeh domain Firebase Console mein authorized nahi hai. Authentication → Settings → Authorized domains mein add karein.',
  'auth/operation-not-allowed':
    'Yeh sign-in method Firebase Console mein enable nahi hai. Authentication → Sign-in method se enable karein.',
  'auth/network-request-failed': 'Network problem hai. Internet check karein.',
}

export function authErrorMessage(error) {
  const code = error?.code ?? ''
  if (MESSAGES[code]) return MESSAGES[code]
  return error?.message || 'Sign-in nahi hua. Dobara try karein.'
}
