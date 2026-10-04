import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default configuration with environment variables or fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyApiKeyForSkillGapSimulator2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "skillgap-simulator.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "skillgap-simulator",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "skillgap-simulator.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:109876543210:web:abcdef1234567890"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
