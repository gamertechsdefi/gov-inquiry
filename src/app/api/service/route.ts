// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/lib/firebase';
import { GOVERNMENT_SERVICES } from '@/lib/government-service';
import { SupportedLanguage } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') as SupportedLanguage;
    const category = searchParams.get('category');
    const userId = searchParams.get('userId');

    // If userId is provided, return user conversations instead of services
    if (userId) {
      console.log('Fetching conversations for user:', userId);
      const conversations = await dbOperations.getUserConversations(userId, 10);
      return NextResponse.json(conversations, { status: 200 });
    }

    // Initialize services if they don't exist
    await dbOperations.initializeServices(GOVERNMENT_SERVICES as Array<{ id: string; [key: string]: unknown }>);

    // Get all services
    let services = await dbOperations.getServices();

    // Filter by category if specified
    if (category) {
      services = services.filter(service => service.category === category);
    }

    // Filter/transform based on language if needed
    const processedServices = services.map(service => {
      if (language && language !== 'en' && service.translations?.[language]) {
        return {
          ...service,
          ...service.translations[language]
        };
      }
      return service;
    });

    return NextResponse.json(processedServices, { status: 200 });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
  }
}

// Optionally, you can define an OPTIONS handler or let Next.js handle it automatically
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, OPTIONS',
    },
  });
}