import { NextRequest, NextResponse } from 'next/server';
import { SearchService } from '@/lib/search-service';

export async function POST(request: NextRequest) {
  try {
    const { query, language = 'en' } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const searchService = new SearchService();
    const results = await searchService.search(query, language);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
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