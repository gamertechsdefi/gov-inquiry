// app/api/conversations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/lib/firebase';
import { ConversationData, SupportedLanguage } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { userId, language }: { userId: string; language?: SupportedLanguage } = await request.json();

    // For anonymous users or when Firebase is not configured, create a local conversation
    if (userId === 'anonymous' || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your_firebase_api_key_here') {
      const conversationId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const conversation = {
        id: conversationId,
        user_id: userId,
        language: language || 'en',
        status: 'active',
        messages: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return NextResponse.json(conversation, { status: 200 });
    }

    // For registered users, create conversation in Firebase
    console.log('Creating Firebase conversation for user:', userId);
    try {
      const conversationData: ConversationData = {
        user_id: userId,
        language: language || 'en',
        status: 'active',
        messages: []
      };
      const conversation = await dbOperations.createConversation(conversationData);
      console.log('Created Firebase conversation:', conversation.id);
      return NextResponse.json(conversation, { status: 200 });
    } catch (firebaseError) {
      console.error('Firebase conversation creation failed, falling back to local:', firebaseError);
      // Fallback to local conversation for registered users when Firebase fails
      const conversationId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const conversation = {
        id: conversationId,
        user_id: userId,
        language: language || 'en',
        status: 'active',
        messages: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return NextResponse.json(conversation, { status: 200 });
    }
  } catch (error) {
    console.error('Conversation creation error:', error);
    
    // Fallback for Firebase errors - create local conversation
    // Note: We can't read request.json() again, so we'll create a local conversation with default values
    const conversationId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const conversation = {
      id: conversationId,
      user_id: 'anonymous', // Fallback to anonymous
      language: 'en', // Fallback to English
      status: 'active',
      messages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json(conversation, { status: 200 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json({ message: 'Conversation ID is required' }, { status: 400 });
    }

    console.log('Fetching messages for conversation:', conversationId);

    // For local conversations, return empty array (messages are stored in localStorage)
    if (conversationId.startsWith('local_')) {
      console.log('Local conversation - returning empty array');
      return NextResponse.json([], { status: 200 });
    }

    console.log('Fetching Firebase conversation messages');
    const messages = await dbOperations.getConversationMessages(conversationId);
    console.log('Retrieved messages:', messages.length);

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Conversation fetch error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array as fallback
  }
}

export async function OPTIONS() {
  return new  Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}