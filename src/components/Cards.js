import React from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { cardStyles } from "../styles/cardStyles";

export const PokerCard = ({ card, index, cardFlipAnim }) => {
  return (
    <Animated.View 
      style={[
        cardStyles.modernCard,
        { 
          marginLeft: index > 0 ? -20 : 0,
          zIndex: index,
          transform: [
            { rotate: `${index * 3 - 1.5}deg` },
            { 
              rotateY: cardFlipAnim ? cardFlipAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "180deg"]
              }) : "0deg"
            }
          ]
        }
      ]}
    >
      <LinearGradient
        colors={["#ffffff", "#f8f9fa"]}
        style={cardStyles.cardGradient}
      >
        <BlurView intensity={5} style={cardStyles.cardBlur}>
          <View style={cardStyles.modernCardContent}>
            <View style={cardStyles.cardCorner}>
              <Text style={[
                cardStyles.modernCardRank,
                { color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529" }
              ]}>
                {card.rank}
              </Text>
              <Text style={[
                cardStyles.modernCardSuit,
                { color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529" }
              ]}>
                {card.suit}
              </Text>
            </View>
            <Text style={[
              cardStyles.cardCenterSuit,
              { color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529" }
            ]}>
              {card.suit}
            </Text>
          </View>
        </BlurView>
      </LinearGradient>
    </Animated.View>
  );
};

export const CardsDisplay = ({ cards, cardFlipAnim, title = "הקלפים שלך" }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <View style={cardStyles.modernCardsSection}>
      <Text style={cardStyles.modernSectionTitle}>{title}</Text>
      <View style={cardStyles.modernCardsContainer}>
        {cards.map((card, index) => (
          <PokerCard 
            key={index}
            card={card}
            index={index}
            cardFlipAnim={cardFlipAnim}
          />
        ))}
      </View>
    </View>
  );
};
