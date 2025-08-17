import { mockAIService } from './aiMockService';
import { GoogleGenerativeAI } from '@google/generative-ai';

// AI Service עם Gemini אמיתי! 🤖
class AIService {
  constructor() {
    this.useMock = false; // 🔥 עכשיו נשתמש ב-AI אמיתי!
    this.isInitialized = false;
    this.geminiModel = null;
    this.apiKey = 'AIzaSyBhDvhkffBrPE_JtjBocqBXLxZHRnwxFIE';
  }

  async initialize() {
    this.isInitialized = true;
    
    if (!this.useMock && this.apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(this.apiKey);
        this.geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log('🤖✨ Gemini AI activated successfully!');
      } catch (error) {
        console.error('❌ Gemini setup failed:', error);
        this.useMock = true;
        console.log('🔄 Fallback to Mock mode');
      }
    }
    
    console.log(`AI Service initialized - Mode: ${this.useMock ? 'Mock' : '🤖 Gemini AI'}`);
  }

  async analyzeHand(handData) {
    if (!this.isInitialized) await this.initialize();
    
    if (this.useMock) {
      return await mockAIService.analyzeHand(handData);
    }

    // 🤖 Gemini AI Analysis!
    try {
      const prompt = this.createPokerAnalysisPrompt(handData);
      console.log('🤖 Sending to Gemini AI...');
      
      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      console.log('✅ Gemini AI analysis received!');
      return {
        success: true,
        data: {
          analysis: analysis,
          meta: {
            model: "gemini-1.5-flash",
            timestamp: new Date().toISOString(),
            source: "🤖 Google Gemini AI"
          }
        }
      };
    } catch (error) {
      console.error('❌ Gemini analysis error:', error);
      return {
        success: false,
        error: 'שגיאה בניתוח AI. נסה שוב או בדוק את החיבור.'
      };
    }
  }

  async askCoach(question, context) {
    if (!this.isInitialized) await this.initialize();
    
    if (this.useMock) {
      return await mockAIService.askCoach(question, context);
    }

    // 🤖 Gemini Coach!
    try {
      const prompt = this.createCoachPrompt(question, context);
      console.log('🤖 Asking Gemini AI Coach...');
      
      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      const coachResponse = response.text();

      console.log('✅ Gemini AI coach response received!');
      return {
        success: true,
        data: {
          response: coachResponse,
          coach: "מאמן AI (🤖 Gemini)",
          meta: {
            model: "gemini-1.5-flash",
            timestamp: new Date().toISOString()
          }
        }
      };
    } catch (error) {
      console.error('❌ Gemini coach error:', error);
      return {
        success: false,
        error: 'המאמן AI לא זמין כרגע. נסה שוב מאוחר יותר.'
      };
    }
  }

  // 🎯 יצירת prompt מקצועי לניתוח פוקר
  createPokerAnalysisPrompt(handData) {
    const { cards, scenario, position, decision } = handData;
    
    return `אתה מאמן פוקר מקצועי ומנוסה. נתח את המצב הזה בצורה מדויקת ומקצועית:

🃏 הקלפים שלי: ${cards?.map(c => `${c.suit}${c.rank}`).join(', ') || 'לא צוין'}
🎯 הפוזיציה שלי: ${position || 'לא צוין'}
💰 גודל הפוט: $${scenario?.pot || 0}
📈 יש העלאה: ${scenario?.isRaised ? `כן ($${scenario.toCall})` : 'לא'}
👥 מספר שחקנים ביד: ${scenario?.playersInHand || 'לא צוין'}
🎲 ההחלטה שלי: ${decision}

אנא תן ניתוח מקצועי וקצר בעברית הכולל:
1. האם ההחלטה נכונה? (כן/לא ולמה)
2. מה הייתי צריך לקחת בחשבון?
3. טיפ מעשי לעתיד

תענה בעברית, באופן ישיר וברור (עד 150 מילים). התמקד בהסבר פשוט וברור.`;
  }

  // 💬 יצירת prompt למאמן
  createCoachPrompt(question, context) {
    return `אתה מאמן פוקר מקצועי ומנוסה בעל שנות ניסיון. השחקן שואל אותך:

"${question}"

הקשר נוסף:
- רמת השחקן: ${context?.level || 'מתחיל'}
- מצב המשחק: ${context?.gameState || 'לא צוין'}

תענה בעברית באופן ברור, מקצועי ועוזר. תן טיפים מעשיים וקלים להבנה.
התמקד בעזרה מיידית ופשוטה שהשחקן יכול ליישם מיד.
תענה עד 200 מילים, בצורה ידידותית ומעודדת.`;
  }

  async healthCheck() {
    if (this.useMock) return await mockAIService.healthCheck();
    
    try {
      if (!this.geminiModel) await this.initialize();
      const testResult = await this.geminiModel.generateContent("שלום");
      return testResult !== null;
    } catch {
      return false;
    }
  }

  clearCache() {
    if (this.useMock) mockAIService.clearCache();
    console.log('🧹 AI Cache cleared');
  }

  getCacheStats() {
    if (this.useMock) return mockAIService.getCacheStats();
    return { 
      mode: '🤖 Gemini AI',
      apiKeySet: !!this.apiKey,
      modelLoaded: !!this.geminiModel,
      status: 'Active'
    };
  }

  // מעבר בין Mock לAPI אמיתי
  setMode(useMock) {
    this.useMock = useMock;
    console.log(`🔄 AI Service mode: ${useMock ? 'Mock' : '🤖 Gemini AI'}`);
  }

  // פונקציה לשינוי API Key במידת הצורך
  setApiKey(newApiKey) {
    this.apiKey = newApiKey;
    this.isInitialized = false;
    console.log('🔑 API Key updated - reinitializing...');
  }

  // 🎯 יצירת תרחישים מתקדמים עם AI
  async generateAdvancedScenario(playerLevel = 'beginner', focusArea = null) {
    if (this.useMock) {
      return this.generateMockScenario();
    }

    try {
      const prompt = `אתה יוצר תרחישי פוקר מקצועיים ומתאמנים לתרגול.

🎮 **ADVANCED SCENARIO GENERATOR:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Player Level: ${playerLevel}
🎯 Focus Area: ${focusArea || 'general pre-flop decisions'}

צור תרחיש פוקר ריאליסטי ומאתגר הכולל:

1. **Strategic Position**: פוזיציה עם השלכות טקטיות
2. **Realistic Action**: פעולות שחקנים לפני השחקן
3. **Pot Dynamics**: גודל פוט ו-pot odds מדויקים
4. **Player Profiles**: תיאור סוגי שחקנים בשולחן
5. **Game Context**: tournament/cash עם stack sizes
6. **Learning Objective**: מה השחקן אמור ללמוד

תענה בפורמט JSON פשוט:
{
  "position": "BTN",
  "stackBB": 50,
  "potBB": 4.5,
  "toCallBB": 2,
  "playersInHand": 5,
  "actionBefore": "UTG raised 3BB, MP called",
  "playerTypes": "Tight table, UTG is TAG",
  "gameType": "tournament",
  "blindLevel": "25/50",
  "difficulty": 7,
  "focusPoint": "3-bet spot with medium pairs"
}`;

      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      const scenarioText = response.text();
      
      try {
        const jsonMatch = scenarioText.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          const scenario = JSON.parse(jsonMatch[0]);
          return this.convertToAppFormat(scenario);
        }
      } catch (e) {
        console.log('Failed to parse AI scenario, using enhanced fallback');
      }
      
      return this.generateEnhancedMockScenario(playerLevel);
    } catch (error) {
      console.error('Advanced scenario generation failed:', error);
      return this.generateEnhancedMockScenario(playerLevel);
    }
  }

  // 🧠 יצירת שאלות דינמיות חכמות
  async generateDynamicQuestion(cards, scenario, playerHistory) {
    try {
      const prompt = `אתה יוצר שאלות פוקר מתקדמות ומותאמות אישית.

🎯 **DYNAMIC QUESTION GENERATOR:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🃏 Current Hand: ${cards?.map(c => `${c.suit}${c.rank}`).join(' ')}
🎲 Position: ${scenario?.position}, Pot: $${scenario?.pot}
📊 Recent Performance: ${JSON.stringify(playerHistory?.slice(-5) || [])}

יצור שאלה מתקדמת שבודקת הבנה עמוקה:

השאלה תכלול:
1. **Main Decision**: מה לעשות ולמה
2. **Mathematical Element**: pot odds/implied odds
3. **Strategic Element**: range considerations
4. **Psychological Element**: opponent reads
5. **Alternative Lines**: אופציות אחרות

תענה בעברית עם שאלה מורכבת ומעניינת.`;

      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Dynamic question generation failed:', error);
      return "בהתחשב במיקום שלך ובפעולות לפניך, איך תנהג ומה השיקולים המתמטיים והאסטרטגיים?";
    }
  }

  // 📈 מערכת התקדמות וניתוח חכמה
  async analyzePlayerProgress(gameHistory, currentLevel) {
    try {
      const prompt = `אתה מנתח התקדמות שחקן פוקר ובונה תוכנית שיפור מותאמת.

📊 **PLAYER PROGRESS ANALYST:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 Current Level: ${currentLevel}
📈 Recent Games: ${JSON.stringify(gameHistory?.slice(-8) || [])}

נתח ובנה תוכנית:

**ANALYSIS:**
1. **Pattern Recognition**: איזה דפוסים אתה רואה
2. **Strength Areas**: מה השחקן עושה טוב
3. **Improvement Areas**: איפה יש פוטנציאל לשיפור
4. **Technical Gaps**: חוסרים במושגים טכניים

**RECOMMENDATIONS:**
1. **Next Focus Areas**: על מה להתמקד
2. **Difficulty Adjustment**: האם לשנות רמה
3. **Study Suggestions**: מה ללמוד בתיאוריה
4. **Practice Drills**: תרגילים ספציפיים

תענה בעברית עם תוכנית פעולה קונקרטית.`;

      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Progress analysis failed:', error);
      return "המשך לתרגל ולהתמקד בהחלטות pre-flop. שים לב לפוזיציה וכוח היד.";
    }
  }

  // 🎓 יצירת תוכן חינוכי מקצועי
  async generateAdvancedContent(topic, playerLevel) {
    try {
      const prompt = `אתה מלמד פוקר ברמה מקצועית - יוצר תוכן חינוכי מתקדם.

🎓 **PROFESSIONAL POKER EDUCATION:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Topic: ${topic}
📊 Student Level: ${playerLevel}

צור תוכן מקצועי הכולל:

**THEORY SECTION:**
- הרקע התיאורטי המתקדם
- קשרים למושגים אחרים

**MATHEMATICS:**
- נוסחאות ועקרונות מתמטיים
- דוגמאות חישוב מעשיות

**STRATEGIC APPLICATION:**
- איך ליישם בפועל
- מתי להשתמש ומתי לא

**COMMON MISTAKES:**
- טעויות נפוצות וכיצד להימנע
- סימני אזהרה

**PRO INSIGHTS:**
- טיפים מרמה מקצועית
- נסיון מהשטח

נושאים זמינים: GTO vs Exploitative, ICM Theory, Range Construction, Bet Sizing Theory, Bluff Strategy, Tournament Dynamics.

תענה בעברית ברמה אקדמית גבוהה עם דוגמאות מפורטות.`;

      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Advanced content generation failed:', error);
      return null;
    }
  }

  // 🔍 ניתוח חולשות מתקדם
  async analyzePlayerWeaknesses(recentDecisions, outcomes) {
    try {
      const prompt = `אתה מנתח דפוסי משחק ומזהה חולשות לשיפור מדויק.

🔍 **ADVANCED WEAKNESS DETECTOR:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Recent Decisions: ${JSON.stringify(recentDecisions?.slice(-12) || [])}
📈 Success Rate: ${JSON.stringify(outcomes?.slice(-12) || [])}

בצע ניתוח מעמיק:

**PATTERN ANALYSIS:**
1. **Position Tendencies**: התנהגות לפי מיקום
2. **Hand Strength Errors**: טעויות בהערכת כוח יד
3. **Aggression Patterns**: רמת אגרסיביות
4. **Calling Patterns**: מתי קורא יותר מדי/פחות מדי

**TECHNICAL GAPS:**
1. **Math Errors**: בעיות בחישובים
2. **Range Reading**: קושי בקריאת ranges
3. **Bet Sizing**: גדלי הימורים לא מיטביים
4. **Exploitability**: נקודות חולשה שיריבים יכולים לנצל

**IMPROVEMENT PLAN:**
תוכנית שיפור מדורגת עם צעדים קונקרטיים.

תענה בעברית עם ניתוח מפורט ותוכנית פעולה.`;

      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Weakness analysis failed:', error);
      return null;
    }
  }

  // 🔧 Mock scenarios for fallback
  generateMockScenario() {
    return {
      position: 'BTN',
      stackSize: 100,
      potSize: 1.5,
      toCall: 1,
      playersInHand: 6,
      actionBefore: 'Folded to you',
      playerTypes: 'Standard 6-max table',
      gameType: 'cash',
      difficulty: 3,
      focusPoint: 'Basic position play'
    };
  }

  generateEnhancedMockScenario(playerLevel) {
    const scenarios = {
      'beginner': {
        position: 'BTN',
        stackSize: 100,
        potSize: 1.5,
        toCall: 0,
        playersInHand: 6,
        actionBefore: 'Folded to you',
        difficulty: 2,
        focusPoint: 'Position and basic hand selection'
      },
      'intermediate': {
        position: 'CO',
        stackSize: 75,
        potSize: 4.5,
        toCall: 2,
        playersInHand: 4,
        actionBefore: 'UTG raised 3BB',
        difficulty: 5,
        focusPoint: 'Cold calling vs 3-betting decisions'
      },
      'advanced': {
        position: 'SB',
        stackSize: 40,
        potSize: 8,
        toCall: 5,
        playersInHand: 3,
        actionBefore: 'BTN raised, BB 3-bet',
        difficulty: 8,
        focusPoint: 'Short stack ICM considerations'
      }
    };
    
    return scenarios[playerLevel] || scenarios['beginner'];
  }

  convertToAppFormat(aiScenario) {
    return {
      position: aiScenario.position,
      pot: (aiScenario.potBB || 4) * 0.5, // Convert BB to dollars
      toCall: (aiScenario.toCallBB || 2) * 0.5,
      playersInHand: aiScenario.playersInHand || 6,
      isRaised: aiScenario.toCallBB > 1,
      numCallers: Math.max(0, aiScenario.playersInHand - 3),
      stackSize: (aiScenario.stackBB || 100) * 0.5,
      difficulty: aiScenario.difficulty || 5,
      focusPoint: aiScenario.focusPoint,
      actionBefore: aiScenario.actionBefore,
      gameType: aiScenario.gameType || 'cash'
    };
  }
}

export const aiService = new AIService();
