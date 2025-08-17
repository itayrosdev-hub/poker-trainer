# 🤖 Poker Academy Backend

צד שרת לאפליקציית פוקר אקדמיה עם יכולות AI coaching מתקדמות.

## 🏗️ ארכיטקטורה

- **Platform**: Vercel Serverless Functions
- **AI Provider**: OpenAI GPT-3.5-turbo  
- **Authentication**: JWT tokens
- **Rate Limiting**: In-memory (Redis בפרודקשן)

## 📁 מבנה הפרויקט

```
backend/
├── api/
│   ├── analyze-hand.js     # ניתוח ידיים עם AI
│   └── ai-coach.js         # צ'אט עם מאמן AI
├── middleware/
│   └── auth.js             # Authentication & Rate limiting
├── utils/
│   └── helpers.js          # פונקציות עזר
├── package.json
├── vercel.json
└── .env.example
```

## 🚀 התקנה מהירה

### 1. התקנת Dependencies

```bash
cd backend
npm install
```

### 2. הגדרת Environment Variables

```bash
cp .env.example .env
```

ערוך את הקובץ `.env` והוסף:
- `OPENAI_API_KEY` - ה-API key שלך מ-OpenAI
- `JWT_SECRET` - מחרוזת סודית ליצירת tokens

### 3. פיתוח מקומי

```bash
npm run dev
```

השרת יעלה על `http://localhost:3000`

### 4. הפעלה בפרודקשן

```bash
# התקנת Vercel CLI
npm i -g vercel

# Deploy
npm run deploy
```

## 🔌 API Endpoints

### POST `/api/analyze-hand`

ניתוח יד עם AI coach.

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "cards": [
    {"rank": "A", "suit": "♠"},
    {"rank": "K", "suit": "♥"}
  ],
  "position": "UTG",
  "scenario": {
    "isRaised": false,
    "pot": 1.5,
    "toCall": 1,
    "numCallers": 0
  },
  "decision": "RAISE"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": "החלטה מעולה! עם AK מUTG...",
  "meta": {
    "tokens_used": 156,
    "model": "gpt-3.5-turbo",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST `/api/ai-coach`

צ'אט חופשי עם מאמן AI.

**Body:**
```json
{
  "question": "מתי כדאי לעשות 3-bet?",
  "context": {
    "lastHand": {
      "cards": [{"rank": "A", "suit": "♠"}, {"rank": "Q", "suit": "♥"}],
      "position": "BTN"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "שאלה מעולה! 3-bet זה כלי חזק...",
  "coach": "דני",
  "meta": {
    "tokens_used": 89,
    "model": "gpt-3.5-turbo",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔐 Authentication

הצד שרת משתמש ב-JWT tokens פשוטים. בפרודקשן מומלץ להשתמש ב-Firebase Auth או Auth0.

**יצירת token לבדיקות:**
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { id: 'user123', email: 'test@example.com' }, 
  'your-jwt-secret'
);
console.log('Bearer', token);
```

## 📊 Rate Limiting

- **Hand Analysis**: 5 בקשות לכל 15 דקות
- **AI Coach**: 8 בקשות לכל 15 דקות

## 💰 ניהול עלויות

- כל בקשה עולה בערך $0.001-0.003
- יש caching אוטומטי לבקשות זהות
- מעקב אחר שימוש ב-logs

## 🐛 Debugging

```bash
# צפייה ב-logs של Vercel
vercel logs

# פיתוח מקומי עם logs
npm run dev
```

## 🚨 שגיאות נפוצות

### `OPENAI_API_KEY not found`
ודא שה-API key מוגדר נכון ב-environment variables.

### `Rate limit exceeded`  
המתן 15 דקות או השתמש ב-user אחר.

### `Authentication failed`
בדוק שה-JWT token תקין ולא פג תוקף.

## 📈 Next Steps

- [ ] הוספת Redis לcaching
- [ ] Firebase Authentication
- [ ] Analytics ו-monitoring
- [ ] A/B testing לפרומפטים
- [ ] Database לשמירת היסטוריה
