// lib/language-detection.ts
import { franc } from 'franc';
import { SupportedLanguage, LanguageDetectionResult, Message } from '@/lib/types';

// Language code mapping
const LANGUAGE_CODES = {
  'eng': 'en',
  'yor': 'yo',
  'hau': 'ha',
  'ibo': 'ig',
} as const;

// Common words/phrases in each language for improved detection
const LANGUAGE_PATTERNS = {
  yo: [
    'bawo', 'pele', 'e ku', 'mo fe', 'nibo', 'kilode', 'se e',
    'mo ni', 'wa', 'ti', 'ni', 'si', 'fun', 'naa', 'tabi',
    'ran', 'lowo', 'pelu', 'sisanwo', 'ori', 'owo', 'ibeere',
    'iranlowo', 'ise', 'ijoba', 'naijiria', 'owo', 'ori', 'owo',
    'iwe', 'eri', 'iforukosile', 'passport', 'nin', 'okowo',
    'ise', 'owo', 'cac', 'tax', 'haraji', 'owo', 'ori'
  ],
  ha: [
    'sannu', 'yaya', 'ina', 'me', 'da', 'ba', 'na', 'ka', 'ta',
    'mu', 'ku', 'su', 'wannan', 'waccan', 'lokacin', 'idan',
    'taimako', 'hidima', 'gwamnati', 'najeriya', 'haraji',
    'kuɗi', 'takarda', 'rijistar', 'fasfo', 'lasisi'
  ],
  ig: [
    'ndewo', 'kedu', 'maka', 'nke', 'na', 'ga', 'nwere', 'kwu',
    'gini', 'ebe', 'mgbe', 'onye', 'ihe', 'otu', 'aha', 'obi',
    'enyemaka', 'ọrụ', 'gọọmentị', 'naịjịrịa', 'ụtụ', 'isi',
    'ego', 'akwụkwọ', 'ndebanye', 'aha', 'paspoọtụ'
  ],
  en: [
    'hello', 'how', 'what', 'where', 'when', 'why', 'government',
    'service', 'need', 'help', 'please', 'thank', 'yes', 'no',
    'tax', 'payment', 'passport', 'registration', 'license',
    'business', 'certificate', 'document', 'fees', 'requirements'
  ]
};

export class LanguageDetector {
  private patternScore(text: string, language: SupportedLanguage): number {
    const words = text.toLowerCase().split(/\s+/);
    const patterns = LANGUAGE_PATTERNS[language];
    let matches = 0;
    
    words.forEach(word => {
      if (patterns.some(pattern => word.includes(pattern))) {
        matches++;
      }
    });
    
    return words.length > 0 ? matches / words.length : 0;
  }

  detect(text: string): LanguageDetectionResult {
    // Clean and normalize text
    const cleanText = text.trim().toLowerCase();
    
    if (!cleanText) {
      return {
        language: 'en',
        confidence: 0,
        alternatives: []
      };
    }

    // Use franc for initial detection
    const francResult = franc(cleanText);
    let primaryLanguage: SupportedLanguage = 'en';
    
    // Map franc result to our supported languages
    if (francResult in LANGUAGE_CODES) {
      primaryLanguage = LANGUAGE_CODES[francResult as keyof typeof LANGUAGE_CODES];
    }

    // Calculate pattern-based scores for all languages
    const patternScores = Object.keys(LANGUAGE_PATTERNS).map(lang => ({
      language: lang as SupportedLanguage,
      confidence: this.patternScore(cleanText, lang as SupportedLanguage)
    }));

    // Sort by confidence
    patternScores.sort((a, b) => b.confidence - a.confidence);

    // Combine franc result with pattern matching
    const topPatternMatch = patternScores[0];
    
    // Lower threshold for Yoruba detection since it has unique patterns
    const confidenceThreshold = topPatternMatch.language === 'yo' ? 0.2 : 0.3;
    
    const finalLanguage = topPatternMatch.confidence > confidenceThreshold 
      ? topPatternMatch.language 
      : primaryLanguage;

    // Boost confidence for clear Yoruba patterns
    let finalConfidence = Math.max(topPatternMatch.confidence, 0.5);
    if (finalLanguage === 'yo' && topPatternMatch.confidence > 0.1) {
      finalConfidence = Math.max(finalConfidence, 0.7);
    }

    return {
      language: finalLanguage,
      confidence: finalConfidence,
      alternatives: patternScores.slice(1, 3)
    };
  }

  // Detect language with context from conversation history
  detectWithContext(text: string, previousMessages: Message[]): LanguageDetectionResult {
    const currentDetection = this.detect(text);
    
    // If confidence is low, check recent message languages
    if (currentDetection.confidence < 0.7 && previousMessages.length > 0) {
      const recentLanguages = previousMessages
        .slice(-3)
        .map(msg => msg.language)
        .filter(lang => lang !== 'en');
      
      const mostCommon = recentLanguages.reduce((acc, lang) => {
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const contextLanguage = Object.entries(mostCommon)
        .sort(([,a], [,b]) => b - a)[0]?.[0] as SupportedLanguage;
      
      if (contextLanguage) {
        return {
          ...currentDetection,
          language: contextLanguage,
          confidence: Math.max(currentDetection.confidence, 0.6)
        };
      }
    }
    
    return currentDetection;
  }
}
