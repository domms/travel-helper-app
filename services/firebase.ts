import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
  storageBucket: FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
