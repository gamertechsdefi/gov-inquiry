import { SupportedLanguage } from '@/lib/types';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface Window {
  webkitSpeechRecognition: new () => SpeechRecognition;
}

export class SpeechRecognitionService {
    private recognition: SpeechRecognition | null = null;
    private isListening = false;
    
    constructor() {
      if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        this.recognition = new (window as Window).webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  
    async startListening(
      language: SupportedLanguage,
      onResult: (text: string) => void,
      onError: (error: string) => void
    ) {
      if (!this.recognition) {
        onError('Speech recognition not supported');
        return;
      }
  
      if (this.isListening) return;
  
      // Set language
      const langCodes = {
        en: 'en-US',
        yo: 'yo-NG',
        ha: 'ha-NG',
        ig: 'ig-NG'
      };
  
      this.recognition.lang = langCodes[language] || 'en-US';
      this.isListening = true;
  
            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        this.isListening = false;
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        onError(event.error);
        this.isListening = false;
      };
  
      this.recognition.onend = () => {
        this.isListening = false;
      };
  
      try {
        this.recognition.start();
      } catch {
        onError('Failed to start speech recognition');
        this.isListening = false;
      }
    }
  
    stopListening() {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    }
  
    get listening() {
      return this.isListening;
    }
  }