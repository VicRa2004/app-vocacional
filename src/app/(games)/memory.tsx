import { CARRERAS } from "@/config/carreras";
import { useJuegosStore } from "@/store/juegos-store";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";

type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameStats = {
  time: number;
  score: number;
};

const COLORS = {
  background: "#FFFFFF",
  primary: "#6A0DAD", // Morado fuerte
  secondary: "#DDA0DD", // Lavanda
  text: "#333",
  success: "#4CAF50",
  timer: "#E91E63",
};

// Calculamos el tamaño de las cartas basado en el ancho de la pantalla
const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 60) / 3; // 3 columnas con margen

const generateCards = (): CardType[] => {
  const values = ["🍎", "🍌", "🍇", "🍒", "🍊", "🍍"];
  const duplicated = [...values, ...values];
  const shuffled = duplicated
    .map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffled;
};

const calculateScore = (time: number, moves: number): number => {
  const baseScore = 1000;
  const timePenalty = time * 2;
  const movePenalty = moves * 5;
  const rawScore = Math.max(0, baseScore - timePenalty - movePenalty);

  // Convertimos el score de 0-1000 a una escala de 1-10
  const scaledScore = Math.round((rawScore / baseScore) * 9) + 1;

  // Garantizamos que el valor esté entre 1 y 10
  return Math.max(1, Math.min(10, scaledScore));
};

export const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showInitialCards, setShowInitialCards] = useState(true);

  const {agregarJuego} = useJuegosStore();

  function escalarScore(score: number, scoreMaximo = 25): number {
  if (score <= 0) return 1;

  const escalar = Math.round((score / scoreMaximo) * 10);

  // Asegurarse de que esté entre 1 y 10
  return Math.max(1, Math.min(10, escalar));
}


  const onGameSessionComplete = () => {
    const totalScore = gameStats.reduce((sum, stat) => sum + stat.score, 0);

    const score = escalarScore(totalScore); 

    agregarJuego('memory', [ CARRERAS[5], CARRERAS[1], CARRERAS[3],], score);

    // Redirige a otra pantalla, por ejemplo a 'Resultados'
    router.replace("/(preguntas)/preguntas-3");
  };

  // Inicializar el juego mostrando las cartas al principio
  useEffect(() => {
    const newCards = generateCards();
    setCards(newCards);

    // Mostrar todas las cartas al inicio
    setShowInitialCards(true);
    const flippedCards = newCards.map((card) => ({ ...card, isFlipped: true }));
    setCards(flippedCards);

    // Ocultar las cartas después de 3 segundos
    const timer = setTimeout(() => {
      setShowInitialCards(false);
      setCards(newCards.map((card) => ({ ...card, isFlipped: false })));
    }, 3000);

    return () => clearTimeout(timer);
  }, [gameCount]);

  // Temporizador
  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Lógica del juego
  useEffect(() => {
    if (selectedCards.length === 2 && !showInitialCards) {
      setMoves((prev) => prev + 1);
      const [first, second] = selectedCards;

      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, isMatched: true } : card
          )
        );
        setMatches((prev) => prev + 1);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
        }, 800);
      }
    }
  }, [selectedCards, showInitialCards]);

  // Comprobar si el juego ha terminado
  useEffect(() => {
    if (matches === cards.length / 2 && !gameCompleted && !showInitialCards) {
      setIsRunning(false);
      setGameCompleted(true);
      const score = calculateScore(time, moves);
      setGameStats((prev) => {
        const updatedStats = [...prev, { time, score }];

        // Llamar a la función si es el último juego
        if (gameCount === 2) {
          setTimeout(() => {
            onGameSessionComplete();
          }, 3000);
        }

        return updatedStats;
      });

      if (gameCount < 2) {
        setTimeout(() => {
          setGameCount((prev) => prev + 1);
          setMatches(0);
          setSelectedCards([]);
          setTime(0);
          setMoves(0);
          setIsRunning(false);
          setGameCompleted(false);
        }, 3000);
      }
    }
  }, [matches, gameCompleted, showInitialCards]);

  const handlePress = (card: CardType) => {
    if (
      showInitialCards ||
      card.isFlipped ||
      card.isMatched ||
      selectedCards.length === 2
    )
      return;

    // Iniciar el temporizador en el primer movimiento
    if (!isRunning && moves === 0) {
      setIsRunning(true);
    }

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
    setSelectedCards((prev) => [...prev, { ...card, isFlipped: true }]);
  };

  const completeSession = () => {
    setGameCount(0);
    setGameStats([]);
    setMatches(0);
    setSelectedCards([]);
    setTime(0);
    setMoves(0);
    setIsRunning(false);
    setGameCompleted(false);
    const newCards = generateCards();
    setCards(newCards);
    setShowInitialCards(true);
    const flippedCards = newCards.map((card) => ({ ...card, isFlipped: true }));
    setCards(flippedCards);
    setTimeout(() => {
      setShowInitialCards(false);
      setCards(newCards.map((card) => ({ ...card, isFlipped: false })));
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderItem = ({ item }: { item: CardType }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={[
        styles.card,
        item.isMatched && styles.matchedCard,
        (item.isFlipped || showInitialCards) && styles.flippedCard,
      ]}
      activeOpacity={0.8}
      disabled={showInitialCards}
    >
      <Text style={styles.cardText}>
        {item.isFlipped || item.isMatched || showInitialCards
          ? item.value
          : "❓"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧠 Memory Game</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Juego: {gameCount + 1}/3</Text>
        <Text style={styles.timerText}>Tiempo: {formatTime(time)}</Text>
        <Text style={styles.infoText}>Movimientos: {moves}</Text>
      </View>

      <View style={styles.gameContainer}>
        {showInitialCards && (
          <Text style={styles.memorizeText}>Memoriza las cartas...</Text>
        )}
        <FlatList
          data={cards}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.grid}
          scrollEnabled={false}
        />
      </View>

      {
        /**
         * <View style={styles.footer}>
        {gameCount === 2 && gameCompleted ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.winText}>¡Sesión completada! 🎉</Text>
            <Text style={styles.statsText}>Resultados:</Text>
            {gameStats.map((stat, index) => (
              <Text key={index} style={styles.statsText}>
                Juego {index + 1}: {formatTime(stat.time)} - Puntaje:{" "}
                {Math.round(stat.score)}
              </Text>
            ))}
            <Text style={[styles.statsText, styles.totalScore]}>
              Puntaje total:{" "}
              {Math.round(gameStats.reduce((sum, stat) => sum + stat.score, 0))}
            </Text>
            <TouchableOpacity onPress={completeSession} style={styles.button}>
              <Text style={styles.buttonText}>Nueva Sesión</Text>
            </TouchableOpacity>
          </View>
        ) : matches === cards.length / 2 && !showInitialCards ? (
          <Text style={styles.winText}>¡Felicidades! 🎉</Text>
        ) : null}
      </View>
         */
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
  },
  timerText: {
    fontSize: 16,
    color: COLORS.timer,
    fontWeight: "bold",
  },
  memorizeText: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    alignItems: "center",
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  flippedCard: {
    backgroundColor: COLORS.primary,
  },
  matchedCard: {
    backgroundColor: "#A6FFAF",
  },
  cardText: {
    fontSize: 32,
    color: COLORS.background,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  winText: {
    marginTop: 20,
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultsContainer: {
    alignItems: "center",
    width: "100%",
  },
  statsText: {
    fontSize: 16,
    color: COLORS.text,
    marginVertical: 4,
  },
  totalScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.success,
    marginTop: 10,
  },
});

export default MemoryGame;
