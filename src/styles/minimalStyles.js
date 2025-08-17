import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const minimalStyles = StyleSheet.create({
  // 🎯 שולחן פוקר מקצועי
  pokerTableContainer: {
    height: 320, // הגדלנו קצת לכל התוכן החדש
    width: width - 20,
    marginVertical: 20,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  
  // 📊 מידע משחק עליון - חדש!
  gameInfoBar: {
    position: "absolute",
    top: -45,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 10,
  },
  
  gameInfoBlur: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  
  gameInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  gameInfoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  gamePhaseText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // 🌟 השולחן הראשי משופר
  mainTable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#0B7B3E",
    borderRadius: width / 2,
    borderWidth: 8,
    borderColor: "#2D5A3D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  
  // 🎯 סימון מרכז השולחן - חדש!
  tableCenter: {
    position: "absolute",
    top: "75%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -10 }],
    width: 50,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  tableCenterText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  // 👥 שחקנים משופרים
  playerPosition: {
    position: "absolute",
    width: 65, // הגדלנו קצת
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#1a1a1a",
    borderWidth: 3,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // 🎯 פוזיציות נכונות לפי כללי פוקר
  position0: { // BTN
    bottom: 20,
    left: "50%",
    marginLeft: -32.5,
  },
  position1: { // SB
    bottom: 20,
    left: 25,
  },
  position2: { // BB
    top: "50%",
    left: 5,
    marginTop: -32.5,
  },
  position3: { // UTG
    top: 20,
    left: 25,
  },
  position4: { // MP
    top: 20,
    right: 25,
  },
  position5: { // CO
    top: "50%",
    right: 5,
    marginTop: -32.5,
  },
  
  // 🌟 שחקן פעיל משופר
  activePlayer: {
    backgroundColor: "#2E86AB",
    borderColor: "#5DADE2",
    transform: [{ scale: 1.15 }],
  },
  
  activePlayerGlow: {
    shadowColor: "#FFD700",
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 30,
    borderWidth: 4,
    borderColor: "#FFD700",
  },
  
  // ⏭️ שחקן הבא בתור - חדש!
  nextActivePlayer: {
    backgroundColor: "#3498db",
    borderColor: "#2980b9",
    transform: [{ scale: 1.05 }],
  },
  
  // 🎴 דילר משופר
  dealerPlayer: {
    backgroundColor: "#DAA520",
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.6,
  },
  
  // 👁️ בליינדים
  blindPlayer: {
    backgroundColor: "#FF8C00",
    borderColor: "#FFA500",
  },
  
  // ❌ שחקן שעשה FOLD
  foldedPlayer: {
    backgroundColor: "#333",
    borderColor: "#555",
    opacity: 0.6,
  },
  
  // 🎯 אינדיקטורים חדשים
  activeIndicator: {
    position: "absolute",
    top: -15,
    left: "50%",
    marginLeft: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  
  activeIndicatorText: {
    fontSize: 16,
    color: "#000",
  },
  
  nextIndicator: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  
  nextIndicatorText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },

  // 👤 טקסטים משופרים
  playerText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 2,
  },
  
  activePlayerText: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "900",
  },
  
  playerStack: {
    color: "#ccc",
    fontSize: 8,
    fontWeight: "500",
    marginTop: 1,
    textAlign: "center",
  },
  
  activeStackText: {
    color: "#FFD700",
    fontWeight: "bold",
  },

  // 🃏 קלפי קהילה משופרים
  communityCards: {
    position: "absolute",
    top: "25%",
    left: "50%",
    width: 200,
    height: 60,
    marginLeft: -100,
    marginTop: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  
  communityTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  
  cardsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  
  communityCard: {
    width: 32,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  // 💰 מידע פוט משופר
  potInfo: {
    position: "absolute",
    top: "55%",
    left: "50%",
    width: 140,
    height: 60,
    marginLeft: -70,
    marginTop: -30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FFA000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  
  potLabel: {
    color: "#000",
    fontSize: 11,
    fontWeight: "700",
  },
  
  potAmount: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
  },
  
  potRatio: {
    color: "#000",
    fontSize: 8,
    fontWeight: "600",
    marginTop: 1,
    opacity: 0.8,
  },

  // 🏷️ תגיות פעולות משופרות
  actionBadge: {
    position: "absolute",
    top: -12,
    left: "50%",
    marginLeft: -25,
    width: 50,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  
  foldBadge: {
    backgroundColor: "#666",
  },
  
  callBadge: {
    backgroundColor: "#f39c12",
  },
  
  raiseBadge: {
    backgroundColor: "#27ae60",
  },
  
  blindBadge: {
    backgroundColor: "#FF8C00",
  },
  
  activeBadge: {
    backgroundColor: "#FFD700",
    borderColor: "#FFA500",
    borderWidth: 2,
  },
  
  actionText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center",
  },
  
  activeActionText: {
    color: "#000",
    fontWeight: "900",
  },
  
  positionSubtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 6,
    fontWeight: "500",
    marginTop: 1,
  },

  // 💰 צ'יפים משופרים
  chipStack: {
    position: "absolute",
    top: -18,
    right: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF6B35",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  
  chipAmount: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "900",
  },

  // 🎴 כפתור דילר משופר
  dealerButton: {
    position: "absolute",
    top: -12,
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 10,
  },
  
  dealerButtonFaded: {
    opacity: 0.6,
  },
  
  dealerText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "900",
  },

  // 📜 היסטוריית פעולות - חדש!
  actionHistory: {
    position: "absolute",
    bottom: -50,
    left: 0,
    right: 0,
    height: 40,
  },
  
  historyBlur: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  
  historyTitle: {
    color: "#FFD700",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  
  historyText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "500",
  },

  // 🎯 אינדיקטור שחקן פעיל - חדש!
  activePlayerIndicator: {
    position: "absolute",
    bottom: -90,
    left: "50%",
    marginLeft: -80,
    width: 160,
    height: 30,
  },
  
  activePlayerBlur: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  activePlayerLabel: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});