import React from 'react';
import { Search, Globe } from 'lucide-react';

interface SearchIndicatorProps {
  isSearching: boolean;
  language: string;
}

export const SearchIndicator: React.FC<SearchIndicatorProps> = ({ isSearching, language }) => {
  if (!isSearching) return null;

  const messages = {
    en: "Searching for current information...",
    yo: "Ṣiṣẹ nipa alaye lọwọlọwọ...",
    ha: "Ana neman bayani na yanzu...",
    ig: "Na-achọ ozi ugbu a..."
  };

  return (
    <div className="flex justify-start">
      <div className="bg-blue-50 text-blue-800 shadow-md px-4 py-2 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Search className="w-4 h-4 animate-pulse" />
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">
            {messages[language as keyof typeof messages] || messages.en}
          </span>
        </div>
      </div>
    </div>
  );
}; 