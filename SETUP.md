# Nigerian Government Chatbot - Firebase Setup Guide

## Overview
This application is a comprehensive Nigerian government service assistant that provides detailed, accurate information about Nigerian government services, requirements, procedures, and policies. The chatbot is specifically designed to help Nigerians navigate government services efficiently.

## Key Features

### 🇳🇬 **Nigeria-Specific Services**
- **Passport Applications**: Standard, Official, and Diplomatic passports
- **National ID (NIN) Registration**: Complete NIN and National ID card process
- **Driver's License**: Learner's permit, Provisional, and Permanent licenses
- **Business Registration (CAC)**: Corporate registration and compliance
- **Tax Payment & Filing**: Personal and business tax services
- **Vehicle Registration**: Motor vehicle licensing and registration
- **Birth/Death/Marriage Certificates**: Civil registration services
- **Educational Certificate Verification**: Academic credential verification
- **Land & Property Registration**: Real estate documentation
- **Immigration Services**: Visa and residency services
- **Police Clearance**: Criminal record checks
- **And many more Nigerian government services**

### 🌍 **Multi-Language Support**
- **English**: Primary language with comprehensive details
- **Yoruba (Yorùbá)**: Complete translations with cultural context
- **Hausa**: Full service information in Hausa language
- **Igbo (Ìgbò)**: Comprehensive Igbo language support

### 🤖 **AI-Powered Responses**
- **Google Gemini AI**: Advanced language processing
- **Nigeria-Specific Knowledge**: Current fees, procedures, and policies
- **Step-by-Step Guidance**: Detailed process instructions
- **Real-time Information**: Updated government service details

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com

# Google Generative AI (Gemini) API Key
GEMINI_API_KEY=your_gemini_api_key
```

## Firebase Realtime Database Structure

The application uses the following database structure for Nigerian government services:

```
/
├── conversations/
│   ├── {conversationId}/
│   │   ├── id: string
│   │   ├── user_id: string
│   │   ├── language: string (en/yo/ha/ig)
│   │   ├── status: string (active/completed/transferred)
│   │   ├── created_at: string
│   │   └── updated_at: string
├── messages/
│   ├── {conversationId}/
│   │   ├── {messageId}/
│   │   │   ├── id: string
│   │   │   ├── content: string
│   │   │   ├── sender: string (user/bot)
│   │   │   ├── language: string
│   │   │   └── timestamp: string
└── services/
    ├── {serviceId}/
    │   ├── id: string
    │   ├── name: string
    │   ├── description: string
    │   ├── category: string
    │   ├── requirements: array
    │   ├── process_steps: array
    │   ├── estimated_time: string
    │   ├── cost: string (in Nigerian Naira)
    │   ├── office_locations: array
    │   └── translations: object
```

## Key Changes Made

### 1. **Enhanced AI Service** (`src/lib/ai-service.ts`)
- **Nigeria-Focused Prompts**: Comprehensive system prompts for Nigerian services
- **Detailed Guidelines**: Step-by-step procedures with current information
- **Multi-language Support**: Full prompts in English, Yoruba, Hausa, and Igbo
- **Current Information**: Updated fees, processing times, and requirements

### 2. **Comprehensive Government Services** (`src/lib/government-service.ts`)
- **Expanded Services**: Added NIN registration, driver's license, tax services
- **Detailed Information**: Current fees, processing times, office locations
- **Complete Translations**: All services available in 4 languages
- **Practical Details**: Step-by-step procedures with specific requirements

### 3. **Firebase Integration** (`src/lib/firebase.ts`)
- **Database Operations**: Complete CRUD operations for conversations and messages
- **Service Management**: Auto-initialization of government services
- **Real-time Updates**: Live conversation and message handling

### 4. **API Routes** (Updated for Nigeria-specific services)
- **`/api/chat/route.ts`**: Enhanced with Nigeria-specific context
- **`/api/service/route.ts`**: Auto-initializes comprehensive Nigerian services
- **`/api/conversion/route.ts`**: Manages conversations with language support

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Realtime Database
   - Set up security rules (see below)
   - Copy your Firebase config to `.env.local`

3. **Get Gemini API Key**
   - Visit https://makersuite.google.com/app/apikey
   - Create an API key
   - Add it to `.env.local`

4. **Firebase Security Rules**
   ```json
   {
     "rules": {
       "conversations": {
         ".read": true,
         ".write": true
       },
       "messages": {
         ".read": true,
         ".write": true
       },
       "services": {
         ".read": true,
         ".write": false
       }
     }
   }
   ```

5. **Run the Application**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Nigeria-Specific Features

### **Current Service Information**
- **Passport Fees**: ₦25,000 (32 pages), ₦35,000 (64 pages)
- **NIN Registration**: Free
- **Driver's License**: ₦6,350 (new), ₦3,000 (renewal)
- **Business Registration**: ₦10,000 - ₦50,000 (based on share capital)
- **Tax Rates**: Personal (7-24%), Corporate (30%)

### **Government Office Locations**
- **NIS Offices**: Lagos, Abuja, Kano, Port Harcourt, Enugu, Kaduna, Ibadan, Calabar
- **NIMC Centers**: All state capitals and major local government areas
- **FRSC Offices**: Nationwide coverage
- **CAC Offices**: All state capitals and headquarters in Abuja
- **FIRS Offices**: Nationwide with online portal access

### **Processing Times**
- **Passport**: 6-8 weeks (new), 3-4 weeks (renewal)
- **NIN**: Same day (slip), 3-6 months (ID card)
- **Driver's License**: 2-4 weeks
- **Business Registration**: 2-3 weeks
- **Tax Filing**: Same day (payment), 1-2 weeks (processing)

## Troubleshooting

1. **Firebase Connection Issues**
   - Verify your Firebase config in `.env.local`
   - Check Firebase console for any errors
   - Ensure Realtime Database is enabled

2. **Gemini API Issues**
   - Verify your API key is correct
   - Check API usage limits
   - Ensure the API key has proper permissions

3. **Service Information**
   - Services are auto-initialized on first API call
   - Check Firebase console to verify data structure
   - All information is current as of latest update

## Dependencies

- `firebase`: Firebase SDK for real-time database
- `@google/generative-ai`: Google Gemini AI for intelligent responses
- `franc`: Language detection for automatic language switching
- `lucide-react`: Modern icons for UI
- `next`: React framework for server-side rendering
- `react`: React library for user interface

## Support

This chatbot is specifically designed to help Nigerians navigate government services efficiently. It provides:
- **Accurate Information**: Current fees, procedures, and requirements
- **Multi-language Support**: English, Yoruba, Hausa, and Igbo
- **Step-by-step Guidance**: Detailed process instructions
- **Real-time Updates**: Latest government service information

For technical support or to report issues, please check the Firebase console and application logs. 