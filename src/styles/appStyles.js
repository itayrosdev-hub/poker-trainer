import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1,
    paddingTop: 50,
  },
  
  // Header Styles
  headerBlur: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 25,
    overflow: "hidden",
  },
  
  headerGradient: {
    padding: 30,
    alignItems: "center",
  },
  
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 2,
  },
  
  appSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B8B8B8",
    textAlign: "center",
    marginBottom: 8,
    writingDirection: "rtl",
  },
  
  appDescription: {
    fontSize: 14,
    color: "#8E8E8E",
    textAlign: "center",
    writingDirection: "rtl",
  },

  // Menu Styles
  menuScrollView: {
    flex: 1,
  },
  
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  menuCard: {
    marginBottom: 20,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  
  menuCardGradient: {
    borderRadius: 25,
  },
  
  menuCardBlur: {
    borderRadius: 25,
    overflow: "hidden",
  },
  
  menuCardContent: {
    padding: 25,
    alignItems: "center",
  },
  
  menuCardIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  
  menuCardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    writingDirection: "rtl",
  },
  
  menuCardDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    writingDirection: "rtl",
  },
  
  menuCardButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  
  menuCardButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    writingDirection: "rtl",
  },

  // Training Screen Styles
  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
    borderRadius: 15,
    overflow: "hidden",
  },
  
  backButtonBlur: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    writingDirection: "rtl",
  },

  trainingScrollView: {
    flex: 1,
  },
  
  trainingContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  trainingHeader: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  
  trainingHeaderGradient: {
    padding: 20,
    alignItems: "center",
  },
  
  trainingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    writingDirection: "rtl",
  },

  // Stats Styles
  statsContainer: {
    marginBottom: 25,
  },
  
  statsBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  
  statsGradient: {
    padding: 20,
  },
  
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  
  statNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 5,
  },
  
  statLabel: {
    fontSize: 12,
    color: "#B8B8B8",
    fontWeight: "500",
    writingDirection: "rtl",
  },
  
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 15,
  },

  // Feedback Styles
  feedbackSection: {
    marginVertical: 25,
  },
  
  feedbackBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  
  feedbackGradient: {
    padding: 25,
  },
  
  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  
  feedbackIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  
  feedbackTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    writingDirection: "rtl",
  },
  
  feedbackText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    writingDirection: "rtl",
  },

  feedbackRecommendation: {
    fontSize: 14,
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
    writingDirection: "rtl",
  },
  
  nextButton: {
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  
  nextButtonBlur: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    writingDirection: "rtl",
  },

  // Welcome Section
  welcomeSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  
  welcomeBlur: {
    borderRadius: 25,
    overflow: "hidden",
    width: "100%",
  },
  
  welcomeGradient: {
    padding: 40,
    alignItems: "center",
  },
  
  welcomeEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
    writingDirection: "rtl",
  },
  
  welcomeDesc: {
    fontSize: 16,
    color: "#B8B8B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
    writingDirection: "rtl",
  },
  
  welcomeButton: {
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
  
  welcomeButtonGradient: {
    borderRadius: 15,
  },
  
  welcomeButtonBlur: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  
  welcomeButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    writingDirection: "rtl",
  },

  // Coming Soon Styles
  comingSoon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  
  comingSoonBlur: {
    borderRadius: 25,
    overflow: "hidden",
    width: "100%",
  },
  
  comingSoonGradient: {
    padding: 40,
    alignItems: "center",
  },
  
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 15,
  },
  
  comingSoonDesc: {
    fontSize: 16,
    color: "#B8B8B8",
    textAlign: "center",
    lineHeight: 24,
    writingDirection: "rtl",
  },
});
