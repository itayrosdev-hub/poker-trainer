import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { POSITIONS } from "../data/pokerData";
import { tableStyles } from "../styles/tableStyles";

const { width } = Dimensions.get("window");

export const PokerTable = ({ gameState }) => {
  const renderPlayer = (pos, index) => {
    const playerAction = gameState.playerActions?.[pos.key];
    const playerBet = gameState.playerBets?.[pos.key] || 0;
    const isActivePlayer = gameState.position?.key === pos.key;
    
    return (
      <View 
        key={pos.key} 
        style={[
          tableStyles.modernPlayerPosition, 
          tableStyles[`modernPosition${index}`],
          isActivePlayer && tableStyles.modernActivePosition
        ]}
      >
        <TouchableOpacity
          style={[
            tableStyles.modernPlayerSeat,
            playerAction === "FOLD" && tableStyles.foldedPlayerSeat
          ]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isActivePlayer ? 
              [...pos.gradient, "rgba(255,215,0,0.2)"] : 
              playerAction === "FOLD" ? ["#333", "#222", "#111"] : ["#444", "#666", "#333"]}
            style={tableStyles.playerSeatGradient}
          >
            <BlurView 
              intensity={isActivePlayer ? 20 : playerAction === "FOLD" ? 3 : 8} 
              style={tableStyles.playerSeatBlur}
            >
              <Text style={[
                tableStyles.modernPositionLabel,
                playerAction === "FOLD" && tableStyles.foldedText
              ]}>
                {pos.key}
              </Text>
              <Text style={[
                tableStyles.modernStackSize,
                playerAction === "FOLD" && tableStyles.foldedText
              ]}>
                {isActivePlayer ? "100BB" : `${Math.floor(Math.random() * 50 + 50)}BB`}
              </Text>
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* סטטוס פעולת שחקן */}
        {playerAction && !isActivePlayer && (
          <View style={[
            tableStyles.playerActionBadge,
            tableStyles[`actionBadge${playerAction}`],
            {
              top: playerAction === "FOLD" ? -5 : -8,
              right: playerAction === "FOLD" ? 5 : -5
            }
          ]}>
            <Text style={[
              tableStyles.playerActionText,
              playerAction === "FOLD" && tableStyles.foldActionText
            ]}>
              {playerAction}
            </Text>
          </View>
        )}
        
        {/* ג׳יטונים */}
        {playerBet > 0 && !isActivePlayer && (
          <View style={[
            tableStyles.chipStack,
            tableStyles[`chipPosition${index}`]
          ]}>
            {Array.from({ length: Math.min(Math.ceil(playerBet / 2), 3) }, (_, chipIndex) => (
              <View 
                key={chipIndex}
                style={[
                  tableStyles.pokerChip,
                  {
                    backgroundColor: playerBet >= 5 ? "#FF6B6B" : playerBet >= 3 ? "#4ECDC4" : "#FFEAA7",
                    marginTop: chipIndex * -8,
                    zIndex: chipIndex
                  }
                ]}
              >
                <View style={tableStyles.chipInner}>
                  <Text style={tableStyles.chipValue}>{playerBet}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* דילר באטון */}
        {pos.key === "BTN" && (
          <View style={[tableStyles.dealerButton, { top: -10, right: -10 }]}>
            <Text style={tableStyles.dealerButtonText}>D</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={tableStyles.modernPokerTable}>
      {/* שכבת הבסיס */}
      <View style={tableStyles.tableOuterRing}>
        <View style={tableStyles.tableRail} />
        <View style={tableStyles.tableInnerRing} />
        {POSITIONS.map((pos, index) => (
          <View key={`chip-${pos.key}`} style={[tableStyles.chipRacks, tableStyles[`chipRack${index}`]]} />
        ))}
      </View>
      
      {/* השולחן הראשי */}
      <BlurView intensity={10} style={tableStyles.tableBlur}>
        <LinearGradient
          colors={["rgba(0,100,0,0.4)", "rgba(0,80,0,0.3)", "rgba(0,60,0,0.2)"]}
          style={tableStyles.tableGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={tableStyles.tableFeltPattern} />
          
          {/* שחקנים סביב השולחן */}
          {POSITIONS.map(renderPlayer)}
          
          {/* מרכז השולחן */}
          <View style={tableStyles.modernTableCenter}>
            <BlurView intensity={15} style={tableStyles.tableCenterBlur}>
              <LinearGradient
                colors={["rgba(255,215,0,0.4)", "rgba(255,165,0,0.3)", "rgba(218,165,32,0.2)"]}
                style={tableStyles.tableCenterGradient}
              >
                <Text style={tableStyles.modernPotLabel}>POT</Text>
                <Text style={tableStyles.modernPotAmount}>
                  {gameState.totalPot ? `${gameState.totalPot.toFixed(1)}BB` : "1.5BB"}
                </Text>
                <Text style={tableStyles.modernBlindText}>SB/BB: 0.5/1</Text>
                {Object.keys(gameState.playerActions || {}).length > 0 && (
                  <Text style={tableStyles.activePlayers}>
                    {Object.values(gameState.playerActions || {}).filter(action => action !== "FOLD").length} פעילים
                  </Text>
                )}
              </LinearGradient>
            </BlurView>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};
