// API Configuration for Poker Academy

// בפיתוח - localhost, בפרודקשן - הURL של Vercel
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-backend.vercel.app/api';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    ANALYZE_HAND: '/analyze-hand',
    AI_COACH: '/ai-coach',
    HEALTH: '/health'
  },
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 2
};

// בפרודקשן תצטרך להחליף ל-URL האמיתי שלך:
// const API_BASE_URL = 'https://poker-academy-backend.vercel.app/api';
