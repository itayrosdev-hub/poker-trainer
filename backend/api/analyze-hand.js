import OpenAI from 'openai';
import { authenticate, rateLimit, corsMiddleware } from '../middleware/auth.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to create poker analysis prompt
const createPokerPrompt = (handData) => {
  const { cards, position, scenario, decision } = handData;
  
  return `אתה מאמן פוקר מקצועי וישראלי מנוסה. נתח את המצב הבא:

קלפים: ${cards.map(c => c.rank + c.suit).join(', ')}
פוזיציה: ${position}
מצב השולחן: ${scenario.isRaised ? `יש העלאה של $${scenario.toCall}` : 'אין פעולות'}
פוט נוכחי: $${scenario.pot}
מספר קוראים: ${scenario.numCallers || 0}
החלטת השחקן: ${decision}

אנא תן ניתוח מפורט בעברית הכולל:

1. האם ההחלטה נכונה? (כן/לא ומדוע)
2. הסבר מפורט על כוח היד במצב הזה
3. שיקולי הפוזיציה
4. אלטרנטיבות אפשריות וההשלכות שלהן
5. טיפ קצר לשיפור הביצועים

תן תשובה מקצועית אך ידידותית, בערך 150-200 מילים.`;
};

// Validate hand data
const validateHandData = (data) => {
  const { cards, position, scenario, decision } = data;
  
  if (!cards || !Array.isArray(cards) || cards.length !== 2) {
    throw new Error('נדרשים בדיוק 2 קלפים');
  }
  
  if (!position || typeof position !== 'string') {
    throw new Error('פוזיציה נדרשת');
  }
  
  if (!scenario || typeof scenario !== 'object') {
    throw new Error('נתוני תרחיש נדרשים');
  }
  
  if (!decision || !['FOLD', 'CALL', 'RAISE'].includes(decision)) {
    throw new Error('החלטה לא תקינה');
  }
  
  return true;
};

export default async function handler(req, res) {
  // Apply middleware
  corsMiddleware(req, res, () => {
    authenticate(req, res, () => {
      rateLimit(5, 15 * 60 * 1000)(req, res, async () => {
        if (req.method !== 'POST') {
          return res.status(405).json({ 
            error: 'Method not allowed',
            code: 'METHOD_NOT_ALLOWED' 
          });
        }
        
        try {
          // Validate request body
          validateHandData(req.body);
          
          const handData = req.body;
          
          // Create prompt for OpenAI
          const prompt = createPokerPrompt(handData);
          
          console.log(`AI Analysis request from user: ${req.user?.id || 'anonymous'}`);
          
          // Call OpenAI API
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "אתה מאמן פוקר ישראלי מקצועי עם 15 שנות ניסיון. אתה מסביר מושגים מורכבים בצורה פשוטה וידידותית."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
          });
          
          const analysis = completion.choices[0].message.content;
          
          // Log for monitoring
          console.log(`AI Analysis completed successfully. Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);
          
          res.status(200).json({
            success: true,
            analysis,
            meta: {
              tokens_used: completion.usage?.total_tokens,
              model: "gpt-3.5-turbo",
              timestamp: new Date().toISOString()
            }
          });
          
        } catch (error) {
          console.error('AI Analysis Error:', error);
          
          // Handle different types of errors
          if (error.message.includes('נדרש')) {
            return res.status(400).json({
              error: error.message,
              code: 'VALIDATION_ERROR'
            });
          }
          
          if (error.code === 'insufficient_quota') {
            return res.status(503).json({
              error: 'שירות הAI זמנית לא זמין. נסה שוב מאוחר יותר',
              code: 'AI_SERVICE_UNAVAILABLE'
            });
          }
          
          res.status(500).json({
            error: 'שגיאה בניתוח AI. נסה שוב',
            code: 'INTERNAL_ERROR'
          });
        }
      });
    });
  });
}
