import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AUTH_KEY = 'garage_door_auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          type: localStorage.getItem(`${AUTH_KEY}_type`) || 'client'
        };
        setUser(userData);
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (userType) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem(`${AUTH_KEY}_type`, userType);
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Google login failed');
    }
  };

  const loginWithEmail = async (email, password, userType) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(`${AUTH_KEY}_type`, userType);
      return result.user;
    } catch (error) {
      console.error('Email login error:', error);
      throw new Error('Invalid email or password');
    }
  };

  const register = async (email, password, userType, userData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem(`${AUTH_KEY}_type`, userType);
      // Here you would typically save additional user data to your database
      return result.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(`${AUTH_KEY}_type`);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      // Here you would typically update the user data in your database
      return updatedUser;
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  return {
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    register,
    logout,
    updateProfile
  };
};