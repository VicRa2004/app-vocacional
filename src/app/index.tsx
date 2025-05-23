import { router } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUrl } from '@/hooks/use-url';
import useAuthStore from '@/store/auth-store';

export default function WelcomeScreen() {
  const { currentUrl } = useUrl();
  const { isAuthenticated, isLoading } = useAuthStore();

  const handleConfigPress = () => {
    router.replace('/url');
  }; 

  const handleMainButtonPress = () => {
    if (isAuthenticated) {
      router.push('/(tabs)'); // Redirige al dashboard si está autenticado
    } else {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CareerCraft</Text>
      <Text style={styles.subtitle}>Descubre tu vocación a través del juego</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={handleMainButtonPress}
        >
          <Text style={styles.buttonText}>
            {isAuthenticated ? 'Continuar' : 'Comenzar Ahora'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón de configuración discreto */}
      <TouchableOpacity 
        style={styles.configButton}
        onPress={handleConfigPress}
      >
        <Ionicons name="settings" size={24} color="#666" />
        {currentUrl && (
          <View style={styles.connectedIndicator}>
            <Ionicons name="checkmark-circle" size={12} color="green" />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        © 2023 CareerCraft - Transformando elecciones vocacionales
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  mainButton: {
    backgroundColor: '#7b1fa2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  configButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  connectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    color: '#95a5a6',
    fontSize: 12,
  },
});