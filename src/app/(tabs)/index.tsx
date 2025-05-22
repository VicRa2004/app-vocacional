import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Link } from "expo-router";


const HomeScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/game_baner.jpeg')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>VocaPlay</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Descubre tu camino profesional</Text>
        
        <Text style={styles.subtitle}>
          A través de juegos interactivos que evalúan tus:
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Habilidades</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>❤️</Text>
            <Text style={styles.featureText}>Intereses</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🧠</Text>
            <Text style={styles.featureText}>Fortalezas</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        {
           <Link href="/(preguntas)/preguntas-1" asChild>
          <Button 
            mode="contained" 
            style={styles.mainButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: 'white' } }}
          >
            Comenzar Test
          </Button>
        </Link>
           
        }

        <Link href="/about" asChild>
          <Button 
            mode="text" 
            textColor="#6a1b9a"
            style={styles.secondaryButton}
          >
            ¿Cómo funciona?
          </Button>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a1b9a',
    fontFamily: 'Roboto_700Bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6a1b9a',
    marginBottom: 16,
    lineHeight: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
    padding: 16,
    borderRadius: 12,
    width: '30%',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a1b9a',
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 24,
  },
  mainButton: {
    borderRadius: 12,
    height: 50,
    backgroundColor: '#6a1b9a',
    marginBottom: 16,
  },
  buttonContent: {
    height: '100%',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 50,
  },
});

export default HomeScreen;