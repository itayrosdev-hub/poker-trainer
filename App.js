import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  I18nManager, 
  Animated, 
  Dimensions 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

// Import our components
import { ModernPokerTable } from "./src/components/ModernPokerTable";
import { CardsDisplay } from "./src/components/Cards";
import { ActionButtons, ScenarioDisplay } from "./src/components/GameActions";
// Import AI components
import { AICoachChat } from "./src/components/AIComponents";
import { aiService } from "./src/services/aiService";
import { authService } from "./src/services/authService";

// Import utils
import { 
  generateRandomCards, 
  generateRandomScenario,
  generateAIScenario,
  generateSmartCards,
  getHandStrength, 
  evaluateDecision
} from "./src/utils/gameLogic";

// Import data
import { GAME_CONFIG } from "./src/data/pokerData";

// Import styles
import { styles } from "./src/styles/appStyles";

// הפעלת RTL לתמיכה בעברית
I18nManager.allowRTL(true);

const { width, height } = Dimensions.get("window");

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [gameState, setGameState] = useState({
    playerCards: [],
    position: null,
    scenario: null,
    score: 0,
    round: 0,
    feedback: null,
    showAnswer: false,
    playerActions: {},
    pot: GAME_CONFIG.getInitialPot()
  });

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showAICoach, setShowAICoach] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [lastDecision, setLastDecision] = useState(null);

  // 🧠 Smart Player Progress System
  const [playerProgress, setPlayerProgress] = useState({
    level: 'beginner', // beginner, intermediate, advanced
    currentFocus: 'pre-flop basics',
    gameHistory: [],
    strengths: [],
    weaknesses: [],
    totalGames: 0,
    correctDecisions: 0,
    streak: 0,
    lastProgressAnalysis: null,
    adaptiveDifficulty: true
  });

  const [progressInsights, setProgressInsights] = useState(null);
  const [smartQuestions, setSmartQuestions] = useState(null);

  // 🎨 UI State for better UX
  const [activeAIPanel, setActiveAIPanel] = useState(null); // 'analysis', 'progress', 'questions', 'learning'
  const [showSettings, setShowSettings] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const cardFlipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentScreen]);

  // 🤖 יצירת תרחיש חדש עם AI
  const generateNewScenario = async () => {
    try {
      // בחירה חכמה של קלפים בהתאם לרמת השחקן
      const cards = playerProgress.adaptiveDifficulty 
        ? generateSmartCards(playerProgress.level, playerProgress.currentFocus)
        : generateRandomCards();
      
      // יצירת תרחיש מתקדם עם AI
      const scenarioData = playerProgress.adaptiveDifficulty
        ? await generateAIScenario(playerProgress.level, playerProgress.currentFocus)
        : generateRandomScenario();

    // Animation for new cards
    Animated.sequence([
      Animated.timing(cardFlipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardFlipAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // יצירת פעולות ריאליסטיות לשחקנים אחרים
    const randomActions = {};
    ['BTN', 'SB', 'BB', 'UTG', 'MP', 'CO'].forEach(pos => {
      if (pos !== scenarioData.position) {
        const rand = Math.random();
        if (rand < 0.6) {
          randomActions[pos] = 'FOLD'; // 60% FOLD
        } else if (rand < 0.85) {
          randomActions[pos] = 'CALL'; // 25% CALL
        } else {
          randomActions[pos] = 'RAISE'; // 15% RAISE
        }
      }
    });

      setGameState(prev => ({
        ...prev,
        playerCards: cards,
        position: scenarioData.position,
        scenario: scenarioData,
        playerActions: randomActions,
        pot: scenarioData.pot,
        feedback: null,
        showAnswer: false,
        round: prev.round + 1
      }));
      
      // 🧹 Clear previous AI analysis and insights
      setAiAnalysis(null);
      setProgressInsights(null);
      setSmartQuestions(null);
      
      // 🧠 יצירת שאלות דינמיות חכמות
      if (isAIEnabled && playerProgress.adaptiveDifficulty) {
        try {
          const dynamicQuestion = await aiService.generateDynamicQuestion(
            cards, 
            scenarioData, 
            playerProgress.gameHistory
          );
                     setSmartQuestions(dynamicQuestion);
           if (dynamicQuestion) setActiveAIPanel('questions');
        } catch (error) {
          console.log('Dynamic question generation failed:', error);
        }
      }
      
    } catch (error) {
      console.error('Advanced scenario generation failed, using fallback:', error);
      // Fallback to basic generation
      const cards = generateRandomCards();
      const scenarioData = generateRandomScenario();
      
      // ... rest of fallback logic ...
      setGameState(prev => ({
        ...prev,
        playerCards: cards,
        position: scenarioData.position,
        scenario: scenarioData,
        playerActions: {},
        pot: scenarioData.pot,
        feedback: null,
        showAnswer: false,
        round: prev.round + 1
      }));
      
      setAiAnalysis(null);
    }
  };

  // הערכת החלטה - מעודכן לשימוש בפונקציה החדשה
  const makeDecision = async (decision) => {
    const { playerCards, scenario } = gameState;
    const evaluation = evaluateDecision(playerCards, scenario, decision);
    

    // שמירת החלטה לAI analysis
    setLastDecision(decision);

    // ניתוח AI אם זמין
    if (isAIEnabled) {
      try {
        const aiResult = await aiService.analyzeHand({
          cards: playerCards,
          position: scenario.position,
          scenario: scenario,
          decision: decision
        });
                 if (aiResult.success) {
           setAiAnalysis(aiResult.data.analysis);
           setActiveAIPanel('analysis'); // פתח אוטומטית את טאב הניתוח
         }
      } catch (error) {
        console.log("AI analysis failed:", error);
      }
    }

    // 📊 עדכון מערכת התקדמות חכמה
    const newGameEntry = {
      id: Date.now(),
      cards: playerCards,
      position: scenario.position,
      scenario: scenario,
      decision: decision,
      correct: evaluation.isCorrect,
      timestamp: new Date(),
      difficulty: scenario.difficulty || 5,
      focusArea: playerProgress.currentFocus
    };

    setPlayerProgress(prev => {
      const newHistory = [...prev.gameHistory, newGameEntry].slice(-50); // שמור 50 משחקים אחרונים
      const newCorrect = evaluation.isCorrect ? prev.correctDecisions + 1 : prev.correctDecisions;
      const newTotal = prev.totalGames + 1;
      const newStreak = evaluation.isCorrect ? prev.streak + 1 : 0;
      
      return {
        ...prev,
        gameHistory: newHistory,
        totalGames: newTotal,
        correctDecisions: newCorrect,
        streak: newStreak
      };
    });

    // 🔍 ניתוח התקדמות כל 10 משחקים
    if ((playerProgress.totalGames + 1) % 10 === 0 && isAIEnabled) {
      try {
        const progressAnalysis = await aiService.analyzePlayerProgress(
          playerProgress.gameHistory,
          playerProgress.level
        );
                 setProgressInsights(progressAnalysis);
         setActiveAIPanel('progress');
      } catch (error) {
        console.log("Progress analysis failed:", error);
      }
    }

    setGameState(prev => ({
      ...prev,
      score: evaluation.isCorrect ? prev.score + 1 : prev.score,
      feedback: {
        correct: evaluation.isCorrect,
        explanation: evaluation.explanation,
        handStrength: evaluation.handStrength,
        recommendedAction: evaluation.recommendedAction
      },
      showAnswer: true
    }));
  };

  // Home Screen
  const renderHomeScreen = () => (
    <LinearGradient
      colors={["#0F0C29", "#24243e", "#302B63"]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <StatusBar style="light" />
        
        {/* Header */}
        <BlurView intensity={20} style={styles.headerBlur}>
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
            style={styles.headerGradient}
          >
            <Text style={styles.appTitle}>🃏 אקדמיית הפוקר</Text>
            <Text style={styles.appSubtitle}>בית הספר לפוקר הישראלי</Text>
            <Text style={styles.appDescription}>התרגלו והשתפרו בטכניקות פוקר מתקדמות</Text>
          </LinearGradient>
        </BlurView>

        <ScrollView 
          style={styles.menuScrollView}
          contentContainerStyle={styles.menuContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Pre-flop Training Card */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => setCurrentScreen("preflop")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.menuCardGradient}
            >
              <BlurView intensity={15} style={styles.menuCardBlur}>
                <View style={styles.menuCardContent}>
                  <Text style={styles.menuCardIcon}>📋</Text>
                  <Text style={styles.menuCardTitle}>תרגול לפני הפלופ</Text>
                  <Text style={styles.menuCardDesc}>
                    החלטות חכמות לפני חלוקת הקלפים הפתוחים{"\n"}
                    בהתבסס על הקלפים שלכם והמיקום שלכם בשולחן
                  </Text>
                  <View style={styles.menuCardButton}>
                    <Text style={styles.menuCardButtonText}>התחל ►</Text>
                  </View>
                </View>
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>

          {/* Coming Soon Cards */}
          {[
            { 
              key: "postflop", 
              title: "תרגול אחרי הפלופ", 
              icon: "🎯", 
              colors: ["#f093fb", "#f5576c"],
              desc: "החלטות על הפלופ, הטרן והריבר"
            },
            { 
              key: "situations", 
              title: "מצבי שולחן", 
              icon: "🏆", 
              colors: ["#4facfe", "#00f2fe"],
              desc: "תרחישים מורכבים ואסטרטגיות"
            },
            { 
              key: "stats", 
              title: "סטטיסטיקות", 
              icon: "📊", 
              colors: ["#43e97b", "#38f9d7"],
              desc: "מעקב אחר ההתקדמות והשיפור"
            }
          ].map((item) => (
            <TouchableOpacity 
              key={item.key}
              style={styles.menuCard}
              onPress={() => setCurrentScreen(item.key)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.menuCardGradient}
              >
                <BlurView intensity={15} style={styles.menuCardBlur}>
                  <View style={styles.menuCardContent}>
                    <Text style={styles.menuCardIcon}>{item.icon}</Text>
                    <Text style={styles.menuCardTitle}>{item.title}</Text>
                    <Text style={styles.menuCardDesc}>{item.desc}</Text>
                    <View style={styles.menuCardButton}>
                      <Text style={styles.menuCardButtonText}>בקרוב</Text>
                    </View>
                  </View>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );

  // Pre-flop Training Screen
  const renderPreflopTraining = () => (
    <LinearGradient
      colors={["#0F0C29", "#24243e", "#302B63"]}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen("home")}
        activeOpacity={0.8}
      >
        <BlurView intensity={20} style={styles.backButtonBlur}>
          <Text style={styles.backButtonText}>← חזרה</Text>
        </BlurView>
      </TouchableOpacity>

      <ScrollView 
        style={styles.trainingScrollView}
        contentContainerStyle={styles.trainingContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BlurView intensity={15} style={styles.trainingHeader}>
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
            style={styles.trainingHeaderGradient}
          >
            <Text style={styles.trainingTitle}>📋 תרגול לפני הפלופ</Text>
          </LinearGradient>
        </BlurView>

                 {/* 📊 Advanced Stats with AI Insights */}
         <View style={styles.statsContainer}>
           <BlurView intensity={20} style={styles.statsBlur}>
             <LinearGradient
               colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
               style={styles.statsGradient}
             >
               <View style={styles.stats}>
                 <View style={styles.statItem}>
                   <Text style={styles.statNumber}>{gameState.round}</Text>
                   <Text style={styles.statLabel}>סיבוב</Text>
                 </View>
                 <View style={styles.statDivider} />
                 <View style={styles.statItem}>
                   <Text style={styles.statNumber}>{gameState.score}</Text>
                   <Text style={styles.statLabel}>נכונים</Text>
                 </View>
                 <View style={styles.statDivider} />
                 <View style={styles.statItem}>
                   <Text style={styles.statNumber}>
                     {gameState.round > 0 ? Math.round((gameState.score / gameState.round) * 100) : 0}%
                   </Text>
                   <Text style={styles.statLabel}>הצלחה</Text>
                 </View>
                 <View style={styles.statDivider} />
                 <View style={styles.statItem}>
                   <Text style={styles.statNumber}>{playerProgress.streak}</Text>
                   <Text style={styles.statLabel}>רצף</Text>
                 </View>
               </View>
               
               {/* 🧠 AI Level Display & Controls */}
               <View style={{ marginTop: 10, alignItems: 'center' }}>
                 <TouchableOpacity 
                   onPress={() => {
                     const levels = ['beginner', 'intermediate', 'advanced'];
                     const currentIndex = levels.indexOf(playerProgress.level);
                     const nextIndex = (currentIndex + 1) % levels.length;
                     setPlayerProgress(prev => ({ ...prev, level: levels[nextIndex] }));
                   }}
                   style={{ padding: 5, borderRadius: 8, backgroundColor: 'rgba(102, 126, 234, 0.3)' }}
                 >
                   <Text style={[styles.statLabel, { fontSize: 12, color: '#667eea' }]}>
                     🤖 רמה: {playerProgress.level === 'beginner' ? 'מתחיל' : 
                             playerProgress.level === 'intermediate' ? 'בינוני' : 'מתקדם'} ⚙️
                   </Text>
                 </TouchableOpacity>
                 
                 <TouchableOpacity 
                   onPress={() => {
                     setPlayerProgress(prev => ({ 
                       ...prev, 
                       adaptiveDifficulty: !prev.adaptiveDifficulty 
                     }));
                   }}
                   style={{ 
                     padding: 5, 
                     marginTop: 5, 
                     borderRadius: 8, 
                     backgroundColor: playerProgress.adaptiveDifficulty ? 'rgba(76, 175, 80, 0.3)' : 'rgba(158, 158, 158, 0.3)' 
                   }}
                 >
                   <Text style={[styles.statLabel, { fontSize: 10, color: playerProgress.adaptiveDifficulty ? '#4CAF50' : '#888' }]}>
                     {playerProgress.adaptiveDifficulty ? '🤖 AI חכם פעיל' : '🎲 מצב רנדומי'}
                   </Text>
                 </TouchableOpacity>
                 
                 <Text style={[styles.statLabel, { fontSize: 10, color: '#888', marginTop: 3 }]}>
                   {playerProgress.currentFocus}
                 </Text>
               </View>
             </LinearGradient>
           </BlurView>
         </View>

                   {/* 🎯 Single AI Panel with Tabs */}
          {(aiAnalysis || progressInsights || smartQuestions) && (
            <View style={styles.feedbackSection}>
              <BlurView intensity={20} style={styles.feedbackBlur}>
                <LinearGradient
                  colors={["rgba(102, 126, 234, 0.95)", "rgba(118, 75, 162, 0.95)"]}
                  style={styles.feedbackGradient}
                >
                  {/* Tabs Header */}
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    paddingVertical: 10, 
                    borderBottomWidth: 1, 
                    borderBottomColor: 'rgba(255,255,255,0.2)' 
                  }}>
                    {aiAnalysis && (
                      <TouchableOpacity 
                        onPress={() => setActiveAIPanel('analysis')}
                        style={{ 
                          paddingHorizontal: 15, 
                          paddingVertical: 8, 
                          borderRadius: 20,
                          backgroundColor: activeAIPanel === 'analysis' ? 'rgba(255,255,255,0.3)' : 'transparent'
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>🤖 ניתוח</Text>
                      </TouchableOpacity>
                    )}
                    
                    {smartQuestions && (
                      <TouchableOpacity 
                        onPress={() => setActiveAIPanel('questions')}
                        style={{ 
                          paddingHorizontal: 15, 
                          paddingVertical: 8, 
                          borderRadius: 20,
                          backgroundColor: activeAIPanel === 'questions' ? 'rgba(255,255,255,0.3)' : 'transparent'
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>🎯 שאלות</Text>
                      </TouchableOpacity>
                    )}
                    
                    {progressInsights && (
                      <TouchableOpacity 
                        onPress={() => setActiveAIPanel('progress')}
                        style={{ 
                          paddingHorizontal: 15, 
                          paddingVertical: 8, 
                          borderRadius: 20,
                          backgroundColor: activeAIPanel === 'progress' ? 'rgba(255,255,255,0.3)' : 'transparent'
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>📈 התקדמות</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Content */}
                  <ScrollView style={{ maxHeight: 200, padding: 15 }}>
                    {activeAIPanel === 'analysis' && aiAnalysis && (
                      <Text style={[styles.feedbackText, { color: '#fff' }]}>{aiAnalysis}</Text>
                    )}
                    
                    {activeAIPanel === 'questions' && smartQuestions && (
                      <Text style={[styles.feedbackText, { color: '#fff' }]}>{smartQuestions}</Text>
                    )}
                    
                    {activeAIPanel === 'progress' && progressInsights && (
                      <Text style={[styles.feedbackText, { color: '#fff' }]}>{progressInsights}</Text>
                    )}
                    
                    {!activeAIPanel && (
                      <Text style={[styles.feedbackText, { color: '#fff', textAlign: 'center', opacity: 0.7 }]}>
                        👆 בחר טאב לצפייה בתוכן
                      </Text>
                    )}
                  </ScrollView>
                </LinearGradient>
              </BlurView>
            </View>
          )}

        {gameState.playerCards.length > 0 ? (
          <>
            {/* Modern Poker Table */}
            <ModernPokerTable gameState={gameState} />

            {/* Cards */}
            <CardsDisplay 
              cards={gameState.playerCards} 
               
            />

            {/* Scenario Info */}
            <ScenarioDisplay 
              position={gameState.position} 
              scenario={gameState.scenario} 
            />

            {/* Action Buttons */}
            <ActionButtons 
              onAction={makeDecision}
              scenario={gameState.scenario}
              isVisible={!gameState.showAnswer}
            />

            {/* Feedback */}
            {gameState.feedback && (
              <View style={styles.feedbackSection}>
                <BlurView intensity={20} style={styles.feedbackBlur}>
                  <LinearGradient
                    colors={gameState.feedback.correct ? 
                      ["rgba(34, 197, 94, 0.9)", "rgba(16, 185, 129, 0.9)"] : 
                      ["rgba(239, 68, 68, 0.9)", "rgba(220, 38, 38, 0.9)"]}
                    style={styles.feedbackGradient}
                  >
                    <View style={styles.feedbackHeader}>
                      <Text style={styles.feedbackIcon}>
                        {gameState.feedback.correct ? "🎉" : "🤔"}
                      </Text>
                      <Text style={styles.feedbackTitle}>
                        {gameState.feedback.correct ? "החלטה מעולה!" : "בואו נלמד יחד"}
                      </Text>
                    </View>
                    <Text style={styles.feedbackText}>{gameState.feedback.explanation}</Text>
                    {!gameState.feedback.correct && (
                      <Text style={styles.feedbackText}>
                        המלצה: {gameState.feedback.recommendedAction}
                      </Text>
                    )}
                    
                    <TouchableOpacity 
                      style={styles.nextButton}
                      onPress={generateNewScenario}
                      activeOpacity={0.8}
                    >
                      <BlurView intensity={15} style={styles.nextButtonBlur}>
                        <Text style={styles.nextButtonText}>סיבוב הבא ►</Text>
                      </BlurView>
                    </TouchableOpacity>
                  </LinearGradient>
                </BlurView>
              </View>
                         )}

            
          </>
        ) : (
          <View style={styles.welcomeSection}>
            <BlurView intensity={20} style={styles.welcomeBlur}>
              <LinearGradient
                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                style={styles.welcomeGradient}
              >
                <Text style={styles.welcomeEmoji}>🃏</Text>
                <Text style={styles.welcomeTitle}>ברוכים הבאים לאימון!</Text>
                <Text style={styles.welcomeDesc}>
                  נתרגל החלטות חכמות לפני חלוקת הקלפים הפתוחים{"\n"}
                  בהתבסס על הקלפים שלכם והמיקום שלכם בשולחן{"\n"}
                  עם כללי פוקר נכונים ומדויקים!
                </Text>
                <TouchableOpacity 
                  style={styles.welcomeButton}
                  onPress={generateNewScenario}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#667eea", "#764ba2"]}
                    style={styles.welcomeButtonGradient}
                  >
                    <BlurView intensity={10} style={styles.welcomeButtonBlur}>
                      <Text style={styles.welcomeButtonText}>🚀 בואו נתחיל!</Text>
                    </BlurView>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </BlurView>
          </View>
                 )}

                 {/* 🎛️ Floating Action Menu */}
         <View style={{
           position: 'absolute',
           bottom: 30,
           right: 20,
           zIndex: 100
         }}>
           {/* Main AI Button */}
           <TouchableOpacity
             onPress={() => setShowSettings(!showSettings)}
             style={{
               width: 60,
               height: 60,
               borderRadius: 30,
               overflow: 'hidden',
               marginBottom: showSettings ? 15 : 0
             }}
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
               <Text style={{ fontSize: 24 }}>{showSettings ? '✕' : '🤖'}</Text>
             </LinearGradient>
           </TouchableOpacity>

           {/* Sub Menu */}
           {showSettings && (
             <View style={{ alignItems: 'center', gap: 10 }}>
               {/* Coach Chat */}
               <TouchableOpacity
                 onPress={() => {
                   setShowAICoach(true);
                   setShowSettings(false);
                 }}
                 style={{
                   width: 50,
                   height: 50,
                   borderRadius: 25,
                   overflow: 'hidden'
                 }}
               >
                 <LinearGradient
                   colors={["#4facfe", "#00f2fe"]}
                   style={{
                     width: '100%',
                     height: '100%',
                     justifyContent: 'center',
                     alignItems: 'center'
                   }}
                 >
                   <Text style={{ fontSize: 20 }}>💬</Text>
                 </LinearGradient>
               </TouchableOpacity>

               {/* Learning Content */}
               <TouchableOpacity
                 onPress={async () => {
                   setShowSettings(false);
                   const topics = ['GTO vs Exploitative', 'ICM Theory', 'Range Construction', 'Bet Sizing Theory', 'Bluff Strategy'];
                   const randomTopic = topics[Math.floor(Math.random() * topics.length)];
                   
                   try {
                     const content = await aiService.generateAdvancedContent(randomTopic, playerProgress.level);
                     if (content) {
                       setProgressInsights(content);
                       setActiveAIPanel('progress');
                     }
                   } catch (error) {
                     console.log('Advanced content generation failed:', error);
                   }
                 }}
                 style={{
                   width: 50,
                   height: 50,
                   borderRadius: 25,
                   overflow: 'hidden'
                 }}
               >
                 <LinearGradient
                   colors={["#ff6b6b", "#ee5a52"]}
                   style={{
                     width: '100%',
                     height: '100%',
                     justifyContent: 'center',
                     alignItems: 'center'
                   }}
                 >
                   <Text style={{ fontSize: 20 }}>🎓</Text>
                 </LinearGradient>
               </TouchableOpacity>
             </View>
           )}
         </View>
        
        {/* 💬 AI Coach Chat */}
        <AICoachChat 
          visible={showAICoach} 
          onClose={() => setShowAICoach(false)} 
        />
      </ScrollView>
    </LinearGradient>
  );

  return (
    <>
      {currentScreen === "home" && renderHomeScreen()}
      {currentScreen === "preflop" && renderPreflopTraining()}
      {currentScreen !== "home" && currentScreen !== "preflop" && (
        <LinearGradient
          colors={["#0F0C29", "#24243e", "#302B63"]}
          style={styles.container}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen("home")}
            activeOpacity={0.8}
          >
            <BlurView intensity={20} style={styles.backButtonBlur}>
              <Text style={styles.backButtonText}>← חזרה</Text>
            </BlurView>
          </TouchableOpacity>
          
          <View style={styles.comingSoon}>
            <BlurView intensity={20} style={styles.comingSoonBlur}>
              <LinearGradient
                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                style={styles.comingSoonGradient}
              >
                <Text style={styles.comingSoonTitle}>בקרוב...</Text>
                <Text style={styles.comingSoonDesc}>
                  המסך הזה יכיל תרגולים אינטראקטיביים מתקדמים
                </Text>
              </LinearGradient>
            </BlurView>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
