import { NextRequest, NextResponse } from 'next/server';
import { GOVERNMENT_SERVICES } from '@/lib/government-service';
import { ConversationData, GovernmentService, SupportedLanguage } from '@/lib/types';

export async function GET() {
  try {
    // Test GovernmentService type with index signature
    const testService: GovernmentService = {
      id: 'test-service',
      name: 'Test Service',
      description: 'A test service',
      category: 'test',
      requirements: ['requirement1'],
      process_steps: ['step1'],
      estimated_time: '1 day',
      cost: '1000 NGN',
      office_locations: ['Lagos'],
      translations: {
        en: { name: 'Test', description: 'Test', requirements: [], process_steps: [] },
        yo: { name: 'Test', description: 'Test', requirements: [], process_steps: [] },
        ha: { name: 'Test', description: 'Test', requirements: [], process_steps: [] },
        ig: { name: 'Test', description: 'Test', requirements: [], process_steps: [] }
      },
      // Test that we can add additional properties
      customProperty: 'test value'
    };

    // Test ConversationData type with messages
    const testConversationData: ConversationData = {
      user_id: 'test-user',
      language: 'en',
      status: 'active',
      messages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Test that GOVERNMENT_SERVICES can be cast to the required type
    const servicesArray = GOVERNMENT_SERVICES as Array<{ id: string; [key: string]: unknown }>;

    return NextResponse.json({
      success: true,
      message: 'Type fixes are working correctly',
      tests: {
        governmentService: testService,
        conversationData: testConversationData,
        servicesArrayLength: servicesArray.length,
        servicesArrayType: typeof servicesArray
      }
    });

  } catch (error) {
    console.error('Type fix test error:', error);
    return NextResponse.json({ 
      error: 'Type fix test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, language }: { userId: string; language?: SupportedLanguage } = await request.json();
    
    // Test conversation data creation
    const conversationData: ConversationData = {
      user_id: userId,
      language: language || 'en',
      status: 'active',
      messages: []
    };
    
    return NextResponse.json({
      success: true,
      message: 'Conversation data creation test passed',
      conversationData
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Conversation data test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
} 