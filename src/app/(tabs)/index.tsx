import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="gamepad-variant"
          size={64}
          color="#4a148c"
          style={styles.iconLogo}
        />
        <Text variant="displaySmall" style={styles.appName}>
          CareerCraft
        </Text>
        <Text style={styles.tagline}>Forjando tu futuro profesional</Text>
      </View>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Descubre tu vocación
        </Text>

        <Text variant="bodyLarge" style={styles.subtitle}>
          Con nuestra innovadora evaluación basada en:
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={32}
              color="#4a148c"
            />
            <Text variant="titleSmall" style={styles.featureText}>
              Habilidades cognitivas
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="heart"
              size={32}
              color="#4a148c"
            />
            <Text variant="titleSmall" style={styles.featureText}>
              Intereses personales
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="chart-line"
              size={32}
              color="#4a148c"
            />
            <Text variant="titleSmall" style={styles.featureText}>
              Potencial de crecimiento
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/(games)/tetris" asChild>
          <Button
            mode="contained"
            style={styles.mainButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon="play"
          >
            Comenzar Evaluación
          </Button>
        </Link>

        <Link href="/about" asChild>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            icon="information"
            textColor="#4a148c"
          >
            Conoce más
          </Button>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconLogo: {
    marginBottom: 8,
  },
  appName: {
    fontWeight: "800",
    color: "#4a148c",
    marginBottom: 4,
    fontFamily: "Roboto_700Bold",
  },
  tagline: {
    fontSize: 16,
    color: "#7b1fa2",
    fontStyle: "italic",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#4a148c",
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    textAlign: "center",
    color: "#616161",
    marginBottom: 32,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  featureCard: {
    alignItems: "center",
    backgroundColor: "#f3e5f5",
    padding: 16,
    borderRadius: 16,
    width: "30%",
    elevation: 2,
  },
  featureText: {
    color: "#4a148c",
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    paddingBottom: 32,
  },
  mainButton: {
    borderRadius: 12,
    height: 52,
    backgroundColor: "#7b1fa2",
    marginBottom: 16,
  },
  buttonContent: {
    height: "100%",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryButton: {
    height: 52,
    borderColor: "#7b1fa2",
    borderWidth: 1.5,
  },
});

export default HomeScreen;
