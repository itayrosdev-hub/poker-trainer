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
