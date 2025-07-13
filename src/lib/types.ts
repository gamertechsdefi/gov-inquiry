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
  