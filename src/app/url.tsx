import React from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useUrl } from '@/hooks/use-url';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de URL del Programa</Text>
      
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
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  currentUrl: {
    marginBottom: 15,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default ProgramUrlController;