<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/da1e7b9d-6759-45ab-bc24-1a8237668537

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example`
3. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
4. Add your Firebase web app config values in `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_DATABASE_ID` only if you use a non-default Firestore database
5. In Firebase Console, enable Google sign-in under Authentication > Sign-in method
6. Add `localhost` to Authentication > Settings > Authorized domains
7. Create Firestore and deploy the rules from `firestore.rules`
8. Run the app:
   `npm run dev`

Gemini requests now go through a local backend proxy instead of shipping the Gemini key to the browser.

## Firebase Setup

1. Open your `QA Studio` Firebase project.
2. Go to Project settings > General.
3. Under `Your apps`, create a Web app if you have not already.
4. Copy the Firebase SDK config values into `.env.local`.
5. Go to Authentication > Sign-in method and enable `Google`.
6. Go to Authentication > Settings > Authorized domains and add `localhost`.
7. Go to Firestore Database and create the database.
8. Publish the rules from `firestore.rules`.

Once those values are set, the app will use your Firebase project instead of the checked-in AI Studio config.
