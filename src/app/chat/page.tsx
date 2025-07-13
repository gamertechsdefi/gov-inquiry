"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Globe, Volume2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { SupportedLanguage } from '@/lib/types';
import { MarkdownMessage } from '@/components/MarkdownMessage';
import { UserStatus } from '@/components/UserStatus';
import { Navigation } from '@/components/Navigation';
import { SearchIndicator } from '@/components/SearchIndicator';

const LANGUAGE_NAMES = {
  en: 'English',
  yo: 'Yoruba',
  ha: 'Hausa',
  ig: 'Igbo'
};

const WELCOME_MESSAGES = {
  en: "Hello! I'm here to help you with government services. How can I assist you today?",
  yo: "Bawo! Mo wa nibi lati ran e lowo pelu awon ise ijoba. Bawo ni mo se le ran e lowo loni?",
  ha: "Sannu! Ina nan don taimaka muku da hidimar gwamnati. Yaya zan iya taimaka muku a yau?",
  ig: "Ndewo! Anọ m ebe a inyere gị aka na ọrụ gọọmentị. Kedu ka m ga-esi nyere gị aka taa?"
};

export default function GovernmentServiceChat() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    isLoading,
    currentLanguage,
    sendMessage,
    clearMessages,
    switchLanguage,
    canSendMessage,
    remainingMessages
  } = useChat({ initialLanguage: 'en' });

  useEffect(() => {
    // Add welcome message if no messages exist
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        content: `${WELCOME_MESSAGES[currentLanguage]}\n\n**I will respond in ${LANGUAGE_NAMES[currentLanguage]}**`,
        sender: 'bot' as const,
        timestamp: new Date(),
        language: currentLanguage
      };
      // Note: This will be handled by the useChat hook when it loads
    }
  }, [currentLanguage, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    await sendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecognition = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'en' ? 'en-US' : 'en-US'; // Fallback to English for now
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 md:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Government Service Assistant</h1>
          <div className="flex items-center space-x-4">
            {/* Current Language Display */}
            <div className="flex items-center space-x-2 bg-green-700 px-3 py-1 rounded-full text-sm">
              <Globe className="w-4 h-4" />
              <span>Chat in: {LANGUAGE_NAMES[currentLanguage]}</span>
            </div>
            
            {/* Language Selection Dropdown */}
            <select 
              value={currentLanguage} 
              onChange={(e) => switchLanguage(e.target.value as SupportedLanguage)}
              className="bg-green-700 text-white px-3 py-1 rounded border-none text-sm hover:bg-green-800 transition-colors"
            >
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ha">Hausa</option>
              <option value="ig">Igbo</option>
            </select>
            
            {/* Search Toggle */}
            <button
              onClick={() => setEnableSearch(!enableSearch)}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                enableSearch 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
              title={enableSearch ? 'Disable real-time search' : 'Enable real-time search'}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">
                {enableSearch ? 'Search ON' : 'Search OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {/* <Navigation /> */}

      {/* User Status */}
      <UserStatus />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              {message.sender === 'bot' ? (
                <MarkdownMessage 
                  content={message.content}
                  className="text-sm"
                />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs opacity-70">
                    {LANGUAGE_NAMES[message.language]}
                  </span>
                  {message.sender === 'bot' && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="text-xs opacity-70 hover:opacity-100"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Search and Loading Indicators */}
        <SearchIndicator isSearching={isLoading} language={currentLanguage} />
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm">Processing your request...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoiceRecognition}
            className={`p-2 rounded-full ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              currentLanguage === 'en' ? "Type your message..." :
              currentLanguage === 'yo' ? "Ko ifiranṣẹ rẹ..." :
              currentLanguage === 'ha' ? "Rubuta sakonku..." :
              "Dee ozi gị..."
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Message limit indicator for anonymous users */}
        {remainingMessages >= 0 && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            {remainingMessages} messages remaining
          </div>
        )}
        
        {/* Search tips */}
        {enableSearch && messages.length === 0 && (
          <div className="mt-2 text-xs text-blue-600 text-center">
            💡 Try asking about current fees, recent policy changes, or latest government announcements
          </div>
        )}
      </div>
    </div>
  );
}