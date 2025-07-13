'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const UserStatus = () => {
  const { user, isAnonymous, remainingMessages, signInAnonymously, signOut, isFirebaseAvailable } = useAuth();
  const [error, setError] = useState('');

  const handleAnonymousSignIn = async () => {
    setError('');
    const result = await signInAnonymously();
    if (!result.success) {
      setError(result.error || 'Anonymous sign in failed');
      console.error('Anonymous sign in failed:', result.error);
    }
  };

  const handleSignOut = async () => {
    setError('');
    const result = await signOut();
    if (!result.success) {
      setError(result.error || 'Sign out failed');
      console.error('Sign out failed:', result.error);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.email || 'Anonymous User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAnonymous ? 'Anonymous' : 'Registered User'}
                  </p>
                </div>
              </div>
              
              {isAnonymous && remainingMessages >= 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{remainingMessages}</span> messages remaining
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-600">
              Not signed in
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              {isAnonymous && remainingMessages <= 2 && isFirebaseAvailable && (
                <Link
                  href="/signup"
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up for More
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAnonymousSignIn}
                className="text-sm bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
              >
                Try Anonymously
              </button>
              {isFirebaseAvailable && (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 