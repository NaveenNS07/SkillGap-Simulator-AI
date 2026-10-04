import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { saveUserProfile, getUserProfile } from '../firebase/db';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user profile from Firestore or local store
  const syncProfile = async (user) => {
    if (!user) {
      setUserProfile(null);
      return;
    }
    const profile = await getUserProfile(user.uid);
    if (profile) {
      setUserProfile(profile);
    } else {
      const newProfile = await saveUserProfile(user);
      setUserProfile(newProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncProfile(user);
      } else {
        // Check local demo user session
        const demoSession = localStorage.getItem('skillgap_demo_session');
        if (demoSession) {
          const parsed = JSON.parse(demoSession);
          setCurrentUser(parsed);
          setUserProfile(parsed);
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await syncProfile(res.user);
    return res.user;
  };

  // Register
  const register = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name });
    const profileData = {
      uid: res.user.uid,
      name,
      email,
      totalSimulations: 0,
      averageReadiness: 0,
      currentCareer: 'data-scientist'
    };
    await saveUserProfile(profileData);
    setUserProfile(profileData);
    return res.user;
  };

  // Quick 1-Click Demo Login for Hackathon Judges
  const loginAsDemoUser = async () => {
    const demoUser = {
      uid: 'demo_user_2026',
      name: 'Alex Rivera (Judge)',
      email: 'alex.rivera@hackathon.demo',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      totalSimulations: 2,
      averageReadiness: 74,
      currentCareer: 'data-scientist',
      isDemoAccount: true
    };

    localStorage.setItem('skillgap_demo_session', JSON.stringify(demoUser));
    setCurrentUser(demoUser);
    setUserProfile(demoUser);
    await saveUserProfile(demoUser);
    return demoUser;
  };

  // Logout
  const logout = async () => {
    localStorage.removeItem('skillgap_demo_session');
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Sign out fallback:", e);
    }
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Reset password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Refresh profile manually
  const refreshProfile = async () => {
    if (currentUser) {
      await syncProfile(currentUser);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    loginAsDemoUser,
    logout,
    resetPassword,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
