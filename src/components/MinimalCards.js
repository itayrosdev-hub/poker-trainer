import React from "react";
import { View, Text } from "react-native";
import { minimalTableStyles } from "../styles/minimalTableStyles";

export const MinimalCardsDisplay = ({ cards, title = "הקלפים שלך" }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <View style={minimalTableStyles.minimalCardsSection}>
      <View style={minimalTableStyles.minimalCardsContainer}>
        {cards.map((card, index) => (
          <View key={index} style={minimalTableStyles.minimalCard}>
            <Text style={[
              minimalTableStyles.minimalCardRank,
              { color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529" }
            ]}>
              {card.rank}
            </Text>
            <Text style={[
              minimalTableStyles.minimalCardSuit,
              { color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529" }
            ]}>
              {card.suit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
