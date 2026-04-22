import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const envFirebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasEnvFirebaseConfig = Object.values(envFirebaseConfig).some(Boolean);

if (hasEnvFirebaseConfig) {
	const missingCoreFields = [
		['VITE_FIREBASE_API_KEY', envFirebaseConfig.apiKey],
		['VITE_FIREBASE_AUTH_DOMAIN', envFirebaseConfig.authDomain],
		['VITE_FIREBASE_PROJECT_ID', envFirebaseConfig.projectId],
		['VITE_FIREBASE_MESSAGING_SENDER_ID', envFirebaseConfig.messagingSenderId],
		['VITE_FIREBASE_APP_ID', envFirebaseConfig.appId],
	].filter(([, value]) => !value);

	if (missingCoreFields.length > 0) {
		throw new Error(`Missing Firebase environment variables: ${missingCoreFields.map(([name]) => name).join(', ')}`);
	}
}

const resolvedFirebaseConfig = hasEnvFirebaseConfig
	? envFirebaseConfig
	: firebaseConfig;

// When using env-based config, never fall back to the old checked-in database ID.
// Use the default Firestore database unless VITE_FIREBASE_DATABASE_ID is explicitly set.
const firestoreDatabaseId = hasEnvFirebaseConfig
  ? (import.meta.env.VITE_FIREBASE_DATABASE_ID || undefined)
  : (import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || undefined);

const app = initializeApp(resolvedFirebaseConfig);
export const db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
export const auth = getAuth(app);

export default app;
