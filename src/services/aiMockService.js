// Mock AI Service for testing
export const mockAIService = {
  async analyzeHand(handData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      data: {
        analysis: "החלטה מעולה! המאמן AI (Mock) מסכים עם הבחירה שלך. זה ניתוח דמה לבדיקת השילוב.",
        meta: {
          tokens_used: 150,
          model: "mock-ai-coach",
          timestamp: new Date().toISOString()
        }
      }
    };
  },

  async askCoach(question, context) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      data: {
        response: `שאלה מעולה! זה מאמן AI דמה. השאלה שלך: "${question.substring(0, 50)}..." זה בדיקה שהשילוב עובד. בקרוב יהיה כאן מאמן אמיתי!`,
        coach: "דני (Mock)",
        meta: {
          tokens_used: 80,
          model: "mock-ai-coach"
        }
      }
    };
  },

  async healthCheck() { return true; },
  clearCache() { console.log("Mock cache cleared"); },
  getCacheStats() { return { cacheSize: 0, isAuthenticated: true }; }
};
