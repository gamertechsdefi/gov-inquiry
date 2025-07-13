interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
}

interface SearchResponse {
  results: SearchResult[];
  totalResults?: number;
  searchTime?: number;
}

interface StateInfo {
  name: string;
  capital: string;
  searchTerms: string[];
  governmentSites: string[];
}

// Serper API response types
interface SerperSearchResult {
  title?: string;
  link?: string;
  snippet?: string;
  source?: string;
  [key: string]: unknown;
}

interface SerperSearchResponse {
  organic?: SerperSearchResult[];
  [key: string]: unknown;
}

export class SearchService {
  private apiKey: string;
  private nigerianStates!: Map<string, StateInfo>;

  constructor() {
    this.apiKey = process.env.SERPER_API_KEY || '';
    this.initializeNigerianStates();
  }

  private initializeNigerianStates() {
    this.nigerianStates = new Map([
      ['ogun', {
        name: 'Ogun State',
        capital: 'Abeokuta',
        searchTerms: ['Ogun State', 'Abeokuta', 'Ogun government', 'Ogun state services'],
        governmentSites: ['ogunstate.gov.ng', 'ogunstate.com']
      }],
      ['lagos', {
        name: 'Lagos State',
        capital: 'Ikeja',
        searchTerms: ['Lagos State', 'Ikeja', 'Lagos government', 'Lagos state services'],
        governmentSites: ['lagosstate.gov.ng', 'lagos.gov.ng']
      }],
      ['oyo', {
        name: 'Oyo State',
        capital: 'Ibadan',
        searchTerms: ['Oyo State', 'Ibadan', 'Oyo government', 'Oyo state services'],
        governmentSites: ['oyostate.gov.ng', 'oyostate.net']
      }],
      ['ondo', {
        name: 'Ondo State',
        capital: 'Akure',
        searchTerms: ['Ondo State', 'Akure', 'Ondo government', 'Ondo state services'],
        governmentSites: ['ondostate.gov.ng']
      }],
      ['osun', {
        name: 'Osun State',
        capital: 'Osogbo',
        searchTerms: ['Osun State', 'Osogbo', 'Osun government', 'Osun state services'],
        governmentSites: ['osunstate.gov.ng']
      }],
      ['ekiti', {
        name: 'Ekiti State',
        capital: 'Ado-Ekiti',
        searchTerms: ['Ekiti State', 'Ado-Ekiti', 'Ekiti government', 'Ekiti state services'],
        governmentSites: ['ekitistate.gov.ng']
      }],
      ['kwara', {
        name: 'Kwara State',
        capital: 'Ilorin',
        searchTerms: ['Kwara State', 'Ilorin', 'Kwara government', 'Kwara state services'],
        governmentSites: ['kwarastate.gov.ng']
      }],
      ['kogi', {
        name: 'Kogi State',
        capital: 'Lokoja',
        searchTerms: ['Kogi State', 'Lokoja', 'Kogi government', 'Kogi state services'],
        governmentSites: ['kogistate.gov.ng']
      }],
      ['edo', {
        name: 'Edo State',
        capital: 'Benin City',
        searchTerms: ['Edo State', 'Benin City', 'Edo government', 'Edo state services'],
        governmentSites: ['edostate.gov.ng']
      }],
      ['delta', {
        name: 'Delta State',
        capital: 'Asaba',
        searchTerms: ['Delta State', 'Asaba', 'Delta government', 'Delta state services'],
        governmentSites: ['deltastate.gov.ng']
      }],
      ['rivers', {
        name: 'Rivers State',
        capital: 'Port Harcourt',
        searchTerms: ['Rivers State', 'Port Harcourt', 'Rivers government', 'Rivers state services'],
        governmentSites: ['riversstate.gov.ng']
      }],
      ['bayelsa', {
        name: 'Bayelsa State',
        capital: 'Yenagoa',
        searchTerms: ['Bayelsa State', 'Yenagoa', 'Bayelsa government', 'Bayelsa state services'],
        governmentSites: ['bayelsa.gov.ng']
      }],
      ['akwa ibom', {
        name: 'Akwa Ibom State',
        capital: 'Uyo',
        searchTerms: ['Akwa Ibom State', 'Uyo', 'Akwa Ibom government', 'Akwa Ibom state services'],
        governmentSites: ['akwaibomstate.gov.ng']
      }],
      ['cross river', {
        name: 'Cross River State',
        capital: 'Calabar',
        searchTerms: ['Cross River State', 'Calabar', 'Cross River government', 'Cross River state services'],
        governmentSites: ['crossriverstate.gov.ng']
      }],
      ['abia', {
        name: 'Abia State',
        capital: 'Umuahia',
        searchTerms: ['Abia State', 'Umuahia', 'Abia government', 'Abia state services'],
        governmentSites: ['abiastate.gov.ng']
      }],
      ['imo', {
        name: 'Imo State',
        capital: 'Owerri',
        searchTerms: ['Imo State', 'Owerri', 'Imo government', 'Imo state services'],
        governmentSites: ['imostate.gov.ng']
      }],
      ['anambra', {
        name: 'Anambra State',
        capital: 'Awka',
        searchTerms: ['Anambra State', 'Awka', 'Anambra government', 'Anambra state services'],
        governmentSites: ['anambrastate.gov.ng']
      }],
      ['enugu', {
        name: 'Enugu State',
        capital: 'Enugu',
        searchTerms: ['Enugu State', 'Enugu', 'Enugu government', 'Enugu state services'],
        governmentSites: ['enugustate.gov.ng']
      }],
      ['ebonyi', {
        name: 'Ebonyi State',
        capital: 'Abakaliki',
        searchTerms: ['Ebonyi State', 'Abakaliki', 'Ebonyi government', 'Ebonyi state services'],
        governmentSites: ['ebonyistate.gov.ng']
      }],
      ['abuja', {
        name: 'Federal Capital Territory',
        capital: 'Abuja',
        searchTerms: ['FCT Abuja', 'Federal Capital Territory', 'Abuja government', 'FCT services'],
        governmentSites: ['fct.gov.ng', 'abuja.gov.ng']
      }],
      ['kaduna', {
        name: 'Kaduna State',
        capital: 'Kaduna',
        searchTerms: ['Kaduna State', 'Kaduna', 'Kaduna government', 'Kaduna state services'],
        governmentSites: ['kadunastate.gov.ng']
      }],
      ['kano', {
        name: 'Kano State',
        capital: 'Kano',
        searchTerms: ['Kano State', 'Kano', 'Kano government', 'Kano state services'],
        governmentSites: ['kanostate.gov.ng']
      }],
      ['katsina', {
        name: 'Katsina State',
        capital: 'Katsina',
        searchTerms: ['Katsina State', 'Katsina', 'Katsina government', 'Katsina state services'],
        governmentSites: ['katsinastate.gov.ng']
      }],
      ['jigawa', {
        name: 'Jigawa State',
        capital: 'Dutse',
        searchTerms: ['Jigawa State', 'Dutse', 'Jigawa government', 'Jigawa state services'],
        governmentSites: ['jigawastate.gov.ng']
      }],
      ['yobe', {
        name: 'Yobe State',
        capital: 'Damaturu',
        searchTerms: ['Yobe State', 'Damaturu', 'Yobe government', 'Yobe state services'],
        governmentSites: ['yobestate.gov.ng']
      }],
      ['borno', {
        name: 'Borno State',
        capital: 'Maiduguri',
        searchTerms: ['Borno State', 'Maiduguri', 'Borno government', 'Borno state services'],
        governmentSites: ['bornostate.gov.ng']
      }],
      ['adamawa', {
        name: 'Adamawa State',
        capital: 'Yola',
        searchTerms: ['Adamawa State', 'Yola', 'Adamawa government', 'Adamawa state services'],
        governmentSites: ['adamawastate.gov.ng']
      }],
      ['taraba', {
        name: 'Taraba State',
        capital: 'Jalingo',
        searchTerms: ['Taraba State', 'Jalingo', 'Taraba government', 'Taraba state services'],
        governmentSites: ['tarabastate.gov.ng']
      }],
      ['gombe', {
        name: 'Gombe State',
        capital: 'Gombe',
        searchTerms: ['Gombe State', 'Gombe', 'Gombe government', 'Gombe state services'],
        governmentSites: ['gombestate.gov.ng']
      }],
      ['bauchi', {
        name: 'Bauchi State',
        capital: 'Bauchi',
        searchTerms: ['Bauchi State', 'Bauchi', 'Bauchi government', 'Bauchi state services'],
        governmentSites: ['bauchistate.gov.ng']
      }],
      ['plateau', {
        name: 'Plateau State',
        capital: 'Jos',
        searchTerms: ['Plateau State', 'Jos', 'Plateau government', 'Plateau state services'],
        governmentSites: ['plateaustate.gov.ng']
      }],
      ['nasarawa', {
        name: 'Nasarawa State',
        capital: 'Lafia',
        searchTerms: ['Nasarawa State', 'Lafia', 'Nasarawa government', 'Nasarawa state services'],
        governmentSites: ['nasarawastate.gov.ng']
      }],
      ['niger', {
        name: 'Niger State',
        capital: 'Minna',
        searchTerms: ['Niger State', 'Minna', 'Niger government', 'Niger state services'],
        governmentSites: ['nigerstate.gov.ng']
      }],
      ['kebbi', {
        name: 'Kebbi State',
        capital: 'Birnin Kebbi',
        searchTerms: ['Kebbi State', 'Birnin Kebbi', 'Kebbi government', 'Kebbi state services'],
        governmentSites: ['kebbistate.gov.ng']
      }],
      ['sokoto', {
        name: 'Sokoto State',
        capital: 'Sokoto',
        searchTerms: ['Sokoto State', 'Sokoto', 'Sokoto government', 'Sokoto state services'],
        governmentSites: ['sokotostate.gov.ng']
      }],
      ['zamfara', {
        name: 'Zamfara State',
        capital: 'Gusau',
        searchTerms: ['Zamfara State', 'Gusau', 'Zamfara government', 'Zamfara state services'],
        governmentSites: ['zamfarastate.gov.ng']
      }]
    ]);
  }

