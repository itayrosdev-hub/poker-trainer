import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  // Cards Section
  modernCardsSection: {
    alignItems: "center",
    marginVertical: 25,
  },
  
  modernSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 15,
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  modernCardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modernCard: {
    width: 80,
    height: 115,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  
  cardGradient: {
    flex: 1,
    borderRadius: 12,
  },
  
  cardBlur: {
    flex: 1,
    borderRadius: 12,
  },
  
  modernCardContent: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  
  cardCorner: {
    alignItems: "flex-start",
  },
  
  modernCardRank: {
    fontSize: 24,
    fontWeight: "900",
  },
  
  modernCardSuit: {
    fontSize: 20,
    marginTop: -5,
  },
  
  cardCenterSuit: {
    fontSize: 30,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  // 🎯 Hand Strength Header
  handStrengthHeader: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    minWidth: 200,
    alignItems: "center",
  },

  handStrengthText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    writingDirection: "rtl",
  },

  // 🔥 Premium Hand Glow Effects
  premiumGlow: {
    shadowColor: "#FFD700",
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 25,
  },

  strongGlow: {
    shadowColor: "#26de81",
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },

  // ✨ Premium Sparkles Effect
  premiumSparkles: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
  },

  sparkleText: {
    fontSize: 20,
    color: "#FFD700",
    textShadowColor: "rgba(255,215,0,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
