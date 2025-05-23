import { CARRERAS } from '@/config/carreras';
import { useJuegosStore } from '@/store/juegos-store';
import { router } from 'expo-router';
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
const SNAKE_SPEED = 160; // velocidad ajustada

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

const SnakeGameScreen: React.FC<SnakeGameScreenProps> = ({ onGameOver }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const handleGameOver = () => {
    if (!gameOver) {
      setGameOver(true);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      onGameOver?.(score);
    }
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood(generateFood([{ x: 5, y: 5 }]));
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
  };

  const moveSnake = () => {
    setSnake(prevSnake => {
      const newHead = { ...prevSnake[0] };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Verificar colisión
      const hitWall =
        newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE;
      const hitSelf = prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y);

      if (hitWall || hitSelf) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood(newSnake));
        setScore(prev => prev + 10);
      } else {
        newSnake.pop(); // mover
      }

      return newSnake;
    });
  };

  const changeDirection = (newDirection: Direction) => {
    setDirection(prev => {
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
    setFood(generateFood(snake)); // una vez al inicio
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Puntaje: {score}</Text>

      <View style={styles.grid}>
        {/* Food */}
        <View
          style={[
            styles.cell,
            {
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              backgroundColor: 'crimson',
            },
          ]}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <View
            key={`${segment.x}-${segment.y}-${index}`}
            style={[
              styles.cell,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                backgroundColor: index === 0 ? '#4CAF50' : '#A5D6A7',
              },
            ]}
          />
        ))}
      </View>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>¡Game Over!</Text>
          <Text style={styles.gameOverScore}>Puntaje final: {score}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => changeDirection('UP')}>
          <Text style={styles.arrow}>↑</Text>
        </TouchableOpacity>
        <View style={styles.horizontalControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('LEFT')}>
            <Text style={styles.arrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('DOWN')}>
            <Text style={styles.arrow}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => changeDirection('RIGHT')}>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#9e9e9e',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    borderRadius: 3,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#000000aa',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  gameOverScore: {
    fontSize: 20,
    color: '#eee',
    marginBottom: 16,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 32,
    alignItems: 'center',
  },
  horizontalControls: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },
  controlButton: {
    backgroundColor: '#ccc',
    padding: 16,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function SnakeGame() {

  const {agregarJuego} = useJuegosStore();

  const guardarPuntaje = (score: number) => {
    agregarJuego('snake-game', [CARRERAS[10], CARRERAS[2], CARRERAS[11],], score);

    setTimeout(() => {
      router.replace('/(preguntas)/preguntas-4');
    }, 2000);
  };

  return <SnakeGameScreen onGameOver={guardarPuntaje} />;
}
