import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const tableStyles = StyleSheet.create({
  // שולחן פוקר מאוזן ומקצועי
  modernPokerTable: {
    height: 220,                    // גובה קטן ומאוזן יותר
    width: width - 40,              // רוחב מאוזן עם מרווחים
    marginVertical: 15,             // מרווח קטן יותר
    alignSelf: "center",
    position: "relative",
    // צללים עדינים יותר
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  
  // שכבת בסיס מאוזנת
  tableOuterRing: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 110,              // רדיוס מותאם לגובה החדש
    borderWidth: 4,                 // גבול דק יותר
    borderColor: "#8B4513",         // חום עץ סטנדרטי
    backgroundColor: "rgba(139,69,19,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  
  // השולחן הפנימי מאוזן
  tableBlur: {
    width: "90%",
    height: "85%",
    alignSelf: "center",
    marginTop: "7.5%",
    borderRadius: 95,               // רדיוס קטן ומאוזן
    overflow: "hidden",
    borderWidth: 2,                 // גבול דק יותר
    borderColor: "rgba(255,215,0,0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  tableGradient: {
    flex: 1,
    position: "relative",
    borderRadius: 95,
    borderWidth: 1,
    borderColor: "rgba(0,100,0,0.3)",
  },
  
  tableFeltPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 95,
    opacity: 0.1,
    backgroundColor: "rgba(0,100,0,0.2)",
  },
  
  // רינג פנימי עדין
  tableInnerRing: {
    position: "absolute",
    width: "80%",
    height: "75%",
    alignSelf: "center",
    marginTop: "12.5%",
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.2)",
    backgroundColor: "transparent",
  },
  
  // פוזיציות שחקנים קטנות ומאוזנות
  modernPlayerPosition: {
    position: "absolute",
    width: 65,                    // קטן הרבה יותר
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // פוזיציות מאוזנות סביב השולחן הקטן
  modernPosition0: { // UTG - למעלה
    top: 8,
    left: "50%",
    marginLeft: -32.5,
  },
  modernPosition1: { // MP - ימין-למעלה
    top: "20%",
    right: 12,
    marginTop: -32.5,
  },
  modernPosition2: { // CO - ימין-למטה
    bottom: "20%",
    right: 12,
    marginBottom: -32.5,
  },
  modernPosition3: { // BTN - למטה
    bottom: 8,
    left: "50%",
    marginLeft: -32.5,
  },
  modernPosition4: { // SB - שמאל-למטה
    bottom: "20%",
    left: 12,
    marginBottom: -32.5,
  },
  modernPosition5: { // BB - שמאל-למעלה
    top: "20%",
    left: 12,
    marginTop: -32.5,
  },
  
  // עיצוב כיסא שחקן מאוזן
  modernPlayerSeat: {
    width: 65,                    // גודל מאוזן
    height: 65,
    borderRadius: 32.5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,               // גבול דק יותר
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  
  modernActivePosition: {
    transform: [{ scale: 1.1 }],  // הגדלה עדינה יותר
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 3,               // גבול מאוזן
    borderColor: "rgba(255,215,0,0.4)",
  },
  
  playerSeatGradient: {
    flex: 1,
    borderRadius: 32.5,
    padding: 1,
  },
  
  playerSeatBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  
  // תוויות פוזיציות מאוזנות
  modernPositionLabel: {
    color: "#ffffff",
    fontSize: 12,                 // קטן יותר ומאוזן
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  
  modernStackSize: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 9,                  // קטן יותר ומאוזן
    fontWeight: "600",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
  
  // דילר באטון מאוזן
  dealerButton: {
    position: "absolute",
    width: 20,                    // קטן ומאוזן
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  
  dealerButtonText: {
    color: "#000",
    fontSize: 10,                 // קטן ומאוזן
    fontWeight: "800",
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  
  // מרכז השולחן מאוזן
  modernTableCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 100,                   // קטן ומאוזן
    height: 65,                   // יחס מאוזן
    marginTop: -32.5,
    marginLeft: -50,
    borderRadius: 32.5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: "rgba(255,215,0,0.5)",
    backgroundColor: "rgba(255,215,0,0.05)",
  },
  
  tableCenterBlur: {
    flex: 1,
    borderRadius: 32.5,
  },
  
  tableCenterGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32.5,
    padding: 3,
  },
  
  // פוט ומידע מאוזנים
  modernPotLabel: {
    color: "#FFD700",
    fontSize: 10,                // קטן ומאוזן
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  
  modernPotAmount: {
    color: "#ffffff",
    fontSize: 14,                // קטן ומאוזן
    fontWeight: "800",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  
  modernBlindText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 8,                 // קטן ומאוזן
    fontWeight: "600",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
  
  activePlayers: {
    color: "rgba(255,215,0,0.8)",
    fontSize: 8,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  // אלמנטים דקורטיביים
  tableRail: {
    position: "absolute",
    width: "95%",
    height: "90%",
    alignSelf: "center",
    marginTop: "5%",
    borderRadius: 125,
    borderWidth: 2,
    borderColor: "rgba(139,69,19,0.4)",
    backgroundColor: "transparent",
  },
  
  chipRacks: {
    position: "absolute",
    width: 16,                    // קטן ומאוזן
    height: 28,                   // קטן ומאוזן
    backgroundColor: "rgba(139,69,19,0.6)",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // מקומות צ׳יפים מאוזנים
  chipRack0: { top: 45, left: "50%", marginLeft: -8 },
  chipRack1: { top: 65, right: 55 },
  chipRack2: { bottom: 65, right: 55 },
  chipRack3: { bottom: 45, left: "50%", marginLeft: -8 },
  chipRack4: { bottom: 65, left: 55 },
  chipRack5: { top: 65, left: 55 },
  
  // סטטוס שחקן
  foldedPlayerSeat: {
    opacity: 0.4,
    transform: [{ scale: 0.9 }],
  },
  
  foldedText: {
    opacity: 0.5,
  },
  
  // תגית פעולת שחקן
  playerActionBadge: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 10,
  },
  
  actionBadgeFOLD: {
    backgroundColor: "#e74c3c",
    borderWidth: 1,
    borderColor: "#c0392b",
  },
  
  actionBadgeCALL: {
    backgroundColor: "#f39c12",
    borderWidth: 1,
    borderColor: "#e67e22",
  },
  
  actionBadgeRAISE: {
    backgroundColor: "#27ae60",
    borderWidth: 1,
    borderColor: "#229954",
  },
  
  actionBadgeCHECK: {
    backgroundColor: "#3498db",
    borderWidth: 1,
    borderColor: "#2980b9",
  },
  
  playerActionText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  foldActionText: {
    fontSize: 8,
  },
  
  // צ׳יפים ויזואליים
  chipStack: {
    position: "absolute",
    alignItems: "center",
    zIndex: 5,
  },
  
  // מיקומי צ׳יפים מאוזנים
  chipPosition0: { // UTG
    bottom: "70%",
    left: "50%", 
    marginLeft: -12
  },  
  chipPosition1: { // MP
    top: "55%",
    right: 75,
    marginTop: -12
  },  
  chipPosition2: { // CO
    top: "30%",
    right: 75,
    marginTop: -12
  },  
  chipPosition3: { // BTN
    top: "70%",
    left: "50%",
    marginLeft: -12
  },  
  chipPosition4: { // SB
    top: "30%",
    left: 75,
    marginTop: -12
  },  
  chipPosition5: { // BB
    top: "55%",
    left: 75,
    marginTop: -12
  },
  
  pokerChip: {
    width: 24,                    // קטן ומאוזן
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  
  chipInner: {
    width: 16,                    // קטן ומאוזן
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  
  chipValue: {
    color: "#ffffff",
    fontSize: 6,                  // קטן ומאוזן
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
});
