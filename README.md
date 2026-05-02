# Collabo — Where Teams Think, Build, and Ship Together

An AI-powered Team Collaboration Platform where teams think, build, and ship together.

## 🌟 Unique Selling Points (USP)
1. **Gemini AI auto-suggests tasks and priorities** based on project goals.
2. **Real-time sync** across all team members via Firebase Firestore.
3. **Full team workload visibility** in one comprehensive dashboard.
4. **Enterprise security** with strict Firebase rules.
5. **One-click Google login**, zero friction onboarding.

## 🏗 Architecture Overview
- **Frontend**: React.js 18 with TypeScript and Vite.
- **Backend/API**: Node.js + Express (serving the frontend and proxying Gemini API requests).
- **Database**: Firebase Firestore (real-time).
- **Authentication**: Firebase Authentication (Google Sign-In).
- **Styling**: Tailwind CSS for a modern, beautiful UI.

## 🚀 Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your keys:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GEMINI_API_KEY=your_gemini_key
   PORT=8080
   ```

3. **Development**
   Run the Vite dev server for frontend testing:
   ```bash
   npm run dev
   ```

   Run the Express server locally:
   ```bash
   npm run build
   npm start
   ```

## 🐳 Deployment Steps (Google Cloud Run)

The application is fully containerized using a multi-stage Docker build.

1. **Build the image**
   ```bash
   docker build -t collabo-app .
   ```

2. **Test locally**
   ```bash
   docker run -p 8080:8080 --env-file .env collabo-app
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy collabo --source . --port 8080 --allow-unauthenticated
   ```

## 🧪 Testing
We use Jest for unit testing.
```bash
npm test
```
