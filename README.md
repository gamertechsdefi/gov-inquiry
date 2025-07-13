# Nigerian Government Service Assistant

An AI-powered chatbot for Nigerian government services, supporting English, Yoruba, Hausa, and Igbo languages. Built with Next.js, Firebase, and Google Gemini AI.

## Features

- **Multi-language Support**: English, Yoruba, Hausa, and Igbo
- **AI-Powered Responses**: Using Google Gemini AI with Nigeria-specific prompts
- **Real-time Web Search**: Integrated with Serper API for current information
- **State-Aware Search**: Automatically detects and prioritizes Nigerian states (especially Ogun State)
- **Context-Aware Queries**: Enhances searches with state-specific terms and government sites
- **Authentication System**: 
  - Anonymous users: 10 messages limit with local storage token
  - Registered users: Unlimited messages with Firebase Auth
- **Memory Management**: Automatic cleanup of old conversations and messages
- **Real-time Chat**: Firebase Realtime Database integration
- **Markdown Support**: Rich formatting for AI responses
- **Search Toggle**: Users can enable/disable real-time search functionality

## Authentication System

### Anonymous Users
- Users can try the service anonymously with a 10-message limit
- Token stored in localStorage with 24-hour expiration
- Automatic cleanup when token expires

### Registered Users
- Sign up with email/password for unlimited messages
- Conversations persist across sessions
- Memory management prevents excessive data storage

## Setup

### Prerequisites
- Node.js 18+ 
- Firebase project with Realtime Database
- Google Gemini API key

### Environment Variables
Create a `.env.local` file:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Serper API (for real-time web search)
SERPER_API_KEY=your_serper_api_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password and Anonymous)
3. Create Realtime Database
4. Set up security rules for your database
5. Add your Firebase config to environment variables

### Database Structure
```
conversations/
  {conversationId}/
    id: string
    userId: string
    language: string
    created_at: timestamp
    updated_at: timestamp

messages/
  {conversationId}/
    {messageId}/
      id: string
      content: string
      sender: 'user' | 'bot'
      language: string
      timestamp: timestamp

services/
  {serviceId}/
    id: string
    name: string
    description: string
    steps: array
    requirements: array
    fees: object
```

## Memory Management

The system includes automatic memory management:
- Maximum 50 messages per conversation
- Maximum 10 conversations per user
- Automatic cleanup of old data
- Anonymous tokens expire after 24 hours

## API Routes

- `/api/chat` - Process chat messages
- `/api/conversion` - Manage conversations
- `/api/service` - Government service information
- `/api/search` - Real-time web search functionality
- `/api/test-search` - Test state-aware search functionality
- `/api/test-firebase` - Test Firebase connectivity

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **AI**: Google Generative AI (Gemini)
- **Language Detection**: Franc.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
