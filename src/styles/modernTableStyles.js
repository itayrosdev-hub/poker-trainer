import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const modernTableStyles = StyleSheet.create({
  // שולחן פוקר כמו בתמונה המקורית
  pokerTableContainer: {
    height: 280,
    width: width - 20,
    marginVertical: 20,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  
  // השולחן הראשי - אליפטי ירוק כמו בתמונה
  mainTable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#0B7B3E", // ירוק פוקר כמו בתמונה
    borderRadius: width / 2,
    borderWidth: 8,
    borderColor: "#2D5A3D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  
  // שחקנים - עיגולים קטנים כמו בתמונה
  playerPosition: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
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
  
  // פוזיציות נכונות לפי כללי פוקר - 6 שחקנים
  // BTN (כפתור/דילר) - למטה מרכז
  position0: {
    bottom: 20,
    left: "50%",
    marginLeft: -30,
  },
  // SB (בליין קטן) - למטה שמאל  
  position1: {
    bottom: 20,
    left: 30,
  },
  // BB (בליין גדול) - שמאל אמצע
  position2: {
    top: "50%",
    left: 10,
    marginTop: -30,
  },
  // UTG (תחת הרובה) - למעלה שמאל
  position3: {
    top: 20,
    left: 30,
  },
  // MP (מיקום בינוני) - למעלה ימין
  position4: {
    top: 20,
    right: 30,
  },
  // CO (קאט-אוף) - ימין
  position5: {
    top: "50%",
    right: 10,
    marginTop: -30,
  },
  
  // שחקן פעיל (השחקן שלנו) - כחול כמו בתמונה
  activePlayer: {
    backgroundColor: "#2E86AB",
    borderColor: "#5DADE2",
    transform: [{ scale: 1.1 }],
  },
  
  // דילר (כפתור) - זהב
  dealerPlayer: {
    backgroundColor: "#DAA520",
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.6,
  },
  
  // בליין - צהוב
  blindPlayer: {
    backgroundColor: "#FF8C00",
    borderColor: "#FFA500",
  },
  
  // שחקן שעשה FOLD - אפור
  foldedPlayer: {
    backgroundColor: "#333",
    borderColor: "#555",
    opacity: 0.6,
  },
  
  // טקסט שחקן
  playerText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  
  // סטק של שחקן
  playerStack: {
    color: "#ccc",
    fontSize: 8,
    fontWeight: "500",
    marginTop: 1,
  },
  
  // אזור קלפי קהילה - במרכז השולחן
  communityCards: {
    position: "absolute",
    top: "35%",
    left: "50%",
    width: 180,
    height: 40,
    marginLeft: -90,
    marginTop: -20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  
  // קלף קהילה
  communityCard: {
    width: 28,
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // מידע פוט במרכז
  potInfo: {
    position: "absolute",
    top: "60%",
    left: "50%",
    width: 120,
    height: 50,
    marginLeft: -60,
    marginTop: -25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,193,7,0.9)",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFA000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  
  potLabel: {
    color: "#000",
    fontSize: 10,
    fontWeight: "700",
  },
  
  potAmount: {
    color: "#000",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
  },
  
  // תגיות פעולות כמו בתמונה
  actionBadge: {
    position: "absolute",
    top: -8,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  
  actionText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
  },
  
  // צ'יפים - קטנים ליד השחקנים
  chipStack: {
    position: "absolute",
    top: -15,
    right: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  
  chipAmount: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
  },
  
  // כפתור דילר
  dealerButton: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  
  dealerText: {
    color: "#000",
    fontSize: 8,
    fontWeight: "900",
  },

  // הדגשה נוספת לשחקן פעיל
  activePlayerGlow: {
    shadowColor: "#FFD700",
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 30,
    borderWidth: 4,
    borderColor: "#FFD700",
    transform: [{ scale: 1.2 }],
  },

  // תג מיוחד לשחקן פעיל
  activeBadge: {
    backgroundColor: "#FFD700",
    borderColor: "#FFA500",
    borderWidth: 2,
  },
});
