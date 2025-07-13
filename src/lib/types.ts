export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    language: SupportedLanguage;
    translation?: string;
  }
  
  export interface Conversation {
    id: string;
    user_id?: string;
    messages: Message[];
    language: SupportedLanguage;
    service_category?: string;
    status: 'active' | 'completed' | 'transferred';
    created_at: Date;
    updated_at: Date;
  }
  
  export interface GovernmentService {
    id: string;
    name: string;
    description: string;
    category: string;
    requirements: string[];
    process_steps: string[];
    estimated_time: string;
    cost: string;
    office_locations: string[];
    translations: {
      [key in SupportedLanguage]: {
        name: string;
        description: string;
        requirements: string[];
        process_steps: string[];
      };
    };
    [key: string]: unknown; // Index signature for Firebase compatibility
  }
  
  export type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig';
  
  export interface LanguageDetectionResult {
    language: SupportedLanguage;
    confidence: number;
    alternatives: Array<{
      language: SupportedLanguage;
      confidence: number;
    }>;
  }

// API Request/Response types
export interface ChatRequest {
  message: string;
  conversationId?: string;
  selectedLanguage?: SupportedLanguage;
}

export interface ChatResponse {
  response: string;
  language: SupportedLanguage;
}

export interface MessageData {
  content: string;
  sender: 'user' | 'bot';
  language: SupportedLanguage;
  timestamp?: string;
}

export interface ConversationData {
  user_id?: string;
  language: SupportedLanguage;
  service_category?: string;
  status?: 'active' | 'completed' | 'transferred';
  messages?: unknown[]; // Optional messages array for Firebase compatibility
  created_at?: string;
  updated_at?: string;
}

// Firebase Database types
export interface FirebaseMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  language: SupportedLanguage;
  timestamp: string;
}

export interface FirebaseConversation {
  id: string;
  user_id?: string;
  language: SupportedLanguage;
  service_category?: string;
  status: 'active' | 'completed' | 'transferred';
  messages?: unknown[]; // Optional messages array for Firebase compatibility
  created_at: string;
  updated_at: string;
}

// Anonymous token types
export interface AnonymousToken {
  id: string;
  type: 'anonymous';
  messageCount: number;
  maxMessages: number;
  createdAt: string;
  expiresAt: string;
}

// Error response types
export interface ApiError {
  message: string;
  language?: SupportedLanguage;
  details?: string;
}
  