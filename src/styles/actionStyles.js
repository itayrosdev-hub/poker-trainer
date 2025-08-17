import { StyleSheet } from "react-native";

export const actionStyles = StyleSheet.create({
  // Action Buttons
  modernActionsSection: {
    marginVertical: 25,
  },
  
  modernActionPrompt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  modernActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  
  modernActionButton: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  
  actionButtonGradient: {
    flex: 1,
    borderRadius: 15,
  },
  
  actionButtonBlur: {
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  
  modernActionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "center",
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  modernActionDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    writingDirection: "rtl",
  },

  // 🎯 Subtext for clean action buttons
  modernActionSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    writingDirection: "rtl",
    marginTop: 2,
  },

  // 🎯 Hand Advice Styles
  handAdviceContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "rgba(255,215,0,0.3)",
  },

  handAdviceText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
  },

  // 🚫 Disabled Button Styles
  disabledButton: {
    opacity: 0.5,
  },

  disabledText: {
    color: "rgba(255,255,255,0.5)",
  },

  // ⭐ Recommended Button Styles
  recommendedButton: {
    transform: [{ scale: 1.05 }],
    shadowColor: "#FFD700",
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },

  recommendedText: {
    color: "#000",
    fontWeight: "900",
    textShadowColor: "rgba(255,215,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Scenario Display
  modernScenarioSection: {
    marginVertical: 20,
  },
  
  scenarioBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  
  scenarioGradient: {
    padding: 20,
  },
  
  modernScenarioTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 15,
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  scenarioDetails: {
    gap: 10,
  },
  
  scenarioDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  scenarioLabel: {
    fontSize: 14,
    color: "#B8B8B8",
    fontWeight: "500",
    textAlign: "center",
    writingDirection: "rtl",
  },
  
  scenarioValue: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    writingDirection: "rtl",
  },
});
