import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: '¿Cuál es la capital de Francia?',
    options: ['Madrid', 'Berlín', 'París', 'Lisboa'],
    answer: 'París',
  },
  {
    question: '¿Cuántos planetas hay en el sistema solar?',
    options: ['7', '8', '9', '10'],
    answer: '8',
  },
  {
    question: '¿Qué lenguaje se usa para crear apps con React Native?',
    options: ['Java', 'Kotlin', 'TypeScript', 'Swift'],
    answer: 'TypeScript',
  },
];

export default function Trivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionPress = (option: string) => {
    if (showAnswer) return;

    setSelectedOption(option);
    setShowAnswer(true);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Reiniciar el juego
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const renderOption = (option: string) => {
    const isCorrect = option === questions[currentQuestion].answer;
    const isSelected = option === selectedOption;

    let backgroundColor = '#eee';
    if (showAnswer && isSelected) {
      backgroundColor = isCorrect ? '#a5d6a7' : '#ef9a9a';
    }

    return (
      <TouchableOpacity
        key={option}
        style={[styles.option, { backgroundColor }]}
        onPress={() => handleOptionPress(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trivia App</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentQuestion + 1 < questions.length ? 'Siguiente' : 'Reiniciar'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.score}>Puntaje: {score}</Text>
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
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  feedback: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: ACCENT,
  },
  button: {
    backgroundColor: ACCENT,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});
