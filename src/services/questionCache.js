// src/services/questionCache.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabaseService } from './supabaseService';
import { aiService } from './aiService';

class QuestionCacheManager {
  constructor() {
    this.cachePrefix = 'poker_scenarios_';
    this.minCacheSize = 10; // מינימום שאלות בcache
    this.maxCacheSize = 30; // מקסימום שאלות בcache
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 שעות
  }

  // 🔑 יצירת מפתח cache
  getCacheKey(level, focusArea) {
    return `${this.cachePrefix}${level}_${focusArea.replace(/\s+/g, '_')}`;
  }

  // 📱 שליפת שאלות מ-cache מקומי
  async getCachedScenarios(level, focusArea) {
    try {
      const cacheKey = this.getCacheKey(level, focusArea);
      const cachedData = await AsyncStorage.getItem(cacheKey);
      
      if (!cachedData) {
        console.log(`📱 No cache found for ${level} - ${focusArea}`);
        return { scenarios: [], needsRefresh: true };
      }
      
      const parsed = JSON.parse(cachedData);
      const now = Date.now();
      
      // בדיקת תוקף
      if (now - parsed.timestamp > this.cacheExpiry) {
        console.log(`⏰ Cache expired for ${level} - ${focusArea}`);
        return { scenarios: [], needsRefresh: true };
      }
      
      console.log(`📱 Found ${parsed.scenarios.length} scenarios in cache`);
      
      // בדיקת כמות מינימלית
      if (parsed.scenarios.length < this.minCacheSize) {
        console.log(`⚠️ Cache has only ${parsed.scenarios.length} scenarios, needs refresh`);
        return { scenarios: parsed.scenarios, needsRefresh: true };
      }
      
      return { scenarios: parsed.scenarios, needsRefresh: false };
    } catch (error) {
      console.error('Failed to get cached scenarios:', error);
      return { scenarios: [], needsRefresh: true };
    }
  }

  // 💾 שמירת שאלות ב-cache
  async saveCachedScenarios(level, focusArea, scenarios) {
    try {
      const cacheKey = this.getCacheKey(level, focusArea);
      const cacheData = {
        scenarios: scenarios.slice(0, this.maxCacheSize), // הגבלת גודל
        timestamp: Date.now(),
        level,
        focusArea
      };
      
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log(`💾 Saved ${cacheData.scenarios.length} scenarios to cache`);
      return true;
    } catch (error) {
      console.error('Failed to save cached scenarios:', error);
      return false;
    }
  }

  // 🎯 שליפת תרחיש חכם (cache-first)
  async getSmartScenario(level, focusArea) {
    try {
      console.log(`🎯 Getting smart scenario for ${level} - ${focusArea}`);
      
      // 1. בדוק cache מקומי
      const { scenarios, needsRefresh } = await this.getCachedScenarios(level, focusArea);
      
      // 2. אם יש תרחיש זמין בcache
      if (scenarios.length > 0) {
        // קח תרחיש רנדומלי מהcache
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        const selectedScenario = scenarios[randomIndex];
        
        // הסר אותו מהcache (למניעת חזרה)
        const remainingScenarios = scenarios.filter((_, index) => index !== randomIndex);
        await this.saveCachedScenarios(level, focusArea, remainingScenarios);
        
        console.log(`✅ Returning scenario from cache, ${remainingScenarios.length} left`);
        
        // ברקע - רענן cache אם צריך
        if (needsRefresh) {
          console.log('🔄 Starting background cache refresh...');
          this.refreshCacheInBackground(level, focusArea);
        }
        
        return { success: true, data: selectedScenario, source: 'cache' };
      }
      
      // 3. אין בcache - טען מהמסד נתונים
      console.log('📊 No cache available, loading from database...');
      return await this.loadFreshScenarios(level, focusArea);
      
    } catch (error) {
      console.error('Failed to get smart scenario:', error);
      return { success: false, error: error.message };
    }
  }

  // 🔄 טעינת שאלות חדשות
  async loadFreshScenarios(level, focusArea) {
    try {
      // 1. נסה לטעון מהמסד נתונים
      const dbResult = await supabaseService.getScenarios(level, focusArea, 15);
      
      if (dbResult.success && dbResult.data.length > 0) {
        console.log(`📊 Loaded ${dbResult.data.length} scenarios from database`);
        
        // שמור בcache
        await this.saveCachedScenarios(level, focusArea, dbResult.data);
        
        // החזר תרחיש ראשון
        const firstScenario = dbResult.data[0];
        const remainingScenarios = dbResult.data.slice(1);
        await this.saveCachedScenarios(level, focusArea, remainingScenarios);
        
        return { success: true, data: firstScenario, source: 'database' };
      }
      
      // 2. אין במסד נתונים - צור עם AI
      console.log('🤖 No scenarios in database, generating with AI...');
      return await this.generateWithAI(level, focusArea);
      
    } catch (error) {
      console.error('Failed to load fresh scenarios:', error);
      return { success: false, error: error.message };
    }
  }

