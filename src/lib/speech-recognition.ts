import { SupportedLanguage } from '@/lib/types';

export class SpeechRecognitionService {
    private recognition: any;
    private isListening = false;
    
    constructor() {
      if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        this.recognition = new (window as any).webkitSpeechRecognition();
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
  
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        this.isListening = false;
      };
  
      this.recognition.onerror = (event: any) => {
        onError(event.error);
        this.isListening = false;
      };
  
      this.recognition.onend = () => {
        this.isListening = false;
      };
  
      try {
        this.recognition.start();
      } catch (error) {
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