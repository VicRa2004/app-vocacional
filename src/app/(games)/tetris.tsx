// Tetris.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Dimensiones del tablero y tamaño de cada celda
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;
const CELL_SIZE = Math.floor(Dimensions.get('window').width / BOARD_WIDTH) - 10;

// Velocidad del juego (en milisegundos)
const GAME_SPEED = 500;

// Definición de las piezas (tetrominós) con sus rotaciones y colores
type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

interface Tetromino {
  rotations: number[][][];
  color: string;
}

const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    rotations: [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
    ],
    color: '#00BCD4',
  },
  O: {
    rotations: [
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
    ],
    color: '#FFEB3B',
  },
  T: {
    rotations: [
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
    color: '#9C27B0',
  },
  S: {
    rotations: [
      [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [2, 1],
        [2, 2],
      ],
    ],
    color: '#4CAF50',
  },
  Z: {
    rotations: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
      [
        [2, 0],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
    ],
    color: '#F44336',
  },
  J: {
    rotations: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 2],
        [1, 2],
      ],
    ],
    color: '#2196F3',
  },
  L: {
    rotations: [
      [
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
    ],
    color: '#FF9800',
  },
};

// Tipos para las celdas y piezas
type Cell = string | null;

interface Piece {
  type: TetrominoType;
  rotation: number;
  x: number;
  y: number;
}

// Crea un tablero vacío
const createEmptyBoard = (): Cell[][] => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
};

// Crea una nueva pieza aleatoria
const createNewPiece = (): Piece => {
  const types: TetrominoType[] = Object.keys(TETROMINOES) as TetrominoType[];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return {
    type: randomType,
    rotation: 0,
    x: Math.floor(BOARD_WIDTH / 2) - 2,
    y: 0,
  };
};

// Obtiene las coordenadas de los bloques de la pieza
const getPieceBlocks = (piece: Piece): { x: number; y: number }[] => {
  const { type, rotation, x, y } = piece;
  const shape = TETROMINOES[type].rotations[rotation];
  return shape.map(([dx, dy]) => ({ x: x + dx, y: y + dy }));
};

// Verifica si la posición es válida
const isValidPosition = (
  piece: Piece,
  board: Cell[][],
  offsetX = 0,
  offsetY = 0,
  newRotation: number | null = null
): boolean => {
  const { type, rotation, x, y } = piece;
  const rot = newRotation !== null ? newRotation : rotation;
  const shape = TETROMINOES[type].rotations[rot];
  for (let i = 0; i < shape.length; i++) {
    const [dx, dy] = shape[i];
    const newX = x + dx + offsetX;
    const newY = y + dy + offsetY;
    if (
      newX < 0 ||
      newX >= BOARD_WIDTH ||
      newY < 0 ||
      newY >= BOARD_HEIGHT ||
      board[newY][newX]
    ) {
      return false;
    }
  }
  return true;
};

// Fusiona la pieza al tablero
const mergePieceToBoard = (piece: Piece, board: Cell[][]): Cell[][] => {
  const newBoard = board.map((row) => row.slice());
  const blocks = getPieceBlocks(piece);
  const color = TETROMINOES[piece.type].color;
  blocks.forEach(({ x, y }) => {
    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      newBoard[y][x] = color;
    }
  });
  return newBoard;
};

// Limpia las líneas completas
const clearLines = (board: Cell[][]): { board: Cell[][]; linesCleared: number } => {
  let linesCleared = 0;
  const newBoard = board.filter((row) => {
    if (row.every((cell) => cell !== null)) {
      linesCleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  return { board: newBoard, linesCleared };
};

const Tetris: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece>(createNewPiece());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      movePieceDown();
    }, GAME_SPEED);
    return () => clearInterval(interval);
  }, [currentPiece, board, gameOver]);

  const movePieceDown = () => {
    if (isValidPosition(currentPiece, board, 0, 1)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
    } else {
      const newBoard = mergePieceToBoard(currentPiece, board);
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);
      if (linesCleared > 0) {
        setScore(score + linesCleared * 100);
      }
      setBoard(clearedBoard);
      const newPiece = createNewPiece();
      if (!isValidPosition(newPiece, clearedBoard)) {
        setGameOver(true);
      } else {
        setCurrentPiece(newPiece);
      }
    }
  };

  const movePieceLeft = () => {
    if (isValidPosition(currentPiece, board, -1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  };

// Continuación del componente Tetris en TypeScript

const movePieceRight = () => {
  if (isValidPosition(currentPiece, board, 1, 0)) {
    setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
  }
};

const rotatePiece = () => {
  const newRotation = (currentPiece.rotation + 1) % TETROMINOES[currentPiece.type].rotations.length;
  if (isValidPosition(currentPiece, board, 0, 0, newRotation)) {
    setCurrentPiece({ ...currentPiece, rotation: newRotation });
  }
};

const dropPiece = () => {
  let newY = currentPiece.y;
  while (isValidPosition(currentPiece, board, 0, newY - currentPiece.y + 1)) {
    newY++;
  }
  setCurrentPiece({ ...currentPiece, y: newY });
};

const restartGame = () => {
  setBoard(createEmptyBoard());
  setCurrentPiece(createNewPiece());
  setGameOver(false);
  setScore(0);
};

// Render del tablero
const renderBoard = () => {
  const displayBoard: Cell[][] = board.map((row) => [...row]);
  const blocks = getPieceBlocks(currentPiece);
  blocks.forEach(({ x, y }) => {
    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      displayBoard[y][x] = TETROMINOES[currentPiece.type].color;
    }
  });

  return displayBoard.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: 'row' }}>
      {row.map((cell, colIndex) => (
        <View
          key={colIndex}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: cell ? cell : '#ffffff',
            borderWidth: 0.5,
            borderColor: '#ccc',
          }}
        />
      ))}
    </View>
  ));
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Tetris</Text>
    <Text style={styles.score}>Puntaje: {score}</Text>
    <View style={styles.board}>{renderBoard()}</View>
    {gameOver && <Text style={styles.gameOver}>¡Juego Terminado!</Text>}
    <View style={styles.controls}>
      <TouchableOpacity style={styles.button} onPress={movePieceLeft}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={rotatePiece}>
        <Text style={styles.buttonText}>⟳</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={movePieceRight}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={dropPiece}>
        <Text style={styles.buttonText}>↓</Text>
      </TouchableOpacity>
    </View>
    {gameOver && (
      <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
        <Text style={styles.restartText}>Reiniciar</Text>
      </TouchableOpacity>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: '#6a1b9a',
    marginBottom: 10,
  },
  board: {
    borderWidth: 2,
    borderColor: '#6a1b9a',
    backgroundColor: '#ffffff',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameOver: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
  },
  restartButton: {
    backgroundColor: '#6a1b9a',
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
  },
  restartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tetris;
 
