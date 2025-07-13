# Firebase Setup Guide

## Quick Fix for "Firebase not configured" Error

The error you're seeing occurs because Firebase environment variables aren't properly configured. Here's how to fix it:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

## Step 2: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Register your app with a nickname
6. Copy the configuration object

## Step 3: Create Environment File

Create a `.env.local` file in your project root with these variables:

```bash
# Firebase Configuration (REQUIRED - must start with NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com

# Google Gemini AI Configuration
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Step 4: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable "Anonymous" authentication

## Step 5: Set Up Realtime Database

1. In Firebase Console, go to "Realtime Database"
2. Click "Create database"
3. Choose a location (pick closest to your users)
4. Start in "test mode" for now (we'll add security rules later)
5. Copy the database URL to your `.env.local` file

## Step 6: Add Security Rules

1. In Realtime Database, go to "Rules" tab
2. Replace the rules with the content from `firebase-rules.json` in your project
3. Click "Publish"

## Step 7: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
# Then restart it
npm run dev
# or
pnpm dev
```

## Important Notes

- **NEXT_PUBLIC_ prefix is REQUIRED** for client-side access
- Never commit `.env.local` to version control
- The app will work anonymously even without Firebase, but with limited features
- Make sure all environment variables are properly set before testing authentication

## Troubleshooting

### Still getting "Firebase not configured"?
1. Check that all variables start with `NEXT_PUBLIC_`
2. Restart your development server
3. Clear browser cache
4. Check browser console for specific error messages

### Authentication not working?
1. Verify Email/Password auth is enabled in Firebase Console
2. Check that your API key is correct
3. Ensure your auth domain matches your Firebase project

### Database errors?
1. Make sure Realtime Database is created
2. Check that database URL is correct
3. Verify security rules are published

## Current Status

✅ **Anonymous users**: Working with local storage (10 message limit)
✅ **Chat functionality**: Working without Firebase
⚠️ **User accounts**: Requires Firebase setup
⚠️ **Persistent data**: Requires Firebase setup

Once you complete this setup, you'll have:
- ✅ Full user authentication
- ✅ Unlimited messages for registered users
- ✅ Persistent conversations across devices
- ✅ Secure data storage 