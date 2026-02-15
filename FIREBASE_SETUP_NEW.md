# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project" 
3. Project name: `project-dashboard`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Click "Save"

## Step 3: Configure Email Recovery

1. In Firebase Console, go to "Authentication" → "Templates"
2. Select "Password reset" template
3. Customize the email template (optional)
4. Make sure "Password reset" is enabled
5. You can also customize "Email address verification" and "Email change verification"

## Step 4: Enable Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select location: "asia-southeast1" (or nearest)
5. Click "Create"

## Step 5: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" (</> icon)
4. App nickname: `Project Dashboard`
5. Click "Register app"
6. Copy the firebaseConfig object

## Step 6: Update Firebase Config

Replace the content in `src/lib/firebase.ts` with your actual config:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
```

## Step 7: Test Login & Password Reset

1. Run `npm run dev`
2. Go to http://localhost:3002
3. Try to login with any email/password
4. First time users will be created automatically
5. Test password reset:
   - Click "Forgot your password?"
   - Enter email
   - Check your email for reset link

## Step 8: Add Test Users (Optional)

In Firebase Console → Authentication → Users:
- Add users manually for testing
- Or use any email/password during first login

## Password Reset Flow

1. User clicks "Forgot your password?" on login page
2. User enters email address
3. Firebase sends reset email to user
4. User clicks link in email
5. User sets new password
6. User can login with new password

## Troubleshooting

If still getting "configuration-not-found" error:
1. Double-check all config values are correct
2. Make sure Authentication is enabled
3. Check API key restrictions (if any)
4. Verify project ID matches exactly

If password reset not working:
1. Check Authentication → Templates → Password reset
2. Make sure email template is enabled
3. Check spam/junk folder for reset emails
4. Verify email address is correct
