import { CARDS, POSITIONS, PREFLOP_SCENARIOS, GAME_CONFIG, PREFLOP_ACTION_ORDER } from '../data/pokerData';
import { aiService } from '../services/aiService';

export const generateRandomCards = () => {
  const cards = [];
  const usedCards = new Set();
  
  while (cards.length < 2) {
    const suit = CARDS.suits[Math.floor(Math.random() * CARDS.suits.length)];
    const rank = CARDS.ranks[Math.floor(Math.random() * CARDS.ranks.length)];
    const card = rank + suit;
    
    if (!usedCards.has(card)) {
      usedCards.add(card);
      cards.push({ rank, suit });
    }
  }
  
  return cards;
};

export const generateRandomScenario = () => {
  // בחירת פוזיציה אקראית
  const playerPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  
  // יצירת מצב משחק ריאליסטי
  const scenario = {
    pot: GAME_CONFIG.getInitialPot(), // התחלה עם בליינדים
    raisedPot: 0,
    toCall: GAME_CONFIG.bigBlind,
    position: playerPosition.key,
    playerStack: GAME_CONFIG.defaultStack,
    isRaised: Math.random() > 0.6, // 40% מהמקרים יש העלאה
    numCallers: Math.floor(Math.random() * 3), // 0-2 קוראים
    actionBeforeUs: ['FOLD', 'CALL', 'RAISE'][Math.floor(Math.random() * 3)],
    playersInHand: 6 - Math.floor(Math.random() * 3) // 4-6 שחקנים
  };
  
  // התאמת הפוט לפי המצב
  if (scenario.isRaised) {
    scenario.raisedPot = scenario.toCall * 2;
    scenario.pot += scenario.raisedPot;
    scenario.toCall = scenario.raisedPot;
  }
  
  // הוספת קוראים לפוט
  scenario.pot += scenario.numCallers * scenario.toCall;
  
  return scenario;
};

// 🤖 יצירת תרחיש מתקדם עם AI
export const generateAIScenario = async (playerLevel = 'beginner', focusArea = null) => {
  try {
    const aiScenario = await aiService.generateAdvancedScenario(playerLevel, focusArea);
    return aiScenario;
  } catch (error) {
    console.error('AI scenario generation failed, falling back to random:', error);
    return generateRandomScenario();
  }
};

// 🎯 בחירה חכמה של קלפים בהתאם לרמה
export const generateSmartCards = (playerLevel = 'beginner', focusArea = null) => {
  const cards = [];
  const usedCards = new Set();
  
  // רמות קושי שונות מקבלות סוגי ידיים שונים
  let handTypes;
  
  switch (playerLevel) {
    case 'beginner':
      // ידיים ברורות - חזקות או חלשות
      handTypes = {
        premium: 0.3,   // 30% ידיים מעולות
        strong: 0.2,    // 20% ידיים חזקות  
        medium: 0.2,    // 20% בינוניות
        weak: 0.3       // 30% חלשות
      };
      break;
      
    case 'intermediate':
      // יותר ידיים בינוניות - החלטות מורכבות יותר
      handTypes = {
        premium: 0.15,
        strong: 0.25,
        medium: 0.4,    // 40% בינוניות
        weak: 0.2
      };
      break;
      
    case 'advanced':
      // ידיים שוליות וקשות
      handTypes = {
        premium: 0.1,
        strong: 0.2,
        medium: 0.3,
        weak: 0.4       // 40% ידיים מאתגרות
      };
      break;
      
    default:
      return generateRandomCards(); // fallback לרנדום
  }
  
  const rand = Math.random();
  let targetType;
  
  if (rand < handTypes.premium) targetType = 'premium';
  else if (rand < handTypes.premium + handTypes.strong) targetType = 'strong';
  else if (rand < handTypes.premium + handTypes.strong + handTypes.medium) targetType = 'medium';
  else targetType = 'weak';
  
  // יצירת ידיים לפי הקטגוריה הנבחרת
  return generateHandByType(targetType);
};

