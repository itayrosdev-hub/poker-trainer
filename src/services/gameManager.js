// src/services/gameManager.js
import { questionCache } from './questionCache';
import { supabaseService } from './supabaseService';
import { generateRandomCards, generateRandomScenario } from '../utils/gameLogic';

class GameManager {
  constructor() {
    this.userId = null;
    this.currentScenario = null;
    this.startTime = null;
    this.initialized = false;
  }

  // 🎯 אתחול משתמש
  async initializeUser(userId) {
    try {
      console.log(`🎯 Initializing user: ${userId}`);
      this.userId = userId;
      
      // בדוק חיבור לSupabase
      const connectionTest = await supabaseService.testConnection();
      if (!connectionTest.success) {
        console.warn('⚠️ Supabase connection failed, running in offline mode');
      }
      
      // טען התקדמות קיימת או צור חדשה
      const progressResult = await supabaseService.getPlayerProgress(userId);
      
      let playerProgress;
      
      if (!progressResult.data) {
        // משתמש חדש - צור פרופיל
        console.log('👤 New user, creating profile...');
        const defaultProgress = {
          level: 'beginner',
          total_games: 0,
          correct_decisions: 0,
          current_focus: 'pre-flop basics',
          strengths: [],
          weaknesses: [],
          last_active: new Date().toISOString()
        };
        
        // נסה לשמור (אם יש חיבור)
        if (connectionTest.success) {
          await supabaseService.savePlayerProgress(userId, defaultProgress);
        }
        
        playerProgress = defaultProgress;
      } else {
        console.log('👤 Existing user loaded');
        playerProgress = progressResult.data;
      }
      
      this.initialized = true;
      console.log('✅ Game manager initialized successfully');
      
      return { success: true, playerProgress };
      
    } catch (error) {
      console.error('Failed to initialize user:', error);
      
      // Fallback - משתמש בלי חיבור
      const fallbackProgress = {
        level: 'beginner',
        total_games: 0,
        correct_decisions: 0,
        current_focus: 'pre-flop basics',
        strengths: [],
        weaknesses: [],
        last_active: new Date().toISOString()
      };
      
      this.initialized = true;
      return { success: true, playerProgress: fallbackProgress, offline: true };
    }
  }

  // 🎲 יצירת משחק חדש
  async generateNewGame(level, focusArea) {
    try {
      console.log(`🎲 Generating new game: ${level} - ${focusArea}`);
      this.startTime = Date.now();
      
      // נסה לקבל תרחיש מהcache/DB
      const scenarioResult = await questionCache.getSmartScenario(level, focusArea);
      
      if (scenarioResult.success) {
        this.currentScenario = {
          ...scenarioResult.data,
          source: scenarioResult.source
        };
        
        console.log(`📊 Scenario loaded from: ${scenarioResult.source}`);
        
        return {
          success: true,
          cards: this.currentScenario.cards,
          position: this.currentScenario.position,
          scenario: this.currentScenario.scenario,
          source: scenarioResult.source,
          hasId: !!this.currentScenario.id
        };
      }
      
      // Fallback לgeneration מקומי
      console.log('⚠️ Using fallback scenario generation');
      return this.generateFallbackScenario();
      
    } catch (error) {
      console.error('Failed to generate new game:', error);
      
      // Final fallback
      return this.generateFallbackScenario();
    }
  }

  // 🆘 יצירת תרחיש fallback
  generateFallbackScenario() {
    try {
      const cards = generateRandomCards();
      const scenario = generateRandomScenario();
      
      this.currentScenario = {
        cards,
        position: scenario.position,
        scenario,
        source: 'fallback',
        correct_action: this.determineFallbackAction(cards, scenario),
        explanation: 'התרחיש נוצר באופן מקומי ללא AI'
      };
      
      console.log('✅ Fallback scenario generated');
      
      return {
        success: true,
        cards,
        position: scenario.position,
        scenario,
        source: 'fallback',
        hasId: false
      };
      
    } catch (error) {
      console.error('Even fallback failed:', error);
      return {
        success: false,
        error: error.message,
        cards: [],
        position: null,
        scenario: null,
        source: 'error'
      };
    }
  }

