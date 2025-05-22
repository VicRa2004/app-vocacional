import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import {useJuegosStore} from '@/store/juegos-store'
import { CARRERAS } from "@/config/carreras";
import { router } from "expo-router";

const Gato = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Jugador = 'X'
  const [score, setScore] = useState({ player: 0, pc: 0, ties: 0 });
  const [rounds, setRounds] = useState(0);

  const {agregarJuego} = useJuegosStore();

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columnas
    [0, 4, 8],
    [2, 4, 6], // diagonales
  ];

  const checkWinner = (newBoard: string[]) => {
    for (let [a, b, c] of winningCombinations) {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return newBoard.includes(null) ? null : "Tie";
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleEndGame = (winner: string | null) => {
    setRounds((prev) => prev + 1);

    if (winner === "X") {
      setScore((s) => ({ ...s, player: s.player + 1 }));
    } else if (winner === "O") {
      setScore((s) => ({ ...s, pc: s.pc + 1 }));
    } else if (winner === "Tie") {
      setScore((s) => ({ ...s, ties: s.ties + 1 }));
    }

    if (rounds + 1 >= 3) {
      Alert.alert(
        "Resultado Final",
        `Jugador: ${score.player + (winner === "X" ? 1 : 0)}\nPC: ${
          score.pc + (winner === "O" ? 1 : 0)
        }\nEmpates: ${score.ties + (winner === "Tie" ? 1 : 0)}`
      );

      agregarJuego('gato', [CARRERAS[7], CARRERAS[8], CARRERAS[9]],score.player);

      router.replace('/(preguntas)/preguntas-2');
    }

    setTimeout(resetBoard, 1000);
  };

  const handlePress = (index: number) => {
    if (board[index] || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const makeComputerMove = (newBoard: string[]) => {
    const emptyIndices = newBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter((i) => i !== null) as number[];
    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = "O";
    setBoard([...newBoard]);
    setIsXNext(true);
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      handleEndGame(winner);
    } else if (!isXNext) {
      setTimeout(() => makeComputerMove([...board]), 500);
    }
  }, [board, isXNext]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gato 🐾 vs PC 🤖</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={({ pressed }) => [
              styles.cell,
              {
                backgroundColor:
                  cell === "X" ? "#a0e7e5" : cell === "O" ? "#ffb3c1" : "#fff",
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.cellText,
                { color: cell === "X" ? "#0077b6" : "#d62828" },
              ]}
            >
              {cell}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Jugador (X): {score.player}</Text>
        <Text style={styles.scoreText}>PC (O): {score.pc}</Text>
        <Text style={styles.scoreText}>Empates: {score.ties}</Text>
        <Text style={styles.round}>Partida #{rounds + 1}/3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#f7f7f7",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 310,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: { fontSize: 42, fontWeight: "bold" },
  scoreBox: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 10,
    width: "90%",
  },
  scoreText: { fontSize: 18, fontWeight: "500", marginVertical: 2 },
  round: { fontSize: 16, fontStyle: "italic", marginTop: 10 },
});

export default Gato;
