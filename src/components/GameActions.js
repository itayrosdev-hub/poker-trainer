import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { actionStyles } from "../styles/actionStyles";
import { POSITIONS } from "../data/pokerData";

// פונקציה להצגת הסבר על הפעולות
const showTooltip = (action, scenario) => {
  let title, message;
  
  switch(action) {
    case 'FOLD':
      title = "FOLD - זרוק";
      message = "מוותר על היד ומאבד את הכסף שכבר הושקע בפוט. זה הפעולה הבטוחה ביותר כשאין לך יד טובה.";
      break;
    case 'CALL':
      title = "CALL - שווה";
      message = `משלם ${scenario?.toCall || 0}$ כדי להישאר ביד ולראות את הקלפים הבאים. טוב כשיש לך יד סבירה אבל לא מעולה.`;
      break;
    case 'CHECK':
      title = "CHECK - בדוק";
      message = "עובר תור בלי להמר כסף נוסף. אפשרי רק כשאף אחד לא העלה לפניך.";
      break;
    case 'RAISE':
      title = "RAISE - העלה";
      message = "מעלה את ההימור כדי להפעיל לחץ על השחקנים האחרים. טוב עם ידיים חזקות או כבלאף.";
      break;
  }
  
  Alert.alert(title, message, [{ text: "הבנתי", style: "default" }]);
};

export const ActionButtons = ({ onAction, scenario, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <View style={actionStyles.modernActionsSection}>
      <Text style={actionStyles.modernActionPrompt}>How would you like to act?</Text>
      <View style={actionStyles.modernActionButtons}>
        <TouchableOpacity 
          style={actionStyles.modernActionButton}
          onPress={() => onAction("FOLD")}
          onLongPress={() => showTooltip('FOLD', scenario)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#ff6b6b", "#ee5a52"]}
            style={actionStyles.actionButtonGradient}
          >
            <BlurView intensity={10} style={actionStyles.actionButtonBlur}>
              <Text style={actionStyles.modernActionText}>FOLD</Text>
              <Text style={[actionStyles.modernActionDesc, { fontSize: 10 }]}>לחץ ארוך להסבר</Text>
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={actionStyles.modernActionButton}
          onPress={() => onAction("CALL")}
          onLongPress={() => showTooltip(scenario?.isRaised ? 'CALL' : 'CHECK', scenario)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#feca57", "#ff9ff3"]}
            style={actionStyles.actionButtonGradient}
          >
            <BlurView intensity={10} style={actionStyles.actionButtonBlur}>
              <Text style={actionStyles.modernActionText}>
                {scenario?.isRaised ? "CALL" : "CHECK"}
              </Text>
              <Text style={[actionStyles.modernActionDesc, { fontSize: 10 }]}>
                {scenario?.isRaised ? `$${scenario.toCall}` : "לחץ ארוך להסבר"}
              </Text>
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={actionStyles.modernActionButton}
          onPress={() => onAction("RAISE")}
          onLongPress={() => showTooltip('RAISE', scenario)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#26de81", "#20bf6b"]}
            style={actionStyles.actionButtonGradient}
          >
            <BlurView intensity={10} style={actionStyles.actionButtonBlur}>
              <Text style={actionStyles.modernActionText}>RAISE</Text>
              <Text style={[actionStyles.modernActionDesc, { fontSize: 10 }]}>לחץ ארוך להסבר</Text>
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ScenarioDisplay = ({ position, scenario }) => {
  if (!position || !scenario) return null;

  const positionObj = POSITIONS.find(p => p.key === position) || 
                     { key: position, name: position, color: "#ffffff" };

  return (
    <View style={actionStyles.modernScenarioSection}>
      <BlurView intensity={15} style={actionStyles.scenarioBlur}>
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
          style={actionStyles.scenarioGradient}
        >
          <Text style={actionStyles.modernScenarioTitle}>מצב השולחן</Text>
          <View style={actionStyles.scenarioDetails}>
            <View style={[actionStyles.scenarioDetail, { 
              backgroundColor: 'rgba(0,120,255,0.2)', 
              padding: 10, 
              borderRadius: 10, 
              marginBottom: 10,
              borderWidth: 2,
              borderColor: 'rgba(0,120,255,0.5)',
              flexDirection: 'column',
              alignItems: 'center'
            }]}>
              <Text style={[actionStyles.scenarioLabel, { 
                fontSize: 16, 
                fontWeight: "bold",
                textAlign: 'center',
                color: '#ffffff'
              }]}>
                🎯 אתה יושב ב: {positionObj.name} ({positionObj.key})
              </Text>
            </View>
            
            <View style={{ marginBottom: 8 }}>
              <Text style={[actionStyles.scenarioLabel, { 
                textAlign: 'right',
                fontSize: 14,
                color: '#ffffff'
              }]}>
                מצב ביד: {scenario.isRaised 
                  ? `יש העלאה של ${scenario.toCall}$` 
                  : "אין פעולות לפניך"}
              </Text>
            </View>
            
            <View style={{ marginBottom: 8 }}>
              <Text style={[actionStyles.scenarioLabel, { 
                textAlign: 'right',
                fontSize: 14,
                color: '#ffffff'
              }]}>
                סכום בפוט: ${scenario.pot}
              </Text>
            </View>
            
            {scenario.numCallers > 0 && (
              <View style={{ marginBottom: 8 }}>
                <Text style={[actionStyles.scenarioLabel, { 
                  textAlign: 'right',
                  fontSize: 14,
                  color: '#ffffff'
                }]}>
                  שחקנים שכבר שילמו: {scenario.numCallers} שחקנים
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};
