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
          marginLeft: index > 0 ? -25 : 0, // החפיפה הגדולה יותר נשארת
          zIndex: index,
          transform: [
            { rotate: `${index * 4 - 2}deg` }, // הסיבוב הגדול יותר נשאר
            { 
              rotateY: cardFlipAnim ? cardFlipAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "180deg"]
              }) : "0deg"
            },
            { scale: 1.2 } // הקלפים הגדולים נשארים!
          ]
        }
      ]}
    >
      <LinearGradient
        colors={["#ffffff", "#f8f9fa"]} // צבע קבוע לכל הקלפים
        style={cardStyles.cardGradient}
      >
        <BlurView intensity={5} style={cardStyles.cardBlur}>
          <View style={cardStyles.modernCardContent}>
            <View style={cardStyles.cardCorner}>
              <Text style={[
                cardStyles.modernCardRank,
                { 
                  color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529",
                  fontSize: 20 // גודל קבוע לכל הקלפים
                }
              ]}>
                {card.rank}
              </Text>
              <Text style={[
                cardStyles.modernCardSuit,
                { 
                  color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529",
                  fontSize: 16 // גודל קבוע לכל הקלפים
                }
              ]}>
                {card.suit}
              </Text>
            </View>
            <Text style={[
              cardStyles.cardCenterSuit,
              { 
                color: ["♥", "♦"].includes(card.suit) ? "#dc3545" : "#212529",
                fontSize: 28 // גודל קבוע לכל הקלפים
              }
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
      {/* כותרת נקייה ללא רמזים */}
      <View style={cardStyles.handStrengthHeader}>
        <Text style={cardStyles.modernSectionTitle}>
          {title}
        </Text>
      </View>

      {/* מכלול קלפים ללא הדגשות חושפניות */}
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