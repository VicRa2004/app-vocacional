import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useJuegosStore } from '@/store/juegos-store';
import { CARRERAS } from '@/config/carreras';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: '¿Qué lenguaje de programación fue creado por Guido van Rossum?',
    options: ['Java', 'Python', 'C++', 'JavaScript'],
    answer: 'Python',
  },
  {
    question: '¿Qué protocolo se usa principalmente para enviar correos electrónicos?',
    options: ['HTTP', 'FTP', 'SMTP', 'TCP'],
    answer: 'SMTP',
  },
  {
    question: '¿Qué estructura de datos sigue el principio LIFO (Last In First Out)?',
    options: ['Cola', 'Lista enlazada', 'Pila', 'Árbol binario'],
    answer: 'Pila',
  },
  {
    question: '¿Qué compañía desarrolló el sistema operativo Android?',
    options: ['Google', 'Apple', 'Microsoft', 'Android Inc.'],
    answer: 'Android Inc.',
  },
  {
    question: '¿Qué significa HTML?',
    options: [
      'HyperText Markup Language',
      'High-Level Text Machine Language',
      'HyperTransfer Markup Language',
      'Home Tool Markup Language'
    ],
    answer: 'HyperText Markup Language',
  },
];

export default function Trivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const {agregarJuego} = useJuegosStore();

  const handleOptionPress = (option: string) => {
    if (showAnswer || gameCompleted) return;

    setSelectedOption(option);
    setShowAnswer(true);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const saveScoreAndRedirect = async () => {
    try {
      
      console.log(score);

      agregarJuego('trivia-informatica', [CARRERAS[9], CARRERAS[10], CARRERAS[11], CARRERAS[6],], score)
      
      router.replace('/');
    } catch (error) {
      console.error('Error al guardar el puntaje:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameCompleted(true);
      saveScoreAndRedirect();
    }
  };

  const renderOption = (option: string) => {
    const isCorrect = option === questions[currentQuestion].answer;
    const isSelected = option === selectedOption;

    let backgroundColor = '#eee';
    if (showAnswer && isSelected) {
      backgroundColor = isCorrect ? '#a5d6a7' : '#ef9a9a';
    } else if (showAnswer && isCorrect) {
      backgroundColor = '#a5d6a7';
    }

    return (
      <TouchableOpacity
        key={option}
        style={[styles.option, { backgroundColor }]}
        onPress={() => handleOptionPress(option)}
        disabled={gameCompleted}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trivia de Informática</Text>
      
      <Text style={styles.progress}>
        Pregunta {currentQuestion + 1} de {questions.length}
      </Text>

      <Text style={styles.question}>
        {questions[currentQuestion].question}
      </Text>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map(renderOption)}
      </View>

      {showAnswer && (
        <Text style={styles.feedback}>
          {selectedOption === questions[currentQuestion].answer
            ? '¡Correcto! 🎉'
            : `Incorrecto 😢. La respuesta era: ${questions[currentQuestion].answer}`}
        </Text>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleNext}
        disabled={!showAnswer && !gameCompleted}
      >
        <Text style={styles.buttonText}>
          {currentQuestion + 1 < questions.length ? 'Siguiente' : 'Terminar'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.score}>Puntaje actual: {score}</Text>
    </SafeAreaView>
  );
}

const ACCENT = '#6a1b9a';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ACCENT,
    textAlign: 'center',
    marginBottom: 20,
  },
  progress: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  optionsContainer: {
    marginBottom: 25,
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 7,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
    color: ACCENT,
  },
  button: {
    backgroundColor: ACCENT,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    opacity: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    textAlign: 'center',
    fontSize: 18,
    color: '#444',
    fontWeight: 'bold',
  },
});