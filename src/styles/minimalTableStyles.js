import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const minimalTableStyles = StyleSheet.create({
  // 🎯 Container עיקרי
  pokerTableContainer: {
    height: 280,
    width: width - 40,
    marginVertical: 20,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 10,
  },

  // 🟢 השולחן הראשי - אליפטי ירוק פשוט
  mainTable: {
    position: "absolute",
    width: "90%",
    height: "85%",
    left: "5%",
    top: "7.5%",
    backgroundColor: "#2d5a2d",
    borderRadius: width / 3,
    borderWidth: 2,
    borderColor: "#1a4a1a",
  },

  // 👤 שחקנים - עיגולים פשוטים ונקיים
  playerPosition: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333333",
    borderWidth: 2,
    borderColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
  },

  // 🎯 פוזיציות השחקנים - מיקום מתמטי מדויק כמו שולחן פוקר מקצועי
  // מיקומים במרווחים שווים סביב השולחן (6 שחקנים, כל 60 מעלות)
  position0: { // BTN - 6 o'clock (תחתית מרכז)
    left: "50%",
    top: "90%",
    marginLeft: -25,
    marginTop: -25,
  },
  position1: { // SB - 4 o'clock
    left: "85%",
    top: "75%",
    marginLeft: -25,
    marginTop: -25,
  },
  position2: { // BB - 2 o'clock
    left: "85%",
    top: "25%",
    marginLeft: -25,
    marginTop: -25,
  },
  position3: { // UTG - 12 o'clock (למעלה מרכז)
    left: "50%",
    top: "10%",
    marginLeft: -25,
    marginTop: -25,
  },
  position4: { // MP - 10 o'clock
    left: "15%",
    top: "25%",
    marginLeft: -25,
    marginTop: -25,
  },
  position5: { // CO - 8 o'clock
    left: "15%",
    top: "75%",
    marginLeft: -25,
    marginTop: -25,
  },

  // 🟢 שחקן פעיל
  activePlayer: {
    backgroundColor: "#4a7c4a",
    borderColor: "#66cc66",
    borderWidth: 3,
  },

  // 📝 טקסט שחקן
  playerText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },

  playerStack: {
    color: "#cccccc",
    fontSize: 8,
    fontWeight: "400",
    marginTop: 2,
    textAlign: "center",
  },

  // 🃏 קלפי קהילה - בשורה אופקית!
  communityCards: {
    position: "absolute",
    top: "35%",
    left: "50%",
    width: 120,
    height: 30,
    marginLeft: -60,
    marginTop: -15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  communityCard: {
    width: 28,
    height: 36,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
  },

  // 💰 פוט
  potInfo: {
    position: "absolute",
    top: "65%",
    left: "50%",
    width: 80,
    height: 30,
    marginLeft: -40,
    marginTop: -15,
    backgroundColor: "#ffa500",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  potAmount: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "900",
  },

  // 🎮 כפתורי פעולה מינימליסטיים
  minimalActionsSection: {
    marginVertical: 20,
  },

  minimalActionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  minimalActionButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  checkButton: {
    backgroundColor: "#4a7c4a",
  },

  betButton: {
    backgroundColor: "#cc4444",
  },

  foldButton: {
    backgroundColor: "#666666",
  },

  minimalButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  minimalButtonSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2,
    textAlign: "center",
  },

  // 🃏 קלפים מינימליסטיים
  minimalCardsSection: {
    alignItems: "center",
    marginVertical: 15,
  },

  minimalCardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  minimalCard: {
    width: 40,
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dddddd",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 3,
  },

  minimalCardRank: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  minimalCardSuit: {
    fontSize: 14,
    textAlign: "center",
  },

  // 🎯 הודעת עזרה מינימליסטית
  minimalAdviceContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  minimalAdviceText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#ffffff",
  },
});
