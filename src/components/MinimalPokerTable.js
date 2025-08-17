import React from 'react';
import { View, Text } from 'react-native';
import { minimalTableStyles } from '../styles/minimalTableStyles';
import { POSITIONS, GAME_CONFIG } from '../data/pokerData';

export const MinimalPokerTable = ({ gameState }) => {
  
  const renderPlayer = (position, index) => {
    const isActive = gameState?.position === position.key;
    const playerAction = gameState?.playerActions?.[position.key];
    
    return (
      <View 
        key={position.key} 
        style={[
          minimalTableStyles.playerPosition,
          minimalTableStyles[`position${index}`],
          isActive && minimalTableStyles.activePlayer
        ]}
      >
        <Text style={minimalTableStyles.playerText}>
          {position.key}
        </Text>
        <Text style={minimalTableStyles.playerStack}>
          ${GAME_CONFIG.defaultStack}
        </Text>
      </View>
    );
  };

  return (
    <View style={minimalTableStyles.pokerTableContainer}>
      {/* השולחן הראשי */}
      <View style={minimalTableStyles.mainTable} />
      
      {/* שחקנים סביב השולחן */}
      {POSITIONS.map((position, index) => renderPlayer(position, index))}
      
      {/* קלפי קהילה */}
      <View style={minimalTableStyles.communityCards}>
        {['2♣', '3♣', '9♦'].map((card, index) => (
          <View key={index} style={minimalTableStyles.communityCard}>
            <Text style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: card.includes('♥') || card.includes('♦') ? '#e74c3c' : '#000'
            }}>
              {card}
            </Text>
          </View>
        ))}
      </View>
      
      {/* פוט */}
      <View style={minimalTableStyles.potInfo}>
        <Text style={minimalTableStyles.potAmount}>
          ${gameState?.pot || GAME_CONFIG.getInitialPot()}
        </Text>
      </View>
    </View>
  );
};
