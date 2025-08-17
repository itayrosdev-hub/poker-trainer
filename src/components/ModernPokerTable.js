import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernTableStyles } from '../styles/modernTableStyles';
import { POSITIONS, GAME_CONFIG } from '../data/pokerData';

export const ModernPokerTable = ({ gameState }) => {
  const renderPlayer = (position, index) => {
    const isActive = gameState?.position === position.key;
    const isDealer = position.isDealer;
    const isBlind = position.isBlind;
    const playerAction = gameState?.playerActions?.[position.key];
    
    // השחקן נחשב "מחוץ ליד" אם הוא לא פעיל ולא בליין ואין לו פעולה מוגדרת
    const isOutOfHand = !isActive && !isBlind && !playerAction;
    
    // סטיילים דינמיים לפי סטטוס השחקן
    let playerStyle = [
      modernTableStyles.playerPosition,
      modernTableStyles[`position${index}`]
    ];
    
    if (isActive) {
      playerStyle.push(modernTableStyles.activePlayer);
      playerStyle.push(modernTableStyles.activePlayerGlow);
    } else if (isDealer && !isOutOfHand && !playerAction) {
      playerStyle.push(modernTableStyles.dealerPlayer);
    } else if (isBlind && !playerAction) {
      playerStyle.push(modernTableStyles.blindPlayer);
    }
    
    // אם השחקן עשה FOLD או שהוא מחוץ ליד
    if (playerAction === 'FOLD' || isOutOfHand) {
      playerStyle.push(modernTableStyles.foldedPlayer);
    }

    return (
      <View key={position.key} style={playerStyle}>
        {/* כפתור דילר */}
        {isDealer && !isOutOfHand && !playerAction && (
          <View style={modernTableStyles.dealerButton}>
            <Text style={modernTableStyles.dealerText}>D</Text>
          </View>
        )}
        
        {/* תג פעולה - מציג תמיד משהו */}
        <View style={[
          modernTableStyles.actionBadge,
          (playerAction === 'FOLD' || isOutOfHand) && modernTableStyles.foldBadge,
          playerAction === 'CALL' && modernTableStyles.callBadge,
          playerAction === 'RAISE' && modernTableStyles.raiseBadge,
          isBlind && !playerAction && modernTableStyles.blindBadge,
          isActive && modernTableStyles.activeBadge
        ]}>
          <Text style={modernTableStyles.actionText}>
            {playerAction === 'FOLD' ? 'FOLD' : 
             playerAction === 'CALL' ? 'CALL' : 
             playerAction === 'RAISE' ? 'RAISE' :
             isBlind && !playerAction ? (position.key === 'SB' ? 'SB' : 'BB') : 
             isActive ? 'YOU' : 'FOLD'}
          </Text>
        </View>
        
        {/* מידע שחקן */}
        <Text style={[
          modernTableStyles.playerText,
          isActive && { fontSize: 12, fontWeight: "900", color: "#FFD700" }
        ]}>
          {isActive ? "🎯 אתה" : position.name.split(' ')[0]}
        </Text>
        <Text style={[
          modernTableStyles.playerStack,
          isActive && { color: "#FFD700", fontWeight: "bold" }
        ]}>
          ${GAME_CONFIG.defaultStack}
        </Text>
        
        {/* צ'יפים - רק לשחקנים שעשו פעולה או בליינדים */}
        {(playerAction === 'CALL' || playerAction === 'RAISE' || (isBlind && !playerAction)) && (
          <View style={[
            modernTableStyles.chipStack,
            { backgroundColor: isBlind ? '#FF8C00' : '#27ae60' }
          ]}>
            <Text style={modernTableStyles.chipAmount}>
              {isBlind && !playerAction ? (position.key === 'SB' ? '0.5' : '1') : 
               playerAction === 'CALL' ? '1' : '3'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={modernTableStyles.pokerTableContainer}>
      {/* השולחן הראשי */}
      <LinearGradient
        colors={["#0B7B3E", "#085C2D", "#053D1C"]}
        style={modernTableStyles.mainTable}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* שחקנים סביב השולחן */}
      {POSITIONS.map((position, index) => renderPlayer(position, index))}
      
      {/* קלפי קהילה במרכז */}
      <View style={modernTableStyles.communityCards}>
        {['A♠', 'Q♦', '6♣'].map((card, index) => (
          <View key={index} style={modernTableStyles.communityCard}>
            <Text style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: card.includes('♥') || card.includes('♦') ? '#e74c3c' : '#000'
            }}>
              {card}
            </Text>
          </View>
        ))}
      </View>
      
      {/* מידע פוט */}
      <LinearGradient
        colors={["#FFD700", "#FFA500", "#DAA520"]}
        style={modernTableStyles.potInfo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={modernTableStyles.potLabel}>פוט</Text>
        <Text style={modernTableStyles.potAmount}>
          ${gameState?.pot || GAME_CONFIG.getInitialPot()}
        </Text>
      </LinearGradient>
    </View>
  );
};
