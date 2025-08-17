import OpenAI from 'openai';
import { authenticate, rateLimit, corsMiddleware } from '../middleware/auth.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System message for the AI coach
const COACH_SYSTEM_MESSAGE = `אתה "דני" - מאמן פוקר ישראלי מקצועי ומנוסה עם 20 שנות ניסיון.

התכונות שלך:
- ידע עמוק בפוקר טקסס הולדם
- יכולת הסבר מושגים מורכבים בפשטות 
- סבלנות ואמפתיה לשחקנים מתחילים
- עצות מעשיות וישימות
- דיבור בעברית טבעית וחמה

כשמשתמש שואל שאלה:
1. תן תשובה ברורה ומובנת
2. השתמש בדוגמאות קונקרטיות
3. הסבר את ההגיון מאחורי העצות
4. עודד ובנה ביטחון
5. שמור על תשובות של 100-250 מילים

תמיד זכור - המטרה היא ללמד ולשפר, לא להרשים בידע.`;

// Validate chat request
const validateChatRequest = (data) => {
  const { question, context } = data;
  
  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    throw new Error('השאלה חייבת להכיל לפחות 3 תווים');
  }
  
  if (question.length > 500) {
    throw new Error('השאלה ארוכה מדי (מקסימום 500 תווים)');
  }
  
  return true;
};

export default async function handler(req, res) {
  corsMiddleware(req, res, () => {
    authenticate(req, res, () => {
      rateLimit(8, 15 * 60 * 1000)(req, res, async () => {
        if (req.method !== 'POST') {
          return res.status(405).json({ 
            error: 'Method not allowed',
            code: 'METHOD_NOT_ALLOWED' 
          });
        }
        
        try {
          validateChatRequest(req.body);
          
          const { question, context } = req.body;
          
          // Build context if provided
          let contextPrompt = '';
          if (context && context.lastHand) {
            contextPrompt = `\n\nהקשר נוסף: השחקן זה עתה שיחק יד עם קלפים ${context.lastHand.cards?.map(c => c.rank + c.suit).join(', ')} מפוזיציה ${context.lastHand.position}.`;
          }
          
          console.log(`AI Coach question from user: ${req.user?.id || 'anonymous'} - "${question.substring(0, 50)}..."`);
          
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: COACH_SYSTEM_MESSAGE
              },
              {
                role: "user",
                content: question + contextPrompt
              }
            ],
            max_tokens: 400,
            temperature: 0.8,
          });
          
          const response = completion.choices[0].message.content;
          
          console.log(`AI Coach response completed. Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);
          
          res.status(200).json({
            success: true,
            response,
            coach: "דני",
            meta: {
              tokens_used: completion.usage?.total_tokens,
              model: "gpt-3.5-turbo", 
              timestamp: new Date().toISOString()
            }
          });
          
        } catch (error) {
          console.error('AI Coach Error:', error);
          
          if (error.message.includes('חייב') || error.message.includes('ארוך')) {
            return res.status(400).json({
              error: error.message,
              code: 'VALIDATION_ERROR'
            });
          }
          
          if (error.code === 'insufficient_quota') {
            return res.status(503).json({
              error: 'דני המאמן זמנית לא זמין. נסה שוב מאוחר יותר',
              code: 'AI_SERVICE_UNAVAILABLE'
            });
          }
          
          res.status(500).json({
            error: 'שגיאה בתקשורת עם המאמן. נסה שוב',
            code: 'INTERNAL_ERROR'
          });
        }
      });
    });
  });
}
