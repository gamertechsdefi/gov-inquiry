import { useState, useCallback, useEffect } from 'react';
import { Message, SupportedLanguage } from '@/lib/types';
import { useAuth } from './useAuth';

interface UseChatProps {
  initialLanguage?: SupportedLanguage;
  conversationId?: string;
}

export function useChat({ initialLanguage = 'en', conversationId }: UseChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(conversationId);
  
  const { user, isAnonymous, canSendMessage, incrementMessageCount, remainingMessages } = useAuth();

  const loadUserConversations = useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      console.log('Loading user conversations for:', user.uid);
      const response = await fetch(`/api/service?userId=${user.uid}`);
      if (response.ok) {
        const conversations = await response.json();
        if (conversations.length > 0) {
          const mostRecent = conversations[0]; // Assuming sorted by date
          setCurrentConversationId(mostRecent.id);
          localStorage.setItem(`user_conversation_${user.uid}`, mostRecent.id);
          console.log('Loaded most recent conversation:', mostRecent.id);
        }
      }
    } catch (error) {
      console.error('Error loading user conversations:', error);
    }
  }, [user?.uid]);

  // Load conversation ID from localStorage on mount
  useEffect(() => {
    if (!conversationId && user?.uid) {
      const storedConversationId = localStorage.getItem(`user_conversation_${user.uid}`);
      if (storedConversationId) {
        setCurrentConversationId(storedConversationId);
        console.log('Loaded stored conversation ID:', storedConversationId);
      } else {
        // If no stored conversation, try to get the most recent conversation from Firebase
        loadUserConversations();
      }
    }
  }, [conversationId, user?.uid, loadUserConversations]);

  const loadConversation = useCallback(async (convId: string) => {
    try {
      console.log('Loading conversation:', convId);
      // For local conversations, load from localStorage
      if (convId.startsWith('local_')) {
        console.log('Loading local conversation from localStorage');
        const storedMessages = localStorage.getItem(`chat_${convId}`);
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(parsedMessages);
          console.log('Loaded local messages:', parsedMessages.length);
        }
        return;
      }

      // For Firebase conversations, load from API
      console.log('Loading Firebase conversation from API');
      const response = await fetch(`/api/conversion?conversationId=${convId}`);
      if (response.ok) {
        const data = await response.json();
        const messages = data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messages);
        console.log('Loaded Firebase messages:', messages.length);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  }, []);

  // Load messages when conversation ID changes
  useEffect(() => {
    if (currentConversationId) {
      loadConversation(currentConversationId);
    }
  }, [currentConversationId, loadConversation]);

  // Load existing messages when conversationId changes
  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId, loadConversation]);

  const createConversation = useCallback(async (language: SupportedLanguage) => {
    try {
      const userId = user?.uid || 'anonymous';
      const response = await fetch('/api/conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          language
        })
      });

      if (response.ok) {
        const conversation = await response.json();
        setCurrentConversationId(conversation.id);
        
        // Store conversation ID for authenticated users
        if (user?.uid && !conversation.id.startsWith('local_')) {
          localStorage.setItem(`user_conversation_${user.uid}`, conversation.id);
          console.log('Stored conversation ID for user:', conversation.id);
        }
        
        return conversation.id;
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
    return null;
  }, [user]);

  const saveMessagesToLocalStorage = useCallback((convId: string, messages: Message[]) => {
    if (convId.startsWith('local_')) {
      localStorage.setItem(`chat_${convId}`, JSON.stringify(messages));
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Check if user can send messages
    if (!canSendMessage()) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isAnonymous 
          ? `You've reached your message limit (${remainingMessages} remaining). Please sign up to continue chatting.`
          : 'You cannot send messages at this time.',
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      // Save to localStorage for local conversations
      if (currentConversationId?.startsWith('local_')) {
        saveMessagesToLocalStorage(currentConversationId, newMessages);
      }
      return newMessages;
    });
    setIsLoading(true);

    try {
      // Create conversation if it doesn't exist
      let convId = currentConversationId;
      if (!convId) {
        convId = await createConversation(currentLanguage);
        console.log('Created conversation:', convId);
      }

      const userId = user?.uid || 'anonymous';
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationId: convId,
          userId,
          selectedLanguage: currentLanguage // Send the selected language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage // Use the selected language, not detected language
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        // Save to localStorage for local conversations
        if (convId?.startsWith('local_')) {
          saveMessagesToLocalStorage(convId, newMessages);
        }
        return newMessages;
      });

      // Increment message count for anonymous users
      if (isAnonymous) {
        incrementMessageCount();
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };
      
      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        // Save to localStorage for local conversations
        if (currentConversationId?.startsWith('local_')) {
          saveMessagesToLocalStorage(currentConversationId, newMessages);
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentConversationId, currentLanguage, createConversation, user, isAnonymous, canSendMessage, incrementMessageCount, remainingMessages, saveMessagesToLocalStorage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentConversationId(undefined);
    // Clear localStorage for local conversations
    if (currentConversationId?.startsWith('local_')) {
      localStorage.removeItem(`chat_${currentConversationId}`);
    }
    // Clear stored conversation ID for authenticated users
    if (user?.uid) {
      localStorage.removeItem(`user_conversation_${user.uid}`);
      console.log('Cleared stored conversation ID for user');
    }
  }, [currentConversationId, user?.uid]);

  const switchLanguage = useCallback((language: SupportedLanguage) => {
    setCurrentLanguage(language);
  }, []);

  return {
    messages,
    isLoading,
    currentLanguage,
    currentConversationId,
    sendMessage,
    clearMessages,
    switchLanguage,
    loadConversation,
    canSendMessage: canSendMessage(),
    remainingMessages
  };
}
