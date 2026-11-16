import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { saveUserProfile } from './db';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Optional email allowlist — set VITE_ALLOWED_EMAILS=a@b.com,c@d.com.
// If unset, all Google accounts are permitted (default behaviour).
const allowedEmails: string[] = import.meta.env.VITE_ALLOWED_EMAILS
  ? (import.meta.env.VITE_ALLOWED_EMAILS as string).split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  : [];

const isEmailAllowed = (email: string | null) =>
  allowedEmails.length === 0 || allowedEmails.includes((email ?? '').toLowerCase());

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Enforced on every auth-state change (not just at the sign-in click) so a
      // restored session for a non-allowlisted account is signed out as well.
      // The server enforces the same list on every API call.
      if (user && !isEmailAllowed(user.email)) {
        signOut(auth).catch(() => {});
        setUser(null);
        setLoading(false);
        alert('Access denied. Your Google account is not authorised to use this app.');
        return;
      }
      setUser(user);
      setLoading(false);
      if (user) {
        saveUserProfile({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: Date.now(),
        });
      }
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
