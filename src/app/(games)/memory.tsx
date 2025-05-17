import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';

type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const COLORS = {
  background: '#FFFFFF',
  primary: '#6A0DAD', // Morado fuerte
  secondary: '#DDA0DD', // Lavanda
  text: '#333',
};

// Calculamos el tamaño de las cartas basado en el ancho de la pantalla
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 3; // 3 columnas con margen

const generateCards = (): CardType[] => {
  const values = ['🍎', '🍌', '🍇', '🍒', '🍊', '🍍'];
  const duplicated = [...values, ...values];
  const shuffled = duplicated
    .map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);

  return shuffled;
};

export const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>(generateCards());
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      if (first.value === second.value) {
        setCards(prev =>
          prev.map(card =>
            card.value === first.value ? { ...card, isMatched: true } : card
          )
        );
        setMatches(prev => prev + 1);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
        }, 800);
      }
    }
  }, [selectedCards]);

  const handlePress = (card: CardType) => {
    if (card.isFlipped || card.isMatched || selectedCards.length === 2) return;

    setCards(prev =>
      prev.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
    setSelectedCards(prev => [...prev, { ...card, isFlipped: true }]);
  };

  const resetGame = () => {
    setCards(generateCards());
    setMatches(0);
    setSelectedCards([]);
  };

  const renderItem = ({ item }: { item: CardType }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={[
        styles.card,
        item.isMatched && styles.matchedCard,
        item.isFlipped && styles.flippedCard,
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.cardText}>
        {item.isFlipped || item.isMatched ? item.value : '❓'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧠 Memory Game</Text>
      
      <View style={styles.gameContainer}>
        <FlatList
          data={cards}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.grid}
          scrollEnabled={false} // Deshabilitamos el scroll
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={resetGame} style={styles.button}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
        {matches === cards.length / 2 && (
          <Text style={styles.winText}>¡Felicidades! 🎉</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    alignItems: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  flippedCard: {
    backgroundColor: COLORS.primary,
  },
  matchedCard: {
    backgroundColor: '#A6FFAF',
  },
  cardText: {
    fontSize: 32,
    color: COLORS.background,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  winText: {
    marginTop: 20,
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default MemoryGame;