  // 🎯 קביעת פעולה נכונה לfallback
  determineFallbackAction(cards, scenario) {
    try {
      // לוגיקה בסיסית לקביעת פעולה נכונה
      if (!cards || cards.length < 2) return 'FOLD';
      
      const card1 = cards[0];
      const card2 = cards[1];
      
      // זוג
      if (card1.rank === card2.rank) {
        const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        const rankIndex = ranks.indexOf(card1.rank);
        
        if (rankIndex <= 3) return 'RAISE'; // AA, KK, QQ, JJ
        if (rankIndex <= 6) return 'CALL';  // TT, 99, 88
        return 'FOLD'; // זוגות נמוכים
      }
      
      // A עם קלף גבוה
      if (card1.rank === 'A' || card2.rank === 'A') {
        const otherCard = card1.rank === 'A' ? card2 : card1;
        const highCards = ['K', 'Q', 'J', '10'];
        
        if (highCards.includes(otherCard.rank)) {
          return scenario.isRaised ? 'CALL' : 'RAISE';
        }
        
        return scenario.isRaised ? 'FOLD' : 'CALL';
      }
      
      // ברירת מחדל
      return scenario.isRaised ? 'FOLD' : 'CALL';
      
    } catch (error) {
      console.error('Failed to determine fallback action:', error);
      return 'FOLD';
    }
  }

  // ✅ ביצוע החלטה
  async makeDecision(decision) {
    if (!this.currentScenario || !this.userId) {
      console.error('No active game or user for decision');
      return { success: false, error: 'No active game or user' };
    }
    
    const timeTaken = this.startTime ? Date.now() - this.startTime : 0;
    const correct = decision === this.currentScenario.correct_action;
    
    console.log(`✅ Decision made: ${decision} (correct: ${this.currentScenario.correct_action}), took ${timeTaken}ms`);
    
    try {
      // שמור סשן משחק (אם יש ID ותרחיש מהDB)
      if (this.currentScenario.id && this.currentScenario.source !== 'fallback') {
        const saveResult = await supabaseService.saveGameSession(
          this.userId,
          this.currentScenario.id,
          decision,
          correct,
          timeTaken
        );
        
        if (saveResult.success) {
          console.log('📊 Game session saved to database');
          
          // עדכן סטטיסטיקות השאלה
          await supabaseService.updateScenarioStats(this.currentScenario.id, correct);
        }
      } else {
        console.log('📱 Offline mode - decision not saved to database');
      }
      
      return {
        success: true,
        correct,
        explanation: this.currentScenario.explanation || 'אין הסבר זמין',
        correctAction: this.currentScenario.correct_action,
        timeTaken,
        source: this.currentScenario.source,
        saved: !!this.currentScenario.id
      };
      
    } catch (error) {
      console.error('Failed to save decision:', error);
      
      // החזר תוצאה גם אם השמירה נכשלה
      return {
        success: true,
        correct,
        explanation: this.currentScenario.explanation || 'אין הסבר זמין',
        correctAction: this.currentScenario.correct_action,
        timeTaken,
        source: this.currentScenario.source,
        saved: false,
        saveError: error.message
      };
    }
  }

  // 📊 עדכון התקדמות
  async updateProgress(progressData) {
    if (!this.userId) {
      console.log('No user ID for progress update');
      return { success: false, error: 'No user ID' };
    }
    
    try {
      const result = await supabaseService.savePlayerProgress(this.userId, {
        ...progressData,
        last_active: new Date().toISOString()
      });
      
      if (result.success) {
        console.log('📊 Progress updated successfully');
      }
      
      return result;
    } catch (error) {
      console.error('Failed to update progress:', error);
      return { success: false, error: error.message };
    }
  }