// פונקציה עזר ליצירת יד לפי סוג
const generateHandByType = (handType) => {
  const premiumHands = [
    [{rank: 'A', suit: '♠'}, {rank: 'A', suit: '♥'}], // AA
    [{rank: 'K', suit: '♠'}, {rank: 'K', suit: '♥'}], // KK
    [{rank: 'Q', suit: '♠'}, {rank: 'Q', suit: '♥'}], // QQ
    [{rank: 'A', suit: '♠'}, {rank: 'K', suit: '♠'}], // AKs
    [{rank: 'A', suit: '♠'}, {rank: 'K', suit: '♥'}], // AKo
  ];
  
  const strongHands = [
    [{rank: 'J', suit: '♠'}, {rank: 'J', suit: '♥'}], // JJ
    [{rank: '10', suit: '♠'}, {rank: '10', suit: '♥'}], // TT
    [{rank: 'A', suit: '♠'}, {rank: 'Q', suit: '♠'}], // AQs
    [{rank: 'A', suit: '♠'}, {rank: 'J', suit: '♠'}], // AJs
    [{rank: 'K', suit: '♠'}, {rank: 'Q', suit: '♠'}], // KQs
  ];
  
  const mediumHands = [
    [{rank: '9', suit: '♠'}, {rank: '9', suit: '♥'}], // 99
    [{rank: '8', suit: '♠'}, {rank: '8', suit: '♥'}], // 88
    [{rank: 'A', suit: '♠'}, {rank: '10', suit: '♠'}], // ATs
    [{rank: 'A', suit: '♠'}, {rank: 'Q', suit: '♥'}], // AQo
    [{rank: 'K', suit: '♠'}, {rank: 'J', suit: '♠'}], // KJs
  ];
  
  const weakHands = [
    [{rank: '7', suit: '♠'}, {rank: '2', suit: '♥'}], // 72o
    [{rank: '8', suit: '♠'}, {rank: '3', suit: '♥'}], // 83o
    [{rank: '9', suit: '♠'}, {rank: '4', suit: '♥'}], // 94o
    [{rank: 'J', suit: '♠'}, {rank: '6', suit: '♥'}], // J6o
    [{rank: 'Q', suit: '♠'}, {rank: '7', suit: '♥'}], // Q7o
  ];
  
  let handsArray;
  switch (handType) {
    case 'premium': handsArray = premiumHands; break;
    case 'strong': handsArray = strongHands; break;
    case 'medium': handsArray = mediumHands; break;
    case 'weak': handsArray = weakHands; break;
    default: return generateRandomCards();
  }
  
  const randomHand = handsArray[Math.floor(Math.random() * handsArray.length)];
  return [...randomHand]; // העתק של המערך
};

export const getHandStrength = (cards) => {
  if (!cards || cards.length !== 2) return 'weak';
  
  const [card1, card2] = cards;
  const hand = card1.rank + card2.rank;
  const suitedHand = card1.rank + card2.rank + (card1.suit === card2.suit ? 's' : 'o');
  
  // בדיקה לפי הקטגוריות החדשות
  if (PREFLOP_SCENARIOS.premium.includes(hand) || 
      PREFLOP_SCENARIOS.premium.includes(suitedHand)) {
    return 'premium';
  }
  
  if (PREFLOP_SCENARIOS.strong.includes(hand) || 
      PREFLOP_SCENARIOS.strong.includes(suitedHand)) {
    return 'strong';
  }
  
  if (PREFLOP_SCENARIOS.medium.includes(hand) || 
      PREFLOP_SCENARIOS.medium.includes(suitedHand)) {
    return 'medium';
  }
  
  return 'weak';
};

