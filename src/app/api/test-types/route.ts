import { NextRequest, NextResponse } from 'next/server';
import { 
  ChatRequest, 
  ChatResponse, 
  MessageData, 
  ConversationData,
  FirebaseMessage,
  FirebaseConversation,
  AnonymousToken,
  ApiError,
  SupportedLanguage 
} from '@/lib/types';

export async function GET() {
  try {
    // Test type definitions
    const testMessageData: MessageData = {
      content: 'Test message',
      sender: 'user',
      language: 'en'
    };

    const testConversationData: ConversationData = {
      user_id: 'test-user',
      language: 'en',
      status: 'active'
    };

    const testFirebaseMessage: FirebaseMessage = {
      id: 'test-msg-1',
      content: 'Test Firebase message',
      sender: 'bot',
      language: 'en',
      timestamp: new Date().toISOString()
    };

    const testFirebaseConversation: FirebaseConversation = {
      id: 'test-conv-1',
      user_id: 'test-user',
      language: 'en',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const testAnonymousToken: AnonymousToken = {
      id: 'test-token',
      type: 'anonymous',
      messageCount: 0,
      maxMessages: 10,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    const testChatRequest: ChatRequest = {
      message: 'Test message',
      conversationId: 'test-conv',
      selectedLanguage: 'en'
    };

    const testChatResponse: ChatResponse = {
      response: 'Test response',
      language: 'en'
    };

    const testApiError: ApiError = {
      message: 'Test error',
      language: 'en',
      details: 'Test error details'
    };

    return NextResponse.json({
      success: true,
      message: 'All type definitions are working correctly',
      tests: {
        messageData: testMessageData,
        conversationData: testConversationData,
        firebaseMessage: testFirebaseMessage,
        firebaseConversation: testFirebaseConversation,
        anonymousToken: testAnonymousToken,
        chatRequest: testChatRequest,
        chatResponse: testChatResponse,
        apiError: testApiError
      }
    });

  } catch (error) {
    console.error('Type test error:', error);
    const errorResponse: ApiError = {
      message: 'Type test failed',
      language: 'en',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
    // Test that the request body is properly typed
    const response: ChatResponse = {
      response: `Received message: ${body.message}`,
      language: body.selectedLanguage || 'en'
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    const errorResponse: ApiError = {
      message: 'Failed to process request',
      language: 'en',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }
} 