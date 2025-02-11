import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Dimensiones del tablero y tamaño de cada celda (en píxeles)
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

// Velocidad del juego (en milisegundos)
const GAME_SPEED = 200;

// Definición de las piezas (tetrominós) con sus rotaciones y colores
const TETROMINOES = {
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
    color: "cyan",
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
    color: "yellow",
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
    color: "purple",
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
    color: "green",
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
    color: "red",
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
    color: "blue",
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
    color: "orange",
  },
};

// Crea un tablero vacío (matriz de BOARD_HEIGHT x BOARD_WIDTH con celdas nulas)
const createEmptyBoard = (): (string | null)[][] => {
  const board: (string | null)[][] = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    board.push(Array(BOARD_WIDTH).fill(null));
  }
  return board;
};

// Crea una nueva pieza aleatoria
const createNewPiece = () => {
  const types = Object.keys(TETROMINOES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  return {
    type: randomType,
    rotation: 0,
    // Posición inicial: centrada en el ancho del tablero
    x: Math.floor(BOARD_WIDTH / 2) - 2,
    y: 0,
  };
};

// Devuelve las coordenadas absolutas de los bloques de la pieza en el tablero
const getPieceBlocks = (piece: any) => {
  const { type, rotation, x, y } = piece;
  const shape = TETROMINOES[type].rotations[rotation];
  return shape.map(([dx, dy]) => ({ x: x + dx, y: y + dy }));
};

// Verifica si la pieza (con un posible desplazamiento o rotación) está en una posición válida
const isValidPosition = (
  piece: any,
  board: (string | null)[][],
  offsetX = 0,
  offsetY = 0,
  newRotation: number | null = null
) => {
  const { type, rotation, x, y } = piece;
  const rot = newRotation !== null ? newRotation : rotation;
  const shape = TETROMINOES[type].rotations[rot];
  for (let i = 0; i < shape.length; i++) {
    const [dx, dy] = shape[i];
    const newX = x + dx + offsetX;
    const newY = y + dy + offsetY;
    // Verifica límites laterales y verticales
    if (newX < 0 || newX >= BOARD_WIDTH || newY < 0 || newY >= BOARD_HEIGHT) {
      return false;
    }
    // Verifica colisión con bloques fijos en el tablero
    if (board[newY][newX]) {
      return false;
    }
  }
  return true;
};

// Fusiona la pieza actual en el tablero, fijándola
const mergePieceToBoard = (piece: any, board: (string | null)[][]) => {
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

// Limpia las líneas completas y devuelve el nuevo tablero y cantidad de líneas eliminadas
const clearLines = (board: (string | null)[][]) => {
  let linesCleared = 0;
  const newBoard = board.filter((row) => {
    if (row.every((cell) => cell !== null)) {
      linesCleared++;
      return false;
    }
    return true;
  });
  // Añade filas vacías arriba para mantener el tamaño del tablero
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  return { board: newBoard, linesCleared };
};

const Tetris = () => {
  const [board, setBoard] = useState<(string | null)[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(createNewPiece());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Función que se ejecuta al perder el juego
  const onGameOver = () => {
    console.log(`Game Over! Score: ${score}`);
    // Aquí puedes agregar más lógica para manejar el fin del juego
  };

  // Bucle del juego: mueve la pieza hacia abajo cada GAME_SPEED ms
  useEffect(() => {
    if (gameOver) {
      onGameOver();
      return;
    }
    const interval = setInterval(() => {
      movePieceDown();
    }, GAME_SPEED);
    return () => clearInterval(interval);
  }, [currentPiece, board, gameOver]);

  // Mueve la pieza hacia abajo; si no puede, la fija y crea una nueva
  const movePieceDown = () => {
    if (isValidPosition(currentPiece, board, 0, 1)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
    } else {
      // Fusiona la pieza actual al tablero
      const newBoard = mergePieceToBoard(currentPiece, board);
      // Limpia líneas completas
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);
      if (linesCleared > 0) {
        setScore(score + linesCleared * 100);
      }
      setBoard(clearedBoard);
      // Crea una nueva pieza
      const newPiece = createNewPiece();
      // Si la nueva pieza no puede colocarse, termina el juego
      if (!isValidPosition(newPiece, clearedBoard, 0, 0)) {
        setGameOver(true);
      } else {
        setCurrentPiece(newPiece);
      }
    }
  };

  // Mueve la pieza a la izquierda
  const movePieceLeft = () => {
    if (isValidPosition(currentPiece, board, -1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  };

  // Mueve la pieza a la derecha
  const movePieceRight = () => {
    if (isValidPosition(currentPiece, board, 1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
    }
  };

  // Rota la pieza (si es posible)
  const rotatePiece = () => {
    const newRotation =
      (currentPiece.rotation + 1) %
      TETROMINOES[currentPiece.type].rotations.length;
    if (isValidPosition(currentPiece, board, 0, 0, newRotation)) {
      setCurrentPiece({ ...currentPiece, rotation: newRotation });
    }
  };

  // “Drop”: baja la pieza al máximo posible de golpe
  const dropPiece = () => {
    let dropY = 0;
    while (isValidPosition(currentPiece, board, 0, dropY + 1)) {
      dropY++;
    }
    setCurrentPiece({ ...currentPiece, y: currentPiece.y + dropY });
    // Después de soltar, fusiona la pieza inmediatamente
    movePieceDown();
  };

  // Reinicia el juego
  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(createNewPiece());
    setScore(0);
    setGameOver(false);
  };

  // Prepara el tablero para renderizar mostrando la pieza en movimiento junto a las piezas fijas
  const renderBoard = () => {
    // Clonamos el tablero actual
    const displayBoard = board.map((row) => row.slice());
    // Agregamos la pieza actual
    const blocks = getPieceBlocks(currentPiece);
    blocks.forEach(({ x, y }) => {
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        displayBoard[y][x] = TETROMINOES[currentPiece.type].color;
      }
    });
    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {gameOver && <Text style={styles.gameOverText}>Game Over</Text>}
      <View style={styles.board}>
        {displayBoard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  { backgroundColor: cell ? cell : "black" },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={movePieceLeft}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={movePieceDown}>
          <Text style={styles.buttonText}>↓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={movePieceRight}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={rotatePiece}>
          <Text style={styles.buttonText}>Rotar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={dropPiece}>
          <Text style={styles.buttonText}>Drop</Text>
        </TouchableOpacity>
        {gameOver && (
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    paddingTop: 40,
  },
  board: {
    backgroundColor: "#333",
    width: BOARD_WIDTH * CELL_SIZE,
    height: BOARD_HEIGHT * CELL_SIZE,
    borderWidth: 2,
    borderColor: "#555",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: "#444",
  },
  controls: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#666",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: 50,
    minHeight: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  score: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  gameOverText: {
    color: "red",
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Tetris;