  // 📈 שליפת סטטיסטיקות מפורטות
  async getDetailedStats(days = 30) {
    if (!this.userId) {
      return { success: false, error: 'No user ID' };
    }
    
    try {
      console.log(`📈 Getting detailed stats for ${days} days`);
      
      const [statsResult, progressResult] = await Promise.all([
        supabaseService.getPlayerStats(this.userId, days),
        supabaseService.getPlayerProgress(this.userId)
      ]);
      
      const sessions = statsResult.success ? (statsResult.data || []) : [];
      const progress = progressResult.success ? (progressResult.data || {}) : {};
      
      // חישוב סטטיסטיקות בסיסיות
      const totalGames = sessions.length;
      const correctDecisions = sessions.filter(s => s.correct).length;
      const accuracy = totalGames > 0 ? (correctDecisions / totalGames) * 100 : 0;
      const averageTime = totalGames > 0 ? 
        sessions.reduce((sum, s) => sum + (s.time_taken || 0), 0) / totalGames : 0;
      
      // מגמות יומיות
      const dailyStats = this.calculateDailyTrends(sessions, days);
      
      console.log(`📊 Stats calculated: ${totalGames} games, ${accuracy.toFixed(1)}% accuracy`);
      
      return {
        success: true,
        data: {
          overview: {
            totalGames,
            correctDecisions,
            accuracy: Math.round(accuracy),
            averageTime: Math.round(averageTime),
            currentLevel: progress.level || 'beginner',
            currentFocus: progress.current_focus || 'pre-flop basics'
          },
          trends: dailyStats,
          recentSessions: sessions.slice(0, 10),
          progress
        }
      };
      
    } catch (error) {
      console.error('Failed to get detailed stats:', error);
      return { success: false, error: error.message };
    }
  }

  // 📊 חישוב מגמות יומיות
  calculateDailyTrends(sessions, days) {
    const dailyData = {};
    const today = new Date();
    
    // אתחול ימים
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      dailyData[dateKey] = {
        date: dateKey,
        games: 0,
        correct: 0,
        accuracy: 0,
        avgTime: 0,
        totalTime: 0
      };
    }
    
    // מילוי נתונים
    sessions.forEach(session => {
      const sessionDate = session.created_at.split('T')[0];
      if (dailyData[sessionDate]) {
        dailyData[sessionDate].games++;
        if (session.correct) {
          dailyData[sessionDate].correct++;
        }
        dailyData[sessionDate].totalTime += (session.time_taken || 0);
      }
    });
    
    // חישוב accuracy ו-avgTime
    Object.values(dailyData).forEach(day => {
      if (day.games > 0) {
        day.accuracy = Math.round((day.correct / day.games) * 100);
        day.avgTime = Math.round(day.totalTime / day.games);
      }
    });
    
    return Object.values(dailyData)
      .sort((a, b) => a.date.localeCompare(b.date)) // מהישן לחדש
      .slice(-7); // רק 7 ימים אחרונים למגמה
  }

  // 🔍 דיאגנוסטיקה מפורטת
  async getDiagnostics() {
    try {
      const cacheStats = await questionCache.getCacheStats();
      const connectionTest = await supabaseService.testConnection();
      
      return {
        gameManager: {
          initialized: this.initialized,
          userId: this.userId,
          hasCurrentScenario: !!this.currentScenario,
          currentScenarioSource: this.currentScenario?.source || null,
          currentScenarioHasId: !!this.currentScenario?.id
        },
        database: {
          connected: connectionTest.success,
          error: connectionTest.error || null
        },
        cache: cacheStats,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get diagnostics:', error);
      return {
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // 🧹 איפוס מערכת (לבדיקות)
  async resetSystem() {
    try {
      console.log('🧹 Resetting game manager system...');
      
      // נקה cache
      await questionCache.clearCache();
      
      // איפוס משתנים
      this.currentScenario = null;
      this.startTime = null;
      
      console.log('✅ System reset completed');
      return { success: true };
    } catch (error) {
      console.error('Failed to reset system:', error);
      return { success: false, error: error.message };
    }
  }
}

export const gameManager = new GameManager();
