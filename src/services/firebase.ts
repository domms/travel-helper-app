import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // Add other required fields if needed (e.g., authDomain, storageBucket)
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
