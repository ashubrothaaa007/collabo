import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY || 'dummy_api_key',
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'dummy_auth_domain',
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID || 'dummy_project_id',
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'dummy_storage_bucket',
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'dummy_messaging_sender_id',
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID || 'dummy_app_id'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
