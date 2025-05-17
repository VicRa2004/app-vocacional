import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type SnakeGameScreenProps = {
  onGameOver?: (score: number) => void;
};

const GRID_SIZE = 20;
const CELL_SIZE = Math.floor(Dimensions.get('window').width / GRID_SIZE);

// 🔁 Puedes cambiar esta constante para ajustar la velocidad de la serpiente
const SNAKE_SPEED = 300; // en milisegundos (entre más bajo, más rápido)

const generateFood = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const SnakeGameScreen: React.FC<SnakeGameScreenProps> = ({ onGameOver }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>(generateFood());
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore((prev) => prev + 10);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (onGameOver) onGameOver(score);
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
  };

  const changeDirection = (newDirection: Direction) => {
    setDirection((prev) => {
      if (
        (prev === 'UP' && newDirection !== 'DOWN') ||
        (prev === 'DOWN' && newDirection !== 'UP') ||
        (prev === 'LEFT' && newDirection !== 'RIGHT') ||
        (prev === 'RIGHT' && newDirection !== 'LEFT')
      ) {
        return newDirection;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (!gameOver) {
      gameLoopRef.current = setInterval(moveSnake, SNAKE_SPEED);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, gameOver]);

  useEffect(() => {
    resetGame(); // Se ejecuta al montar el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Puntaje: {score}</Text>

      <View style={styles.grid}>
        {/* Comida */}
        <View
          style={[
            styles.cell,
            {
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              backgroundColor: 'red',
            },
          ]}
        />

        {/* Serpiente */}
        {snake.map((segment, index) => (
          <View
            key={`${segment.x}-${segment.y}-${index}`}
            style={[
              styles.cell,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                backgroundColor: index === 0 ? 'green' : 'lightgreen',
              },
            ]}
          />
        ))}
      </View>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>¡Game Over!</Text>
          <Text style={styles.gameOverScore}>Puntaje: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => changeDirection('UP')}>
          <Text>↑</Text>
        </TouchableOpacity>
        <View style={styles.horizontalControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('LEFT')}>
            <Text>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('DOWN')}>
            <Text>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('RIGHT')}>
            <Text>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    borderRadius: 4,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  gameOverContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  gameOverScore: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
  },
  restartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  controls: {
    marginTop: 24,
    alignItems: 'center',
  },
  horizontalControls: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },
  controlButton: {
    backgroundColor: '#ddd',
    padding: 16,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SnakeGame() {
  return <SnakeGameScreen onGameOver={(score) => console.log('Puntaje:', score)} />;
}
