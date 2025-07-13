// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/lib/firebase';
import { AIService } from '@/lib/ai-service';
import { 
  ChatRequest, 
  ChatResponse, 
  ApiError, 
  SupportedLanguage,
  MessageData 
} from '@/lib/types';

const aiService = new AIService();

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, conversationId, selectedLanguage } = body;

    if (!message) {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    // Use selected language instead of detecting
    const language = selectedLanguage || 'en';

    // Get conversation context if available (limit to last 5 messages for performance)
    let context: string[] = [];
    if (conversationId && !conversationId.startsWith('local_')) {
      try {
        const messages = await dbOperations.getConversationMessages(conversationId, 5); // Limit to 5 messages
        context = messages.map((msg: { sender: string; content: string }) =>
          `${msg.sender}: ${msg.content}`
        );
        console.log(`Loaded ${context.length} recent messages for context`);
      } catch (error) {
        console.warn('Could not fetch conversation context:', error);
        // Continue without context
      }
    }

    // Generate AI response using selected language
    const botResponse = await aiService.processMessage(
      message,
      language,
      context
    );

    // Store messages in database (only for Firebase conversations)
    if (conversationId && !conversationId.startsWith('local_')) {
      try {
        console.log('Storing messages for conversation:', conversationId);
        // Store user message
        const userMessageData: MessageData = {
          content: message,
          sender: 'user',
          language: language
        };
        await dbOperations.addMessage(conversationId, userMessageData);

        // Store bot response
        const botMessageData: MessageData = {
          content: botResponse,
          sender: 'bot',
          language: language
        };
        await dbOperations.addMessage(conversationId, botMessageData);
        console.log('Messages stored successfully');
      } catch (error) {
        console.warn('Could not store messages in database:', error);
        // Continue without storing - messages will be lost but response is still generated
        // Note: In a production environment, you might want to implement a retry mechanism
        // or fallback to local storage for important messages
        
        // Log the specific error for debugging
        if (error instanceof Error) {
          console.error('Database error details:', error.message);
        }
      }
    }

    const response: ChatResponse = {
      response: botResponse,
      language: language
    };
    
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorResponse: ApiError = {
      message: 'Sorry, I encountered an error. Please try again.',
      language: 'en',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(errorResponse, { status: 200 }); // Return 200 with error message instead of 500
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
    },
  });
}