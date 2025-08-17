// src/services/supabaseService.js
import { createClient } from '@supabase/supabase-js';

// 🔑 הגדרות Supabase - הפרטים שלך
const supabaseUrl = 'https://asbmiibacwbfnrcpdhzh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYm1paWJhY3diZm5yY3BkaHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTI1MzcsImV4cCI6MjA3MTAyODUzN30.R62eaWaKlJh2aod_BxT_QJKbUgpS8GKj8KA1SiLM4t8';

export const supabase = createClient(supabaseUrl, supabaseKey);

class SupabaseService {
  // 📊 שליפת שאלות לפי רמה ומיקוד
  async getScenarios(level = 'beginner', focusArea = 'pre-flop basics', limit = 10) {
    try {
      console.log(`🔍 Fetching scenarios: ${level} - ${focusArea}`);
      
      const { data, error } = await supabase
        .from('poker_scenarios')
        .select('*')
        .eq('level', level)
        .eq('focus_area', focusArea)
        .order('used_count', { ascending: true })
        .limit(limit);

      if (error) throw error;
      
      console.log(`✅ Fetched ${data.length} scenarios from DB`);
      return { success: true, data };
    } catch (error) {
      console.error('Failed to fetch scenarios:', error);
      return { success: false, error: error.message };
    }
  }

  // 💾 שמירת תרחיש חדש
  async saveScenario(scenarioData) {
    try {
      console.log('💾 Saving scenario to DB...');
      
      const { data, error } = await supabase
        .from('poker_scenarios')
        .insert([scenarioData])
        .select();

      if (error) throw error;
      
      console.log('✅ Scenario saved successfully');
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Failed to save scenario:', error);
      return { success: false, error: error.message };
    }
  }

  // 📈 עדכון סטטיסטיקות שאלה
  async updateScenarioStats(scenarioId, wasCorrect) {
    try {
      const { data: current } = await supabase
        .from('poker_scenarios')
        .select('used_count, success_rate')
        .eq('id', scenarioId)
        .single();

      if (!current) return { success: false, error: 'Scenario not found' };

      const newUsedCount = (current.used_count || 0) + 1;
      const currentSuccessRate = current.success_rate || 0;
      const newSuccessRate = ((currentSuccessRate * (newUsedCount - 1)) + (wasCorrect ? 1 : 0)) / newUsedCount;

      const { error } = await supabase
        .from('poker_scenarios')
        .update({
          used_count: newUsedCount,
          success_rate: newSuccessRate
        })
        .eq('id', scenarioId);

      if (error) throw error;
      
      console.log(`📊 Updated scenario stats: ${newUsedCount} uses, ${(newSuccessRate * 100).toFixed(1)}% success`);
      return { success: true };
    } catch (error) {
      console.error('Failed to update scenario stats:', error);
      return { success: false, error: error.message };
    }
  }

  // 👤 שמירת התקדמות המשתמש
  async savePlayerProgress(userId, progressData) {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .upsert(
          [{ user_id: userId, ...progressData }],
          { 
            onConflict: 'user_id',
            ignoreDuplicates: false 
          }
        )
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Failed to save player progress:', error);
      
      // אם יש שגיאת duplicate key, נסה לעדכן במקום
      if (error.message.includes('duplicate key') || error.code === '23505') {
        console.log('🔄 Trying to update existing record instead...');
        
        try {
          const { data: updateData, error: updateError } = await supabase
            .from('player_progress')
            .update(progressData)
            .eq('user_id', userId)
            .select();
            
          if (updateError) throw updateError;
          return { success: true, data: updateData[0] };
        } catch (updateErr) {
          console.error('Update also failed:', updateErr);
          return { success: false, error: updateErr.message };
        }
      }
      
      return { success: false, error: error.message };
    }
  }

  // 📊 שליפת התקדמות המשתמש
  async getPlayerProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Failed to get player progress:', error);
      return { success: false, error: error.message };
    }
  }

  // 🎮 שמירת סשן משחק
  async saveGameSession(userId, scenarioId, decision, correct, timeTaken) {
    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .insert([{
          user_id: userId,
          scenario_id: scenarioId,
          decision,
          correct,
          time_taken: timeTaken
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Failed to save game session:', error);
      return { success: false, error: error.message };
    }
  }

  // 📊 סטטיסטיקות מפורטות
  async getPlayerStats(userId, days = 30) {
    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);

      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', fromDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Failed to get player stats:', error);
      return { success: false, error: error.message };
    }
  }

  // 🔧 בדיקת חיבור
  async testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      const { data, error } = await supabase
        .from('poker_scenarios')
        .select('count')
        .limit(1);
        
      if (error) throw error;
      
      console.log('✅ Supabase connection successful');
      return { success: true, connected: true };
    } catch (error) {
      console.error('❌ Supabase connection failed:', error);
      return { success: false, connected: false, error: error.message };
    }
  }
}

export const supabaseService = new SupabaseService();
