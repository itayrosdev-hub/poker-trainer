import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernTableStyles } from '../styles/modernTableStyles';
import { POSITIONS, GAME_CONFIG } from '../data/pokerData';

export const ModernPokerTable = ({ gameState }) => {
  
  // 🎯 חישוב נתונים מתקדמים
  const blindInfo = {
    smallBlind: 1,
    bigBlind: 2,
    currentLevel: "Level 1"
  };
  
  const gamePhase = gameState?.scenario?.phase || 'pre-flop';
  const handNumber = gameState?.round || 1;
  
  // 📊 היסטוריית פעולות השחקנים
  const getActionHistory = () => {
    // אם יש היסטוריה מהתרחיש החדש
    if (gameState?.scenario?.actions && gameState.scenario.actions.length > 0) {
      return gameState.scenario.actions.join(' → ');
    }
    
    // אם לא, צור היסטוריה מהמידע הקיים
    const actions = [];
    POSITIONS.forEach(pos => {
      const action = gameState?.playerActions?.[pos.key];
      if (action) {
        actions.push(`${pos.key}: ${action}`);
      }
    });
    
    return actions.length > 0 ? actions.join(' → ') : 
           gameState?.scenario?.isRaised ? "יש העלאה" : "אין פעולות עדיין";
  };

  // 🎯 קביעת השחקן הפעיל הבא
  const getNextActivePlayer = () => {
    if (!gameState?.position) return null;
    
    const currentIndex = POSITIONS.findIndex(p => p.key === gameState.position);
    const nextIndex = (currentIndex + 1) % POSITIONS.length;
    return POSITIONS[nextIndex];
  };

  const renderPlayer = (position, index) => {
    const isActivePlayer = gameState?.position === position.key;
    const isNextActive = getNextActivePlayer()?.key === position.key;
    const isDealer = position.isDealer;
    const isBlind = position.isBlind;
    const playerAction = gameState?.playerActions?.[position.key];
    
    // 🎨 סטיילים דינמיים מתקדמים
    let playerStyle = [
      modernTableStyles.playerPosition,
      modernTableStyles[`position${index}`]
    ];
    
    // 🌟 השחקן הפעיל עכשיו
    if (isActivePlayer) {
      playerStyle.push(modernTableStyles.activePlayer);
      playerStyle.push(modernTableStyles.activePlayerGlow);
    }
    // ⏭️ השחקן הבא בתור
    else if (isNextActive && !playerAction) {
      playerStyle.push(modernTableStyles.nextActivePlayer);
    }
    // 🎴 דילר
    else if (isDealer && !playerAction) {
      playerStyle.push(modernTableStyles.dealerPlayer);
    }
    // 👁️ בליינדים
    else if (isBlind && !playerAction) {
      playerStyle.push(modernTableStyles.blindPlayer);
    }
    
    // ❌ שחקן שעשה FOLD
    if (playerAction === 'FOLD') {
      playerStyle.push(modernTableStyles.foldedPlayer);
    }

    return (
      <View key={position.key} style={playerStyle}>
        {/* 🎯 אינדיקטור תור פעיל */}
        {isActivePlayer && (
          <View style={modernTableStyles.activeIndicator}>
            <Text style={modernTableStyles.activeIndicatorText}>⚡</Text>
          </View>
        )}
        
        {/* ⏭️ אינדיקטור תור הבא */}
        {isNextActive && !playerAction && !isActivePlayer && (
          <View style={modernTableStyles.nextIndicator}>
            <Text style={modernTableStyles.nextIndicatorText}>→</Text>
          </View>
        )}
        
        {/* 🎴 כפתור דילר משופר */}
        {isDealer && (
          <View style={[
            modernTableStyles.dealerButton,
            playerAction === 'FOLD' && modernTableStyles.dealerButtonFaded
          ]}>
            <Text style={modernTableStyles.dealerText}>D</Text>
          </View>
        )}
        
        {/* 🏷️ תג פעולה משופר */}
        <View style={[
          modernTableStyles.actionBadge,
          playerAction === 'FOLD' && modernTableStyles.foldBadge,
          playerAction === 'CALL' && modernTableStyles.callBadge,
          playerAction === 'RAISE' && modernTableStyles.raiseBadge,
          isBlind && !playerAction && modernTableStyles.blindBadge,
          isActivePlayer && modernTableStyles.activeBadge
        ]}>
          <Text style={[
            modernTableStyles.actionText,
            isActivePlayer && modernTableStyles.activeActionText
          ]}>
            {playerAction === 'FOLD' ? 'FOLD' : 
             playerAction === 'CALL' ? 'CALL' : 
             playerAction === 'RAISE' ? 'RAISE' :
             isBlind && !playerAction ? (position.key === 'SB' ? 'SB' : 'BB') : 
             isActivePlayer ? 'YOU' : '---'}
          </Text>
          
          {/* 📍 תת-כותרת למיקום */}
          <Text style={modernTableStyles.positionSubtext}>
            {position.shortName || position.key}
          </Text>
        </View>
        
        {/* 👤 מידע שחקן משופר */}
        <Text style={[
          modernTableStyles.playerText,
          isActivePlayer && modernTableStyles.activePlayerText
        ]}>
          {isActivePlayer ? "🎯 אתה" : position.name}
        </Text>
        <Text style={[
          modernTableStyles.playerStack,
          isActivePlayer && modernTableStyles.activeStackText
        ]}>
          ${GAME_CONFIG.defaultStack}
        </Text>
        
        {/* 💰 צ'יפים מתקדמים */}
        {(playerAction === 'CALL' || playerAction === 'RAISE' || (isBlind && !playerAction)) && (
          <View style={[
            modernTableStyles.chipStack,
            { 
              backgroundColor: isBlind ? '#FF8C00' : 
                              playerAction === 'CALL' ? '#27ae60' : 
                              playerAction === 'RAISE' ? '#e74c3c' : '#FF8C00'
            }
          ]}>
            <Text style={modernTableStyles.chipAmount}>
              ${isBlind && !playerAction ? (position.key === 'SB' ? blindInfo.smallBlind : blindInfo.bigBlind) : 
               playerAction === 'CALL' ? blindInfo.bigBlind : 
               playerAction === 'RAISE' ? blindInfo.bigBlind * 3 : blindInfo.bigBlind}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={modernTableStyles.pokerTableContainer}>
      {/* 📊 מידע משחק עליון */}
      <View style={modernTableStyles.gameInfoBar}>
        <BlurView intensity={20} style={modernTableStyles.gameInfoBlur}>
          <View style={modernTableStyles.gameInfoContent}>
            <Text style={modernTableStyles.gameInfoText}>
              🎰 יד #{handNumber} | 👁️ {blindInfo.currentLevel} | 💰 SB${blindInfo.smallBlind}/BB${blindInfo.bigBlind}
            </Text>
            <Text style={modernTableStyles.gamePhaseText}>
              📍 {gamePhase === 'pre-flop' ? 'לפני הפלופ' : 
                   gamePhase === 'flop' ? 'פלופ' : 
                   gamePhase === 'turn' ? 'טרן' : 'ריבר'}
            </Text>
          </View>
        </BlurView>
      </View>

      {/* 🌟 השולחן הראשי משופר */}
      <LinearGradient
        colors={["#0B7B3E", "#085C2D", "#053D1C"]}
        style={modernTableStyles.mainTable}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* 🎯 סימון מרכז השולחן */}
        <View style={modernTableStyles.tableCenter}>
          <Text style={modernTableStyles.tableCenterText}>POKER</Text>
        </View>
      </LinearGradient>
      
      {/* 👥 שחקנים סביב השולחן */}
      {POSITIONS.map((position, index) => renderPlayer(position, index))}
      
      {/* 🃏 קלפי קהילה משופרים */}
      <View style={modernTableStyles.communityCards}>
        <Text style={modernTableStyles.communityTitle}>
          {gamePhase === 'pre-flop' ? 'מחכה לפלופ...' : 'קלפי קהילה'}
        </Text>
        <View style={modernTableStyles.cardsRow}>
          {gamePhase !== 'pre-flop' && ['A♠', 'Q♦', '6♣'].map((card, index) => (
            <LinearGradient
              key={index}
              colors={['#ffffff', '#f8f9fa']}
              style={modernTableStyles.communityCard}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: card.includes('♥') || card.includes('♦') ? '#e74c3c' : '#2c3e50'
              }}>
                {card}
              </Text>
            </LinearGradient>
          ))}
        </View>
      </View>
      
      {/* 💰 מידע פוט משופר */}
      <LinearGradient
        colors={["#FFD700", "#FFA500", "#DAA520"]}
        style={modernTableStyles.potInfo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={modernTableStyles.potLabel}>💰 פוט</Text>
        <Text style={modernTableStyles.potAmount}>
          ${gameState?.pot || GAME_CONFIG.getInitialPot()}
        </Text>
        
        {/* 📈 יחס פוט לסטק */}
        <Text style={modernTableStyles.potRatio}>
          {((gameState?.pot || GAME_CONFIG.getInitialPot()) / GAME_CONFIG.defaultStack * 100).toFixed(1)}% מהסטק
        </Text>
      </LinearGradient>
      
      {/* 📜 היסטוריית פעולות */}
      {getActionHistory() && (
        <View style={modernTableStyles.actionHistory}>
          <BlurView intensity={15} style={modernTableStyles.historyBlur}>
            <Text style={modernTableStyles.historyTitle}>📜 פעולות:</Text>
            <Text style={modernTableStyles.historyText}>
              {getActionHistory() || "אין פעולות עדיין"}
            </Text>
          </BlurView>
        </View>
      )}

      {/* 🎯 אינדיקטור שחקן פעיל */}
      {gameState?.position && (
        <View style={modernTableStyles.activePlayerIndicator}>
          <BlurView intensity={20} style={modernTableStyles.activePlayerBlur}>
            <Text style={modernTableStyles.activePlayerLabel}>
              🎯 התור שלך לפעול!
            </Text>
          </BlurView>
        </View>
      )}
    </View>
  );
};