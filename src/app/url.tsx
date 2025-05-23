import React from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useUrl } from '@/hooks/use-url';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProgramUrlController = () => {
  const {
    currentUrl,
    ipAddress,
    setIpAddress,
    saveUrl,
    clearUrl,
    isValidIp,
    isLoading,
    error,
  } = useUrl();

  const handleGoBack = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración de URL</Text>
      </View>

      <Text style={styles.currentUrl}>
        URL actual: {currentUrl || 'No configurada'}
      </Text>
      
      <TextInput
        style={[styles.input, !isValidIp && ipAddress && styles.inputError]}
        value={ipAddress}
        onChangeText={setIpAddress}
        placeholder="Ingresa la dirección IP (ej. 192.168.1.1)"
        keyboardType="numeric"
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          onPress={saveUrl}
          disabled={!isValidIp || isLoading}
        />
        
        <Button
          title="Limpiar"
          onPress={clearUrl}
          disabled={!currentUrl || isLoading}
        />
      </View>
      
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  currentUrl: {
    marginBottom: 15,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});

export default ProgramUrlController;