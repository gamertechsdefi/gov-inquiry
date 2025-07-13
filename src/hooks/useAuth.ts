import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';

// Safe auth hook that handles missing AuthProvider
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  
  // If AuthProvider is not available, return a safe fallback
  if (!authContext) {
    return {
      user: null,
      anonymousToken: null,
      isLoading: false,
      isAnonymous: false,
      remainingMessages: 0,
      isFirebaseAvailable: false,
      signInAnonymously: async () => ({ success: false, error: 'AuthProvider not available' }),
      signUp: async () => ({ success: false, error: 'AuthProvider not available' }),
      signIn: async () => ({ success: false, error: 'AuthProvider not available' }),
      signOut: async () => ({ success: false, error: 'AuthProvider not available' }),
      incrementMessageCount: () => false,
      canSendMessage: () => false
    };
  }

  return authContext;
}; 