  async search(query: string, language: string = 'en'): Promise<SearchResult[]> {
    if (!this.apiKey) {
      console.warn('Serper API key not configured');
      return [];
    }

    try {
      console.log('Searching for:', query);
      
      // Detect states mentioned in the query
      const detectedStates = this.detectStates(query);
      console.log('Detected states:', detectedStates);
      
      // Create Nigeria-specific query
      const nigeriaQuery = this.createNigeriaSpecificQuery(query);
      
      // Enhance query with state-specific terms
      const enhancedQuery = this.enhanceQueryWithStates(nigeriaQuery, detectedStates);
      console.log('Enhanced query:', enhancedQuery);
      
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: enhancedQuery,
          gl: this.getCountryCode(language), // Always Nigeria
          hl: this.getLanguageCode(language),
          num: 5, // Limit to 5 results for faster responses
          // Add site restrictions for government sites if state is detected
          ...(detectedStates.length > 0 && {
            site: detectedStates.map(state => state.governmentSites).flat().join(' OR ')
          }),
          // Add Nigeria-specific site restrictions for better results
          ...(detectedStates.length === 0 && {
            site: 'gov.ng OR nigeria.gov.ng OR *.gov.ng'
          }),
          // Add location bias for Nigeria
          location: 'Nigeria',
          // Add time range for recent information
          time: 'm' // Last month
        }),
      });

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
      }

      const data: SerperSearchResponse = await response.json();
      
      if (data.organic && Array.isArray(data.organic)) {
        const results = data.organic.map((result: SerperSearchResult) => ({
          title: result.title || '',
          link: result.link || '',
          snippet: result.snippet || '',
          source: result.source || ''
        }));
        
        // Filter results to ensure they're Nigeria-relevant
        return this.filterNigeriaRelevantResults(results);
      }

      return [];
    } catch (error) {
      console.error('Search service error:', error);
      return [];
    }
  }

  // Detect Nigerian states mentioned in the query
  private detectStates(query: string): StateInfo[] {
    const lowerQuery = query.toLowerCase();
    const detectedStates: StateInfo[] = [];
    
    for (const [key, stateInfo] of this.nigerianStates) {
      // Check for state name, capital, or variations
      const stateName = stateInfo.name.toLowerCase();
      const capital = stateInfo.capital.toLowerCase();
      const stateKey = key.toLowerCase();
      
      if (lowerQuery.includes(stateKey) || 
          lowerQuery.includes(stateName) || 
          lowerQuery.includes(capital) ||
          stateInfo.searchTerms.some(term => lowerQuery.includes(term.toLowerCase()))) {
        detectedStates.push(stateInfo);
      }
    }
    
    return detectedStates;
  }

  // Enhance query with state-specific terms
  private enhanceQueryWithStates(query: string, states: StateInfo[]): string {
    if (states.length === 0) {
      // Even without state detection, add Nigeria context
      return `${query} Nigeria government services official`;
    }
    
    // If Ogun State is detected, prioritize it
    const ogunState = states.find(state => state.name === 'Ogun State');
    if (ogunState) {
      return `${query} ${ogunState.searchTerms.join(' ')} Nigeria government services official site`;
    }
    
    // For other states, add state-specific terms
    const stateTerms = states.map(state => state.searchTerms.join(' ')).join(' ');
    return `${query} ${stateTerms} Nigeria government services official site`;
  }

  private getCountryCode(language: string): string {
    // Always use Nigeria for better local results
    return 'ng';
  }

  private getLanguageCode(language: string): string {
    // Map language to Google language code
    const languageMap: { [key: string]: string } = {
      'en': 'en',
      'yo': 'yo',
      'ha': 'ha',
      'ig': 'ig'
    };
    return languageMap[language] || 'en';
  }

  // Create Nigeria-specific search query
  private createNigeriaSpecificQuery(query: string): string {
    // Add Nigeria context to any query
    const nigeriaContext = 'Nigeria government official site';
    
    // Add specific government agencies for common queries
    if (query.toLowerCase().includes('agriculture') || query.toLowerCase().includes('farm')) {
      return `${query} ${nigeriaContext} Federal Ministry of Agriculture`;
    }
    
    if (query.toLowerCase().includes('grant') || query.toLowerCase().includes('loan')) {
      return `${query} ${nigeriaContext} Bank of Industry CBN`;
    }
    
    if (query.toLowerCase().includes('passport') || query.toLowerCase().includes('immigration')) {
      return `${query} ${nigeriaContext} Nigeria Immigration Service`;
    }
    
    if (query.toLowerCase().includes('tax') || query.toLowerCase().includes('haraji')) {
      return `${query} ${nigeriaContext} FIRS Federal Inland Revenue Service`;
    }
    
    if (query.toLowerCase().includes('business') || query.toLowerCase().includes('cac')) {
      return `${query} ${nigeriaContext} Corporate Affairs Commission`;
    }
    
    if (query.toLowerCase().includes('vehicle') || query.toLowerCase().includes('car')) {
      return `${query} ${nigeriaContext} Federal Road Safety Corps`;
    }
    
    return `${query} ${nigeriaContext}`;
  }

  // Helper method to determine if a query needs real-time information
  needsRealTimeInfo(query: string): boolean {
    const realTimeKeywords = [
      'current', 'latest', 'recent', 'today', 'now', 'update', 'breaking',
      'news', 'weather', 'price', 'rate', 'exchange', 'covid', 'pandemic',
      'election', 'government', 'policy', 'law', 'regulation', 'announcement',
      'deadline', 'deadline', 'application', 'form', 'service', 'status',
      'check', 'verify', 'confirm', 'schedule', 'appointment', 'booking',
      'fee', 'fees', 'cost', 'payment', 'renewal', 'expiry', 'expired',
      'new', 'changed', 'modified', 'updated', 'recent', 'latest'
    ];

    const stateKeywords = [
      'state', 'local', 'regional', 'area', 'location', 'place', 'city',
      'town', 'village', 'district', 'zone', 'region'
    ];

    const lowerQuery = query.toLowerCase();
    
    // Check for real-time keywords
    const hasRealTimeKeywords = realTimeKeywords.some(keyword => lowerQuery.includes(keyword));
    
    // Check for state-specific queries
    const hasStateKeywords = stateKeywords.some(keyword => lowerQuery.includes(keyword));
    const hasDetectedStates = this.detectStates(query).length > 0;
    
    // Check for government service queries
    const governmentServices = [
      'passport', 'nin', 'driver license', 'vehicle registration', 'birth certificate',
      'death certificate', 'marriage certificate', 'business registration', 'cac',
      'tax', 'haraji', 'land registration', 'immigration', 'police clearance',
      'educational verification', 'health', 'hospital', 'school', 'university'
    ];
    
    const hasGovernmentServices = governmentServices.some(service => lowerQuery.includes(service));
    
    return hasRealTimeKeywords || hasStateKeywords || hasDetectedStates || hasGovernmentServices;
  }

  // Get state information for a specific state
  getStateInfo(stateName: string): StateInfo | null {
    const lowerStateName = stateName.toLowerCase();
    
    for (const [key, stateInfo] of this.nigerianStates) {
      if (key.toLowerCase() === lowerStateName || 
          stateInfo.name.toLowerCase() === lowerStateName ||
          stateInfo.capital.toLowerCase() === lowerStateName) {
        return stateInfo;
      }
    }
    
    return null;
  }

  // Get all Nigerian states
  getAllStates(): StateInfo[] {
    return Array.from(this.nigerianStates.values());
  }

  // Search specifically for Ogun State information
  async searchOgunState(query: string, language: string = 'en'): Promise<SearchResult[]> {
    const ogunState = this.getStateInfo('ogun');
    if (!ogunState) {
      return [];
    }
    
    const enhancedQuery = `${query} ${ogunState.searchTerms.join(' ')} Abeokuta Nigeria`;
    
    return this.search(enhancedQuery, language);
  }

  // Search specifically for Nigerian government agencies
  async searchNigerianGovernment(query: string, language: string = 'en'): Promise<SearchResult[]> {
    const governmentSites = [
      'gov.ng',
      'nigeria.gov.ng', 
      'federal.gov.ng',
      'boi.ng',
      'cbn.gov.ng',
      'firs.gov.ng',
      'immigration.gov.ng',
      'cac.gov.ng',
      'frsc.gov.ng',
      'agriculture.gov.ng'
    ];
    
    const enhancedQuery = `${query} Nigeria government official site`;
    
    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: enhancedQuery,
          gl: 'ng', // Nigeria
          hl: this.getLanguageCode(language),
          num: 5,
          site: governmentSites.join(' OR '),
          location: 'Nigeria',
          time: 'm' // Last month
        }),
      });

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
      }

      const data: SerperSearchResponse = await response.json();
      
      if (data.organic && Array.isArray(data.organic)) {
        const results = data.organic.map((result: SerperSearchResult) => ({
          title: result.title || '',
          link: result.link || '',
          snippet: result.snippet || '',
          source: result.source || ''
        }));
        
        return this.filterNigeriaRelevantResults(results);
      }

      return [];
    } catch (error) {
      console.error('Nigerian government search error:', error);
      return [];
    }
  }

  // Filter results to ensure they're Nigeria-relevant
  private filterNigeriaRelevantResults(results: SearchResult[]): SearchResult[] {
    const nigeriaKeywords = [
      'nigeria', 'nigerian', 'naija', 'ng', 'gov.ng', 'nigeria.gov.ng',
      'lagos', 'abuja', 'kano', 'ibadan', 'port harcourt', 'kaduna',
      'ogun', 'oyo', 'ondo', 'osun', 'ekiti', 'kwara', 'kogi',
      'edo', 'delta', 'rivers', 'bayelsa', 'akwa ibom', 'cross river',
      'abia', 'imo', 'anambra', 'enugu', 'ebonyi', 'katsina', 'jigawa',
      'yobe', 'borno', 'adamawa', 'taraba', 'gombe', 'bauchi', 'plateau',
      'nasarawa', 'niger', 'kebbi', 'sokoto', 'zamfara', 'abeokuta',
      'ikeja', 'osogbo', 'ado-ekiti', 'ilorin', 'lokoja', 'benin city',
      'asaba', 'yenagoa', 'uyo', 'calabar', 'umuahia', 'owerri', 'awka',
      'abakaliki', 'dutse', 'damaturu', 'maiduguri', 'yola', 'jalingo',
      'jos', 'lafia', 'minna', 'birnin kebbi', 'gusau'
    ];

    return results.filter(result => {
      const content = `${result.title} ${result.snippet} ${result.link}`.toLowerCase();
      
      // Check if content contains Nigeria-related keywords
      const hasNigeriaKeywords = nigeriaKeywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      );
      
      // Check if it's a government site
      const isGovernmentSite = result.link.includes('.gov.ng') || 
                              result.link.includes('nigeria.gov.ng') ||
                              result.link.includes('federal.gov.ng');
      
      // Check if it's not a US or international site (exclude common US domains)
      const isNotUSSite = !result.link.includes('.gov') && 
                         !result.link.includes('usda.gov') &&
                         !result.link.includes('agriculture.gov') &&
                         !result.link.includes('grants.gov');
      
      return hasNigeriaKeywords || isGovernmentSite || isNotUSSite;
    });
  }

  // Format search results for AI consumption
  formatSearchResults(results: SearchResult[], originalQuery?: string): string {
    if (results.length === 0) {
      return 'No recent information found. Please try rephrasing your question or check official government sources.';
    }

    let formatted = 'Recent information from web search:\n\n';
    
    // Add state context if detected
    if (originalQuery) {
      const detectedStates = this.detectStates(originalQuery);
      if (detectedStates.length > 0) {
        formatted += `**State-specific search results for:** ${detectedStates.map(s => s.name).join(', ')}\n\n`;
      }
    }
    
    results.forEach((result, index) => {
      formatted += `${index + 1}. **${result.title}**\n`;
      formatted += `   Source: ${result.source || 'Web'}\n`;
      formatted += `   ${result.snippet}\n`;
      formatted += `   Link: ${result.link}\n\n`;
    });

    formatted += 'Please use this information to provide accurate and up-to-date responses. Always cite sources when possible.';
    
    return formatted;
  }
} 