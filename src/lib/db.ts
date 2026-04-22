import { 
  collection, 
  doc, 
  setDoc,
  updateDoc,
  deleteDoc,
  query, 
  where, 
  orderBy,
  onSnapshot,
  getDocs,
  writeBatch,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Project, Message } from '../types';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLoginAt: number;
  createdAt: number;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Log full details server-side only — do NOT include PII (email/uid) in the thrown message
  console.error('Firestore Error:', JSON.stringify({
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    userId: auth.currentUser?.uid ?? null,
  }));
  throw new Error(`Firestore operation failed (${operationType}). Please try again.`);
}

export const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
};

export const saveUserProfile = async (profile: Omit<UserProfile, 'createdAt'> & { createdAt?: number }) => {
  try {
    const userRef = doc(db, 'users', profile.uid);
    await setDoc(userRef, {
      uid: profile.uid,
      email: profile.email,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      lastLoginAt: profile.lastLoginAt,
      createdAt: profile.createdAt ?? profile.lastLoginAt,
    }, { merge: true });
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
};

export const subscribeToProjects = (userId: string, callback: (projects: Project[]) => void) => {
  const q = query(
    collection(db, 'projects'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Project))
      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    callback(projects);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'projects');
  });
};

export const createProject = async (project: Omit<Project, 'id'>) => {
  try {
    const newDocRef = doc(collection(db, 'projects'));
    const projectWithId = { ...project, id: newDocRef.id };
    await setDoc(newDocRef, projectWithId);
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'projects');
  }
};

export const updateProject = async (projectId: string, updates: Partial<Project>) => {
  try {
    await updateDoc(doc(db, 'projects', projectId), {
      ...updates,
      updatedAt: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `projects/${projectId}`);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    // Delete all messages in the subcollection first
    const messagesSnap = await getDocs(collection(db, 'projects', projectId, 'messages'));
    const batch = writeBatch(db);
    messagesSnap.docs.forEach(msgDoc => batch.delete(msgDoc.ref));
    batch.delete(doc(db, 'projects', projectId));
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `projects/${projectId}`);
  }
};

export const subscribeToMessages = (projectId: string, callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, 'projects', projectId, 'messages'),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    callback(messages);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, `projects/${projectId}/messages`);
  });
};

export const addMessage = async (projectId: string, message: Omit<Message, 'id'>): Promise<string | undefined> => {
  try {
    const newDocRef = doc(collection(db, 'projects', projectId, 'messages'));
    const messageWithId = { ...message, id: newDocRef.id };
    await setDoc(newDocRef, messageWithId);
    await updateProject(projectId, { updatedAt: Date.now() });
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `projects/${projectId}/messages`);
  }
};

export const deleteMessage = async (projectId: string, messageId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'projects', projectId, 'messages', messageId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `projects/${projectId}/messages/${messageId}`);
  }
};
