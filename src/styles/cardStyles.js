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
});