  // 🤖 יצירת שאלות חדשות עם AI
  async generateWithAI(level, focusArea, count = 3) {
    try {
      console.log(`🤖 Generating ${count} scenarios with AI...`);
      const newScenarios = [];
      
      // צור מספר שאלות בבת אחת
      for (let i = 0; i < count; i++) {
        try {
          console.log(`🤖 Generating scenario ${i + 1}/${count}...`);
          
          const aiResult = await aiService.generateAdvancedScenario(level, focusArea);
          
          if (aiResult && aiResult.cards && aiResult.scenario) {
            // הוסף מטה-נתונים
            const scenarioData = {
              id: `ai_${Date.now()}_${i}`, // זמני ID
              level,
              focus_area: focusArea,
              cards: aiResult.cards,
              position: aiResult.position,
              scenario: aiResult.scenario,
              correct_action: aiResult.correctAction || aiResult.recommendedAction,
              explanation: aiResult.explanation,
              difficulty_score: aiResult.difficulty || 5,
              created_at: new Date().toISOString(),
              used_count: 0,
              success_rate: 0,
              source: 'ai_generated'
            };
            
            newScenarios.push(scenarioData);
            
            // שמור במסד נתונים (ברקע, ללא המתנה)
            supabaseService.saveScenario(scenarioData).catch(err => 
              console.log('Background save failed:', err.message)
            );
          }
        } catch (aiError) {
          console.log(`Failed to generate scenario ${i + 1}:`, aiError.message);
        }
      }
      
      if (newScenarios.length > 0) {
        console.log(`✅ Generated ${newScenarios.length} scenarios with AI`);
        
        // שמור בcache
        await this.saveCachedScenarios(level, focusArea, newScenarios);
        
        // החזר התרחיש הראשון
        const firstScenario = newScenarios[0];
        const remainingScenarios = newScenarios.slice(1);
        await this.saveCachedScenarios(level, focusArea, remainingScenarios);
        
        return { success: true, data: firstScenario, source: 'ai_generated' };
      }
      
      return { success: false, error: 'Failed to generate any scenarios with AI' };
      
    } catch (error) {
      console.error('Failed to generate scenarios with AI:', error);
      return { success: false, error: error.message };
    }
  }

  // 🔄 רענון cache ברקע
  async refreshCacheInBackground(level, focusArea) {
    try {
      console.log(`🔄 Background: Refreshing cache for ${level} - ${focusArea}`);
      
      // נסה לטעון מהמסד נתונים
      const dbResult = await supabaseService.getScenarios(level, focusArea, 10);
      
      if (dbResult.success && dbResult.data.length > 0) {
        const { scenarios } = await this.getCachedScenarios(level, focusArea);
        const mergedScenarios = [...scenarios, ...dbResult.data];
        
        // שמור cache מעודכן
        await this.saveCachedScenarios(level, focusArea, mergedScenarios);
        console.log(`✅ Background: Cache refreshed with ${dbResult.data.length} scenarios`);
      } else {
        // אין במסד נתונים - צור עם AI
        console.log(`🤖 Background: Generating scenarios with AI`);
        await this.generateWithAI(level, focusArea, 2);
      }
      
    } catch (error) {
      console.error('Background cache refresh failed:', error);
    }
  }

  // 📊 סטטיסטיקות cache
  async getCacheStats() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.cachePrefix));
      
      const stats = {
        totalCaches: cacheKeys.length,
        cacheDetails: []
      };
      
      for (const key of cacheKeys) {
        try {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            stats.cacheDetails.push({
              key,
              level: parsed.level,
              focusArea: parsed.focusArea,
              scenarioCount: parsed.scenarios.length,
              lastUpdated: new Date(parsed.timestamp),
              isExpired: Date.now() - parsed.timestamp > this.cacheExpiry
            });
          }
        } catch (parseError) {
          console.log(`Failed to parse cache ${key}:`, parseError.message);
        }
      }
      
      return stats;
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return { totalCaches: 0, cacheDetails: [] };
    }
  }

  // 🧹 ניקוי cache
  async clearCache(level = null, focusArea = null) {
    try {
      if (level && focusArea) {
        // נקה cache ספציפי
        const cacheKey = this.getCacheKey(level, focusArea);
        await AsyncStorage.removeItem(cacheKey);
        console.log(`🧹 Cleared cache for ${level} - ${focusArea}`);
      } else {
        // נקה את כל הcache
        const keys = await AsyncStorage.getAllKeys();
        const cacheKeys = keys.filter(key => key.startsWith(this.cachePrefix));
        await AsyncStorage.multiRemove(cacheKeys);
        console.log(`🧹 Cleared all cache (${cacheKeys.length} items)`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }
}

export const questionCache = new QuestionCacheManager();
