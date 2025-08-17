import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { aiService } from '../services/aiService';
import { styles } from '../styles/appStyles';

// כפתור מאמן AI
export const AICoachButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: 100,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      overflow: 'hidden',
      zIndex: 100
    }}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 24 }}>🤖</Text>
      <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>דני</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// ניתוח AI
export const AIAnalysisDisplay = ({ cards, position, scenario, decision }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cards && position && scenario && decision) {
      analyzeHand();
    }
  }, [cards, position, scenario, decision]);

  const analyzeHand = async () => {
    setLoading(true);
    try {
      const result = await aiService.analyzeHand({
        cards, position, scenario, decision
      });
      if (result.success) {
        setAnalysis(result.data.analysis);
      }
    } catch (error) {
      console.error('AI Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.feedbackSection, { alignItems: 'center', padding: 20 }]}>
        <BlurView intensity={20} style={styles.feedbackBlur}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#667eea" />
            <Text style={[styles.feedbackText, { marginTop: 10, marginBottom: 0 }]}>
              🤖 המאמן AI מנתח...
            </Text>
          </View>
        </BlurView>
      </View>
    );
  }

  if (!analysis) return null;

  return (
    <View style={styles.feedbackSection}>
      <BlurView intensity={20} style={styles.feedbackBlur}>
        <LinearGradient
          colors={["rgba(102, 126, 234, 0.9)", "rgba(118, 75, 162, 0.9)"]}
          style={styles.feedbackGradient}
        >
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackIcon}>🤖</Text>
            <Text style={styles.feedbackTitle}>ניתוח מאמן AI</Text>
          </View>
          <ScrollView style={{ maxHeight: 200 }}>
            <Text style={styles.feedbackText}>{analysis}</Text>
          </ScrollView>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

// צ'אט עם מאמן
export const AICoachChat = ({ visible, onClose }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('שגיאה', 'אנא כתוב שאלה');
      return;
    }

    setLoading(true);
    try {
      const result = await aiService.askCoach(question);
      if (result.success) {
        setResponse(result.data.response);
        setQuestion('');
      }
    } catch (error) {
      Alert.alert('שגיאה', 'לא ניתן להתחבר למאמן');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      zIndex: 1000
    }}>
      <BlurView intensity={20} style={{
        width: '100%',
        maxWidth: 400,
        borderRadius: 20,
        overflow: 'hidden'
      }}>
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
          style={{ padding: 20 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={[styles.feedbackTitle, { fontSize: 18 }]}>💬 שאל את דני</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          {response ? (
            <ScrollView style={{
              backgroundColor: 'rgba(102, 126, 234, 0.2)',
              borderRadius: 10, padding: 15, marginBottom: 15, maxHeight: 150
            }}>
              <Text style={[styles.feedbackText, { fontSize: 14 }]}>
                🤖 דני: {response}
              </Text>
            </ScrollView>
          ) : null}

          <TextInput
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 10, padding: 15, color: '#fff',
              marginBottom: 15, minHeight: 80, textAlignVertical: 'top'
            }}
            placeholder="שאל את דני כל שאלה על פוקר..."
            placeholderTextColor="#ccc"
            value={question}
            onChangeText={setQuestion}
            multiline
          />

          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(102, 126, 234, 0.8)',
              borderRadius: 10, padding: 15, alignItems: 'center',
              flexDirection: 'row', justifyContent: 'center'
            }}
            onPress={askQuestion}
            disabled={loading}
          >
            {loading && <ActivityIndicator size="small" color="#fff" style={{ marginRight: 10 }} />}
            <Text style={[styles.nextButtonText, { fontSize: 16 }]}>
              {loading ? 'שולח...' : '📤 שלח שאלה'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    </View>
  );
};
