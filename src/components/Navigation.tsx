'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link 
            href="/chat" 
            className={`text-sm font-medium ${
              pathname === '/chat' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Chat
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className={`text-sm font-medium ${
              pathname === '/login' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className={`text-sm font-medium ${
              pathname === '/signup' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}; 