export const isDecisionCorrect = (cards, scenario, decision) => {
  const handStrength = getHandStrength(cards);
  const position = scenario.position;
  const isEarlyPosition = GAME_CONFIG.isEarlyPosition(position);
  const isLatePosition = GAME_CONFIG.isLatePosition(position);
  const isBlind = GAME_CONFIG.isBlind(position);
  
  // לוגיקה מתקדמת יותר לפי פוזיציה וכוח היד
  switch (handStrength) {
    case 'premium':
      // ידיים מעולות - תמיד העלאה
      return decision === 'RAISE';
      
    case 'strong':
      // ידיים חזקות - תלוי במצב
      if (scenario.isRaised && isEarlyPosition) return decision === 'CALL';
      return decision === 'RAISE' || decision === 'CALL';
      
    case 'medium':
      // ידיים בינוניות - תלוי בפוזיציה
      if (isEarlyPosition) return decision === 'FOLD';
      if (isLatePosition && !scenario.isRaised) return decision === 'CALL' || decision === 'RAISE';
      if (scenario.isRaised) return decision === 'FOLD';
      return decision === 'CALL';
      
    case 'weak':
      // ידיים חלשות
      if (isBlind && !scenario.isRaised) return decision === 'CHECK' || decision === 'CALL';
      if (isLatePosition && !scenario.isRaised && scenario.numCallers === 0) {
        return decision === 'FOLD' || decision === 'CALL';
      }
      return decision === 'FOLD';
      
    default:
      return decision === 'FOLD';
  }
};

export const getExplanation = (cards, scenario, decision, isCorrect) => {
  const handStrength = getHandStrength(cards);
  const position = scenario.position;
  const positionName = POSITIONS.find(p => p.key === position)?.name || position;
  
  const handStrengthHeb = {
    'premium': 'מעולה',
    'strong': 'חזקה', 
    'medium': 'בינונית',
    'weak': 'חלשה'
  };

  let explanation = `יד ${handStrengthHeb[handStrength]} מ${positionName}. `;
  
  if (isCorrect) {
    explanation += "החלטה נכונה! ";
    
    switch (handStrength) {
      case 'premium':
        explanation += "עם יד מעולה כמו זו, כמעט תמיד עדיף להעלות ולבנות פוט.";
        break;
      case 'strong':
        explanation += "יד חזקה שמצדיקה משחק התקפי ברוב המצבים.";
        break;
      case 'medium':
        explanation += "יד בינונית שדורשת שיקול דעת לפי המיקום והפעולות שקרו לפנינו.";
        break;
      case 'weak':
        explanation += "יד חלשה שבדרך כלל לא כדאי לשחק אותה.";
        break;
    }
  } else {
    explanation += "החלטה לא מיטבית. ";
    
    if (handStrength === 'premium' && decision !== 'RAISE') {
      explanation += "עם יד מעולה כזו, העלאה היא הפעולה הטובה ביותר.";
    } else if (handStrength === 'weak' && decision !== 'FOLD') {
      explanation += "יד חלשה כזו לא שווה השקעה במצב הזה.";
    } else {
      explanation += `במצב זה, פעולה טובה יותר הייתה ${getRecommendedAction(cards, scenario)}.`;
    }
  }
  
  return explanation;
};

const getRecommendedAction = (cards, scenario) => {
  const handStrength = getHandStrength(cards);
  const position = scenario.position;
  const isEarlyPosition = GAME_CONFIG.isEarlyPosition(position);
  const isLatePosition = GAME_CONFIG.isLatePosition(position);
  
  switch (handStrength) {
    case 'premium':
      return 'RAISE';
    case 'strong':
      return scenario.isRaised && isEarlyPosition ? 'CALL' : 'RAISE';
    case 'medium':
      if (isEarlyPosition) return 'FOLD';
      return scenario.isRaised ? 'FOLD' : 'CALL';
    case 'weak':
    default:
      return 'FOLD';
  }
};

export const evaluateDecision = (cards, scenario, decision) => {
  const isCorrect = isDecisionCorrect(cards, scenario, decision);
  const explanation = getExplanation(cards, scenario, decision, isCorrect);
  
  return {
    isCorrect,
    explanation,
    handStrength: getHandStrength(cards),
    recommendedAction: getRecommendedAction(cards, scenario)
  };
};
