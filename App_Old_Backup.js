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
import { PokerTable } from "./src/components/PokerTable";
import { CardsDisplay } from "./src/components/Cards";
import { ActionButtons, ScenarioDisplay } from "./src/components/GameActions";

// Import utils
import { 
  generateRandomCards, 
  generateRandomScenario, 
  getHandStrength, 
  isDecisionCorrect, 
  getExplanation 
} from "./src/utils/gameLogic";

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
    playerBets: {},
    totalPot: 1.5
  });

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

  // יצירת תרחיש חדש
  const generateNewScenario = () => {
    const cards = generateRandomCards();
    const scenarioData = generateRandomScenario();

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

    setGameState(prev => ({
      ...prev,
      playerCards: cards,
      position: scenarioData.position,
      scenario: {
        isRaised: scenarioData.isRaised,
        numberOfCallers: scenarioData.numberOfCallers,
        raiseSize: scenarioData.raiseSize
      },
      playerActions: scenarioData.playerActions,
      playerBets: scenarioData.playerBets,
      totalPot: scenarioData.totalPot,
      feedback: null,
      showAnswer: false,
      round: prev.round + 1
    }));
  };

  // הערכת החלטה
  const evaluateDecision = (decision) => {
    const { playerCards, position } = gameState;
    const handStrength = getHandStrength(playerCards);
    const isCorrect = isDecisionCorrect(decision, handStrength, position);
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      feedback: {
        correct: isCorrect,
        explanation: getExplanation(decision, handStrength, position, isCorrect)
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
            <Text style={styles.appTitle}>🃏 POKER ACADEMY</Text>
            <Text style={styles.appSubtitle}>אקדמיית פוקר ישראל</Text>
            <Text style={styles.appDescription}>תרגלו והשתפרו באסטרטגיות פוקר מתקדמות</Text>
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
                  <Text style={styles.menuCardTitle}>תרגול Pre-Flop</Text>
                  <Text style={styles.menuCardDesc}>
                    החלטות חכמות לפני הפלופ{"\n"}
                    בהתבסס על קלפים ופוזיציה
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
              title: "תרגול Post-Flop", 
              icon: "🎯", 
              colors: ["#f093fb", "#f5576c"],
              desc: "החלטות על הפלופ, טרן וריבר"
            },
            { 
              key: "situations", 
              title: "סיטואציות שולחן", 
              icon: "🏆", 
              colors: ["#4facfe", "#00f2fe"],
              desc: "תרחישים מורכבים ותגובות"
            },
            { 
              key: "stats", 
              title: "סטטיסטיקות", 
              icon: "📊", 
              colors: ["#43e97b", "#38f9d7"],
              desc: "מעקב אחר ההתקדמות"
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
            <Text style={styles.trainingTitle}>📋 תרגול Pre-Flop</Text>
          </LinearGradient>
        </BlurView>

        {/* Stats */}
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
              </View>
            </LinearGradient>
          </BlurView>
        </View>

        {gameState.playerCards.length > 0 ? (
          <>
            {/* Poker Table */}
            <PokerTable gameState={gameState} />

            {/* Cards */}
            <CardsDisplay 
              cards={gameState.playerCards} 
              cardFlipAnim={cardFlipAnim} 
            />

            {/* Scenario Info */}
            <ScenarioDisplay 
              position={gameState.position} 
              scenario={gameState.scenario} 
            />

            {/* Action Buttons */}
            <ActionButtons 
              onAction={evaluateDecision}
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
                  נתרגל החלטות חכמות לפני הפלופ{"\n"}
                  בהתבסס על הקלפים והפוזיציה שלכם
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