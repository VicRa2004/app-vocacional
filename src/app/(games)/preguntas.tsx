import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

const QUESTIONS = [
  {
    id: 1,
    question: "¿Disfrutas resolver problemas matemáticos complejos?",
    areas: ["civil", "quimica", "datos", "computacionales"],
  },
  {
    id: 2,
    question: "¿Te interesa crear software, apps o sitios web?",
    areas: ["computacionales", "informática", "tics"],
  },
  {
    id: 3,
    question: "¿Te apasiona la química y los procesos químicos?",
    areas: ["quimica", "bioquimica", "petrolera"],
  },
  {
    id: 4,
    question: "¿Te preocupan los problemas ambientales y quieres ayudar a resolverlos?",
    areas: ["ambiental", "bioquimica"],
  },
  {
    id: 5,
    question: "¿Te interesa cómo funcionan las empresas y cómo gestionarlas?",
    areas: ["gestion", "administracion", "industrial"],
  },
  {
    id: 6,
    question: "¿Te llama la atención el análisis de datos y los patrones de información?",
    areas: ["datos", "informática", "tics"],
  },
  {
    id: 7,
    question: "¿Te interesa diseñar estructuras como puentes o edificios?",
    areas: ["civil"],
  },
  {
    id: 8,
    question: "¿Te ves trabajando con máquinas, procesos de producción o líneas de ensamblaje?",
    areas: ["industrial", "petrolera"],
  },
  {
    id: 9,
    question: "¿Te interesa cómo fluye la información a través de redes y sistemas?",
    areas: ["tics", "informática", "computacionales"],
  },
  {
    id: 10,
    question: "¿Te gustaría liderar equipos y tomar decisiones empresariales?",
    areas: ["gestion", "administracion"],
  },
];

const CAREERS: Record<string, string> = {
  civil: "Ing. Civil",
  quimica: "Ing. Química",
  petrolera: "Ing. Petrolera",
  ambiental: "Ing. Ambiental",
  industrial: "Ing. Industrial",
  bioquimica: "Ing. Bioquímica",
  informática: "Ing. Informática",
  administracion: "Lic. en Administración",
  gestion: "Ing. en Gestión Empresarial",
  datos: "Ing. en Ciencias de Datos",
  computacionales: "Ing. en Sistemas Computacionales",
  tics: "Ing. en Tecnologías de la Información y Comunicaciones"
};

export default function VocationalTest() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [results, setResults] = useState<string[] | null>(null);

  const handleSelect = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {};

    for (const q of QUESTIONS) {
      const value = answers[q.id] || 0;
      for (const area of q.areas) {
        scores[area] = (scores[area] || 0) + value;
      }
    }

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([key]) => CAREERS[key]);

    setResults(sorted);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {QUESTIONS.map((q) => (
        <View key={q.id} style={styles.questionBlock}>
          <Text style={styles.question}>{q.question}</Text>
          <RadioButton.Group
            onValueChange={(value) => handleSelect(q.id, Number(value))}
            value={answers[q.id]?.toString() || ""}
          >
            <View style={styles.options}>
              {[1, 2, 3, 4, 5].map((num) => (
                <View key={num} style={styles.option}>
                  <RadioButton value={num.toString()} />
                  <Text>{num}</Text>
                </View>
              ))}
            </View>
          </RadioButton.Group>
        </View>
      ))}

      <Button mode="contained" onPress={calculateResult} style={styles.button}>
        Ver resultado
      </Button>

      {results && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Carreras sugeridas:</Text>
          {results.map((career, index) => (
            <Text key={index} style={styles.resultItem}>• {career}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  questionBlock: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
  results: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultItem: {
    fontSize: 16,
  },
});
