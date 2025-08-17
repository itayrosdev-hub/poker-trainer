const jwt = require('jsonwebtoken');

// Simple authentication middleware
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'חסר טוקן authentication',
        code: 'MISSING_TOKEN' 
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ 
        error: 'פורמט טוקן לא תקין',
        code: 'INVALID_TOKEN_FORMAT' 
      });
    }

    // For now, we'll use a simple JWT verification
    // In production, you might want to use Firebase Auth
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ 
      error: 'טוקן לא תקין',
      code: 'INVALID_TOKEN' 
    });
  }
};

// Simple rate limiting store (in production use Redis)
const requestCounts = new Map();

export const rateLimit = (maxRequests = 10, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, data] of requestCounts.entries()) {
      if (data.timestamp < windowStart) {
        requestCounts.delete(key);
      }
    }
    
    const userRequests = requestCounts.get(userId) || { count: 0, timestamp: now };
    
    if (userRequests.timestamp < windowStart) {
      // Reset count for new window
      userRequests.count = 1;
      userRequests.timestamp = now;
    } else {
      userRequests.count++;
    }
    
    requestCounts.set(userId, userRequests);
    
    if (userRequests.count > maxRequests) {
      return res.status(429).json({
        error: 'יותר מדי בקשות. נסה שוב בעוד 15 דקות',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil((windowMs - (now - userRequests.timestamp)) / 1000)
      });
    }
    
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - userRequests.count);
    res.setHeader('X-RateLimit-Reset', new Date(userRequests.timestamp + windowMs));
    
    next();
  };
};

// CORS middleware
export const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
};
