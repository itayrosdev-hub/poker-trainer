// נתוני פוקר נכונים לפי כללי פוקר אמיתיים
export const CARDS = {
  suits: ['♠', '♥', '♦', '♣'],
  ranks: ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
};

// פוזיציות נכונות בסדר הנכון (עם כיוון השעון מהכפתור)
export const POSITIONS = [
  { 
    key: 'BTN', 
    name: 'הכפתור', 
    shortName: 'BTN',
    fullName: 'Button (הכפתור)',
    description: 'המיקום החזק ביותר - פועל אחרון',
    color: '#96CEB4', 
    gradient: ['#96CEB4', '#85C1A1'], 
    isDealer: true,
    icon: '🎯'
  },
  { 
    key: 'SB', 
    name: 'הבליינד הקטן', 
    shortName: 'SB',
    fullName: 'Small Blind (בליינד קטן)',
    description: 'משלם חצי יחידה חובה',
    color: '#FFEAA7', 
    gradient: ['#FFEAA7', '#FDCB6E'], 
    isBlind: true, 
    blindAmount: 0.5,
    icon: '💰'
  },
  { 
    key: 'BB', 
    name: 'הבליינד הגדול', 
    shortName: 'BB',
    fullName: 'Big Blind (בליינד גדול)',
    description: 'משלם יחידה שלמה חובה',
    color: '#DDA0DD', 
    gradient: ['#DDA0DD', '#DA70D6'], 
    isBlind: true, 
    blindAmount: 1,
    icon: '💎'
  },
  { 
    key: 'UTG', 
    name: 'הראשון לפעול', 
    shortName: 'UTG',
    fullName: 'Under The Gun (תחת האקדח)',
    description: 'פועל ראשון - מיקום חלש',
    color: '#FF6B6B', 
    gradient: ['#FF6B6B', '#FF8E8E'], 
    isEarlyPosition: true,
    icon: '🔫'
  },
  { 
    key: 'MP', 
    name: 'האמצע', 
    shortName: 'MP',
    fullName: 'Middle Position (מיקום אמצע)',
    description: 'מיקום בינוני עם גמישות',
    color: '#4ECDC4', 
    gradient: ['#4ECDC4', '#44A08D'], 
    isMiddlePosition: true,
    icon: '⚖️'
  },
  { 
    key: 'CO', 
    name: 'החותך', 
    shortName: 'CO',
    fullName: 'Cut-Off (החותך)',
    description: 'מיקום חזק לפני הכפתור',
    color: '#45B7D1', 
    gradient: ['#45B7D1', '#4A90E2'], 
    isLatePosition: true,
    icon: '✂️'
  }
];

// סדר פעולות Pre-Flop (הבליינדים כבר שילמו)
export const PREFLOP_ACTION_ORDER = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];

// סדר פעולות Post-Flop (הבליינדים פועלים ראשון)
export const POSTFLOP_ACTION_ORDER = ['SB', 'BB', 'UTG', 'MP', 'CO', 'BTN'];

// תרחישי תרגול לפני הפלופ (נכונים)
export const PREFLOP_SCENARIOS = {
  premium: ['AA', 'KK', 'QQ', 'AK'], // ידיים מעולות - תמיד העלאה
  strong: ['JJ', 'TT', '99', 'AQ', 'AJ', 'KQ'], // ידיים חזקות
  medium: ['88', '77', '66', 'AT', 'KJ', 'QJ', 'A9'], // ידיים בינוניות
  weak: ['55', '44', '33', '22', 'K9', 'Q9', 'J9', 'T9'] // ידיים חלשות
};

// צבעי פעולות
export const ACTION_COLORS = {
  FOLD: '#e74c3c',
  CALL: '#f39c12', 
  RAISE: '#27ae60',
  CHECK: '#3498db'
};

// הגדרות משחק נכונות
export const GAME_CONFIG = {
  smallBlind: 0.5,
  bigBlind: 1,
  defaultStack: 100,
  // חישוב פוט התחלתי
  getInitialPot: () => 0.5 + 1, // SB + BB = 1.5
  
  // חישוב מינימום העלאה
  getMinRaise: (lastBet) => lastBet * 2,
  
  // בדיקה אם פוזיציה היא בליין
  isBlind: (position) => position === 'SB' || position === 'BB',
  
  // בדיקה אם פוזיציה מוקדמת
  isEarlyPosition: (position) => position === 'UTG',
  
  // בדיקה אם פוזיציה מאוחרת  
  isLatePosition: (position) => ['CO', 'BTN'].includes(position)
};

// גדלי צ'יפים וצבעים
export const CHIP_CONFIG = {
  colors: {
    0.5: '#FFFFFF',  // לבן - SB
    1: '#FFEAA7',    // צהוב - BB
    3: '#4ECDC4',    // תכלת - 3x
    5: '#FF6B6B',    // אדום - 5x
    10: '#8B4513'    // חום - 10x+
  },
  getColor: (amount) => {
    if (amount >= 10) return '#8B4513';
    if (amount >= 5) return '#FF6B6B';
    if (amount >= 3) return '#4ECDC4';
    if (amount == 1) return '#FFEAA7';
    if (amount == 0.5) return '#FFFFFF';
    return '#FFEAA7';
  }
};
