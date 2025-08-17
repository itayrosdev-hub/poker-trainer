// Helper functions for the backend

export const generateUserToken = (userId, email) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { 
      id: userId, 
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    process.env.JWT_SECRET || 'fallback-secret'
  );
};

export const logApiUsage = (userId, endpoint, tokensUsed = 0) => {
  const timestamp = new Date().toISOString();
  console.log(`[API_USAGE] ${timestamp} - User: ${userId} - Endpoint: ${endpoint} - Tokens: ${tokensUsed}`);
  
  // In production, save to database:
  // await saveToDatabase({ userId, endpoint, tokensUsed, timestamp });
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Basic sanitization
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export const validatePokerCards = (cards) => {
  const validSuits = ['♠', '♥', '♦', '♣'];
  const validRanks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  if (!Array.isArray(cards) || cards.length !== 2) {
    throw new Error('חייבים להיות בדיוק 2 קלפים');
  }
  
  for (const card of cards) {
    if (!card.suit || !card.rank) {
      throw new Error('כל קלף חייב לכלול suit ו-rank');
    }
    
    if (!validSuits.includes(card.suit)) {
      throw new Error(`Suit לא תקין: ${card.suit}`);
    }
    
    if (!validRanks.includes(card.rank)) {
      throw new Error(`Rank לא תקין: ${card.rank}`);
    }
  }
  
  // Check for duplicate cards
  const cardStrings = cards.map(c => c.rank + c.suit);
  if (cardStrings[0] === cardStrings[1]) {
    throw new Error('לא יכול להיות אותו קלף פעמיים');
  }
  
  return true;
};

export const estimateTokens = (text) => {
  // Rough estimation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
};

export const createErrorResponse = (message, code = 'UNKNOWN_ERROR', statusCode = 500) => {
  return {
    success: false,
    error: message,
    code,
    timestamp: new Date().toISOString()
  };
};
