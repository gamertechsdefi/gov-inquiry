// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getDatabase, ref, push, set, get, query, orderByChild, equalTo, limitToLast, Database } from "firebase/database";
import { 
  MessageData, 
  ConversationData, 
  FirebaseMessage, 
  FirebaseConversation,
  AnonymousToken,
  SupportedLanguage 
} from '@/lib/types';

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  const hasApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_firebase_api_key_here';
  const hasProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const hasAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const hasDatabaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  
  console.log('Firebase config check:', {
    hasApiKey,
    hasProjectId,
    hasAuthDomain,
    hasDatabaseURL,
    apiKeyLength: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.length || 0
  });
  
  return hasApiKey && hasProjectId && hasAuthDomain && hasDatabaseURL;
};

// Lazy Firebase initialization
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
// let db: Firestore | null = null;
let database: Database | null = null;

const initializeFirebase = () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured. Please set up your .env.local file with NEXT_PUBLIC_ variables.');
    return false;
  }

  if (app) return true; // Already initialized

  try {
    console.log('Initializing Firebase with config...');
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 
                   `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
    };

    console.log('Firebase config:', {
      apiKey: firebaseConfig.apiKey ? '***' : 'missing',
      authDomain: firebaseConfig.authDomain ? '***' : 'missing',
      projectId: firebaseConfig.projectId ? '***' : 'missing',
      databaseURL: firebaseConfig.databaseURL ? '***' : 'missing'
    });

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    // db = getFirestore(app);
    database = getDatabase(app);
    
    console.log('Firebase initialized successfully');
    console.log('Database URL:', firebaseConfig.databaseURL);
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};

// Firebase Realtime Database helper functions
export const dbRef = {
  conversations: () => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, 'conversations');
  },
  messages: () => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, 'messages');
  },
  services: () => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, 'services');
  },
  conversation: (id: string) => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, `conversations/${id}`);
  },
  conversationMessages: (conversationId: string) => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, `messages/${conversationId}`);
  },
  service: (id: string) => {
    if (!database) throw new Error('Firebase not initialized');
    return ref(database, `services/${id}`);
  }
};

// Database operations
export const dbOperations = {
  // Create a new conversation
  createConversation: async (conversationData: ConversationData) => {
    try {
      console.log('Initializing Firebase for conversation creation...');
      if (!initializeFirebase()) {
        throw new Error('Firebase not initialized');
      }
      console.log('Firebase initialized, creating conversation...');
      const newConversationRef = push(dbRef.conversations());
      await set(newConversationRef, {
        ...conversationData,
        id: newConversationRef.key,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log('Conversation created with ID:', newConversationRef.key);
      return { id: newConversationRef.key, ...conversationData };
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Get conversation by ID
  getConversation: async (conversationId: string): Promise<FirebaseConversation | null> => {
    const snapshot = await get(dbRef.conversation(conversationId));
    return snapshot.exists() ? { id: conversationId, ...snapshot.val() } : null;
  },

  // Get conversations for a specific user with memory management
  getUserConversations: async (userId: string, limit: number = 10): Promise<FirebaseConversation[]> => {
    try {
      const conversationsQuery = query(
        dbRef.conversations(),
        orderByChild('userId'),
        equalTo(userId),
        limitToLast(limit)
      );
      
      const snapshot = await get(conversationsQuery);
      if (!snapshot.exists()) return [];
      
      const conversations = snapshot.val();
      return Object.keys(conversations)
        .map(key => ({
          id: key,
          ...conversations[key]
        }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error('Error getting user conversations:', error);
      return [];
    }
  },

  // Get messages for a conversation with memory management
  getConversationMessages: async (conversationId: string, limit: number = 50): Promise<FirebaseMessage[]> => {
    try {
      console.log('Getting messages for conversation:', conversationId);
      
      // Ensure Firebase is initialized
      if (!initializeFirebase()) {
        console.error('Firebase initialization failed for getConversationMessages');
        return [];
      }
      
      const messagesQuery = query(
        dbRef.conversationMessages(conversationId),
        limitToLast(limit)
      );
      
      const snapshot = await get(messagesQuery);
      if (!snapshot.exists()) {
        console.log('No messages found for conversation:', conversationId);
        return [];
      }
      
      const messages = snapshot.val();
      const messageList: FirebaseMessage[] = Object.keys(messages)
        .map(key => ({
          id: key,
          ...messages[key]
        }))
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      console.log('Retrieved messages:', messageList.length);
      return messageList;
    } catch (error) {
      console.error('Error getting conversation messages:', error);
      return [];
    }
  },

  // Add message to conversation with memory management
  addMessage: async (conversationId: string, messageData: MessageData) => {
    try {
      console.log('Adding message to conversation:', conversationId, messageData);
      
      // Ensure Firebase is initialized
      if (!initializeFirebase()) {
        throw new Error('Firebase initialization failed for addMessage');
      }
      
      const newMessageRef = push(dbRef.conversationMessages(conversationId));
      await set(newMessageRef, {
        ...messageData,
        id: newMessageRef.key,
        timestamp: new Date().toISOString()
      });

      // Update conversation timestamp
      await set(dbRef.conversation(conversationId), {
        updated_at: new Date().toISOString()
      });

      // Memory management: Keep only last 50 messages per conversation
      const messages = await dbOperations.getConversationMessages(conversationId, 100);
      if (messages.length > 50) {
        const messagesToDelete = messages.slice(0, messages.length - 50);
        for (const msg of messagesToDelete) {
          await set(ref(database!, `messages/${conversationId}/${msg.id}`), null);
        }
      }

      console.log('Message added successfully with ID:', newMessageRef.key);
      return { id: newMessageRef.key!, ...messageData };
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  // Clean up old conversations for memory management
  cleanupOldConversations: async (userId: string, maxConversations: number = 10) => {
    try {
      const conversations = await dbOperations.getUserConversations(userId, maxConversations + 5);
      
      if (conversations.length > maxConversations) {
        const conversationsToDelete = conversations.slice(maxConversations);
        
        for (const conv of conversationsToDelete) {
          // Delete conversation messages
          await set(dbRef.conversationMessages(conv.id), null);
          // Delete conversation
          await set(dbRef.conversation(conv.id), null);
        }
      }
    } catch (error) {
      console.error('Error cleaning up conversations:', error);
    }
  },

  // Get all services
  getServices: async () => {
    const snapshot = await get(dbRef.services());
    if (!snapshot.exists()) return [];
    
    const services = snapshot.val();
    return Object.keys(services).map(key => ({
      id: key,
      ...services[key]
    }));
  },

  // Get service by ID
  getService: async (serviceId: string) => {
    const snapshot = await get(dbRef.service(serviceId));
    return snapshot.exists() ? { id: serviceId, ...snapshot.val() } : null;
  },

  // Initialize default services if they don't exist
  initializeServices: async (services: Array<{ id: string; [key: string]: unknown }>) => {
    const snapshot = await get(dbRef.services());
    if (!snapshot.exists()) {
      for (const service of services) {
        await set(dbRef.service(service.id), service);
      }
    }
  }
};

// Anonymous token management
export const tokenManager = {
  // Generate anonymous token
  generateAnonymousToken: (): AnonymousToken => {
    const token = {
      id: `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'anonymous' as const,
      messageCount: 0,
      maxMessages: 10,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('gov_chat_anon_token', JSON.stringify(token));
    }
    
    return token;
  },

  // Get anonymous token from localStorage
  getAnonymousToken: (): AnonymousToken | null => {
    if (typeof window === 'undefined') return null;
    
    const tokenStr = localStorage.getItem('gov_chat_anon_token');
    if (!tokenStr) return null;
    
    try {
      const token = JSON.parse(tokenStr);
      
      // Check if token is expired
      if (new Date(token.expiresAt) < new Date()) {
        localStorage.removeItem('gov_chat_anon_token');
        return null;
      }
      
      // Ensure the token has the correct type
      return {
        ...token,
        type: 'anonymous' as const
      } as AnonymousToken;
    } catch {
      localStorage.removeItem('gov_chat_anon_token');
      return null;
    }
  },

  // Increment message count for anonymous user
  incrementMessageCount: (): boolean => {
    const token = tokenManager.getAnonymousToken();
    if (!token) return false;
    
    token.messageCount++;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('gov_chat_anon_token', JSON.stringify(token));
    }
    
    return token.messageCount <= token.maxMessages;
  },

  // Check if anonymous user can send more messages
  canSendMessage: (): boolean => {
    const token = tokenManager.getAnonymousToken();
    if (!token) return false;
    return token.messageCount < token.maxMessages;
  },

  // Get remaining messages for anonymous user
  getRemainingMessages: (): number => {
    const token = tokenManager.getAnonymousToken();
    if (!token) return 0;
    return Math.max(0, token.maxMessages - token.messageCount);
  },

  // Clear anonymous token
  clearAnonymousToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gov_chat_anon_token');
    }
  }
};

// Authentication operations
export const authOperations = {
  // Sign in anonymously
  signInAnonymously: async (): Promise<{ user: User | null; error: string | null }> => {
    try {
      if (!initializeFirebase() || !auth) {
        return { user: null, error: 'Firebase not initialized' };
      }
      const userCredential = await signInAnonymously(auth);
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { user: null, error: errorMessage };
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      if (!initializeFirebase() || !auth) {
        return { user: null, error: 'Firebase not initialized' };
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Clear anonymous token when user registers
      tokenManager.clearAnonymousToken();
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { user: null, error: errorMessage };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      if (!initializeFirebase() || !auth) {
        return { user: null, error: 'Firebase not initialized' };
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Clear anonymous token when user signs in
      tokenManager.clearAnonymousToken();
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { user: null, error: errorMessage };
    }
  },

  // Sign out
  signOut: async (): Promise<{ error: string | null }> => {
    try {
      if (!auth) {
        return { error: 'Firebase not initialized' };
      }
      await signOut(auth);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { error: errorMessage };
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth?.currentUser || null;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    if (!initializeFirebase() || !auth) {
      // Return a dummy unsubscribe function if Firebase is not initialized
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  }
};
