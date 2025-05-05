import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Gato = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index: number) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }; 

  return (
    <View style={styles.board}>
      {board.map((cell, index) => (
        <Pressable key={index} onPress={() => handlePress(index)} style={styles.cell}>
          <Text style={styles.cellText}>{cell}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: { flexDirection: 'row', flexWrap: 'wrap', width: 300 },
  cell: { width: 100, height: 100, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  cellText: { fontSize: 36 },
});

export default Gato;