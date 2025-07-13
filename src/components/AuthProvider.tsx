'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authOperations, tokenManager } from '@/lib/firebase';

interface AnonymousToken {
  id: string;
  type: 'anonymous';
  messageCount: number;
  maxMessages: number;
  createdAt: string;
  expiresAt: string;
}

interface AuthContextType {
  isInitialized: boolean;
  user: User | null;
  anonymousToken: AnonymousToken | null;
  isLoading: boolean;
  isAnonymous: boolean;
  remainingMessages: number;
  isFirebaseAvailable: boolean;
  signInAnonymously: () => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  incrementMessageCount: () => boolean;
  canSendMessage: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    user: null as User | null,
    anonymousToken: null as AnonymousToken | null,
    isLoading: true,
    isAnonymous: false,
    remainingMessages: 0,
    isFirebaseAvailable: false
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is available
    const checkFirebaseAvailability = () => {
      const hasFirebaseConfig = typeof window !== 'undefined' && 
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_firebase_api_key_here';
      
      return hasFirebaseConfig;
    };

    const isFirebaseAvailable = checkFirebaseAvailability();
    
    if (isFirebaseAvailable) {
      // Listen to Firebase auth state changes
      const unsubscribe = authOperations.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          setAuthState({
            user,
            anonymousToken: null,
            isLoading: false,
            isAnonymous: user.isAnonymous,
            remainingMessages: -1, // Unlimited for registered users
            isFirebaseAvailable: true
          });
        } else {
          // User is signed out, check for anonymous token
          const anonymousToken = tokenManager.getAnonymousToken();
          if (anonymousToken) {
            setAuthState({
              user: null,
              anonymousToken,
              isLoading: false,
              isAnonymous: true,
              remainingMessages: tokenManager.getRemainingMessages(),
              isFirebaseAvailable: true
            });
          } else {
            // No user and no anonymous token
            setAuthState({
              user: null,
              anonymousToken: null,
              isLoading: false,
              isAnonymous: false,
              remainingMessages: 0,
              isFirebaseAvailable: true
            });
          }
        }
      });

      return () => unsubscribe();
    } else {
      // Firebase not available, set up anonymous mode only
      const anonymousToken = tokenManager.getAnonymousToken();
      if (anonymousToken) {
        setAuthState({
          user: null,
          anonymousToken,
          isLoading: false,
          isAnonymous: true,
          remainingMessages: tokenManager.getRemainingMessages(),
          isFirebaseAvailable: false
        });
      } else {
        setAuthState({
          user: null,
          anonymousToken: null,
          isLoading: false,
          isAnonymous: false,
          remainingMessages: 0,
          isFirebaseAvailable: false
        });
      }
    }
    
    // Mark as initialized immediately for client-side only mode
    setIsInitialized(true);
  }, []);

  const signInAnonymously = async () => {
    try {
      if (!authState.isFirebaseAvailable) {
        // Firebase not available, create local anonymous token
        const token = tokenManager.generateAnonymousToken();
        setAuthState(prev => ({
          ...prev,
          anonymousToken: token,
          isAnonymous: true,
          remainingMessages: tokenManager.getRemainingMessages()
        }));
        return { success: true };
      }

      const { user, error } = await authOperations.signInAnonymously();
      if (error) throw new Error(error);
      
      // Generate anonymous token for message tracking
      const token = tokenManager.generateAnonymousToken();
      
      setAuthState(prev => ({
        ...prev,
        user,
        anonymousToken: token,
        isAnonymous: true,
        remainingMessages: tokenManager.getRemainingMessages()
      }));
      
      return { success: true };
    } catch {
      console.error('Anonymous sign in error:');
      return { success: false };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      if (!authState.isFirebaseAvailable) {
        return { 
          success: false, 
          error: 'Firebase is not configured. Please set up your environment variables to enable account creation.' 
        };
      }

      const { user, error } = await authOperations.signUp(email, password);
      if (error) throw new Error(error);
      
      setAuthState(prev => ({
        ...prev,
        user,
        anonymousToken: null,
        isAnonymous: false,
        remainingMessages: -1
      }));
      
      return { success: true };
    } catch {
      console.error('Sign up error:');
      return { success: false };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!authState.isFirebaseAvailable) {
        return { 
          success: false, 
          error: 'Firebase is not configured. Please set up your environment variables to enable account login.' 
        };
      }

      const { user, error } = await authOperations.signIn(email, password);
      if (error) throw new Error(error);
      
      setAuthState(prev => ({
        ...prev,
        user,
        anonymousToken: null,
        isAnonymous: false,
        remainingMessages: -1
      }));
      
      return { success: true };
    } catch {
      console.error('Sign in error:');
      return { success: false };
    }
  };

  const signOut = async () => {
    try {
      if (authState.isFirebaseAvailable) {
        const { error } = await authOperations.signOut();
        if (error) throw new Error(error);
      }
      
      // Clear anonymous token
      tokenManager.clearAnonymousToken();
      
      // Clear stored conversation ID for the user
      if (authState.user?.uid) {
        localStorage.removeItem(`user_conversation_${authState.user.uid}`);
        console.log('Cleared stored conversation ID on sign out');
      }
      
      setAuthState(prev => ({
        ...prev,
        user: null,
        anonymousToken: null,
        isAnonymous: false,
        remainingMessages: 0
      }));
      
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const incrementMessageCount = () => {
    if (authState.isAnonymous && authState.anonymousToken) {
      const success = tokenManager.incrementMessageCount();
      if (success) {
        setAuthState(prev => ({
          ...prev,
          remainingMessages: tokenManager.getRemainingMessages()
        }));
      }
      return success;
    }
    return true; // Registered users have unlimited messages
  };

  const canSendMessage = () => {
    if (authState.isAnonymous) {
      return tokenManager.canSendMessage();
    }
    return true; // Registered users can always send messages
  };

  const contextValue: AuthContextType = {
    isInitialized,
    ...authState,
    signInAnonymously,
    signUp,
    signIn,
    signOut,
    incrementMessageCount,
    canSendMessage
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 