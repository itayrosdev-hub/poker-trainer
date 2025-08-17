import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { minimalTableStyles } from "../styles/minimalTableStyles";

export const MinimalActionButtons = ({ onAction, scenario, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <View style={minimalTableStyles.minimalActionsSection}>
      {/* הודעה מינימליסטית */}
      <View style={minimalTableStyles.minimalAdviceContainer}>
        <Text style={minimalTableStyles.minimalAdviceText}>
          🤔 נתח את המצב והחלט בעצמך
        </Text>
      </View>
      
      <View style={minimalTableStyles.minimalActionButtons}>
        {/* כפתור CHECK/FOLD */}
        <TouchableOpacity 
          style={[
            minimalTableStyles.minimalActionButton, 
            scenario?.isRaised ? minimalTableStyles.foldButton : minimalTableStyles.checkButton
          ]}
          onPress={() => onAction(scenario?.isRaised ? "FOLD" : "CALL")}
          activeOpacity={0.8}
        >
          <Text style={minimalTableStyles.minimalButtonText}>
            {scenario?.isRaised ? "FOLD" : "CHECK"}
          </Text>
          <Text style={minimalTableStyles.minimalButtonSubtext}>
            {scenario?.isRaised ? "זרוק" : "בדוק"}
          </Text>
        </TouchableOpacity>
        
        {/* כפתור BET */}
        <TouchableOpacity 
          style={[minimalTableStyles.minimalActionButton, minimalTableStyles.betButton]}
          onPress={() => onAction("RAISE")}
          activeOpacity={0.8}
        >
          <Text style={minimalTableStyles.minimalButtonText}>
            {scenario?.isRaised ? "CALL" : "BET"}
          </Text>
          <Text style={minimalTableStyles.minimalButtonSubtext}>
            ${scenario?.toCall || 2}
          </Text>
        </TouchableOpacity>
        
        {/* כפתור BET גדול */}
        <TouchableOpacity 
          style={[minimalTableStyles.minimalActionButton, minimalTableStyles.betButton]}
          onPress={() => onAction("RAISE")}
          activeOpacity={0.8}
        >
          <Text style={minimalTableStyles.minimalButtonText}>BET</Text>
          <Text style={minimalTableStyles.minimalButtonSubtext}>
            ${(scenario?.toCall || 2) * 2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
