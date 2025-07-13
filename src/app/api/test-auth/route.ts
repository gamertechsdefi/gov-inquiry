import { NextRequest, NextResponse } from 'next/server';
import { authOperations, tokenManager } from '@/lib/firebase';

export async function GET() {
  try {
    // Test Firebase availability
    const isFirebaseConfigured = () => {
      const hasApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                       process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_firebase_api_key_here';
      const hasProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      const hasAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
      const hasDatabaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
      
      return hasApiKey && hasProjectId && hasAuthDomain && hasDatabaseURL;
    };

    const firebaseAvailable = isFirebaseConfigured();
    
    // Test anonymous token generation
    const testToken = tokenManager.generateAnonymousToken();
    const retrievedToken = tokenManager.getAnonymousToken();
    
    return NextResponse.json({
      success: true,
      message: 'Authentication test completed',
      results: {
        firebaseConfigured: firebaseAvailable,
        environmentVariables: {
          hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          hasDatabaseURL: !!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        },
        anonymousToken: {
          generated: !!testToken,
          retrieved: !!retrievedToken,
          messageCount: testToken.messageCount,
          maxMessages: testToken.maxMessages,
          remainingMessages: tokenManager.getRemainingMessages()
        }
      }
    });

  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json({ 
      error: 'Auth test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action }: { action: string } = await request.json();
    
    switch (action) {
      case 'generate-token':
        const token = tokenManager.generateAnonymousToken();
        return NextResponse.json({
          success: true,
          token,
          remainingMessages: tokenManager.getRemainingMessages()
        });
        
      case 'increment-count':
        const canSend = tokenManager.incrementMessageCount();
        return NextResponse.json({
          success: true,
          canSend,
          remainingMessages: tokenManager.getRemainingMessages()
        });
        
      case 'clear-token':
        tokenManager.clearAnonymousToken();
        return NextResponse.json({
          success: true,
          message: 'Token cleared'
        });
        
      default:
        return NextResponse.json({
          error: 'Unknown action',
          availableActions: ['generate-token', 'increment-count', 'clear-token']
        }, { status: 400 });
    }
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Auth action failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
} 