import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';

export default function Config() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Configuración
      </Text>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Cuenta</List.Subheader>
        <List.Item
          title="Editar perfil"
          description="Nombre, correo, contraseña"
          left={(props) => <List.Icon {...props} icon="account-edit" />}
          onPress={() => {}}
        />
        <List.Item
          title="Cambiar contraseña"
          description="Actualiza tu contraseña"
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Preferencias</List.Subheader>
        <List.Item
          title="Tema"
          description="Claro u oscuro"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          onPress={() => {}}
        />
        <List.Item
          title="Idioma"
          description="Idioma de la aplicación"
          left={(props) => <List.Icon {...props} icon="translate" />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Notificaciones</List.Subheader>
        <List.Item
          title="Permitir notificaciones"
          description="Habilitar o deshabilitar alertas"
          left={(props) => <List.Icon {...props} icon="bell-ring" />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Avanzado</List.Subheader>
        <List.Item
          title="Borrar caché"
          description="Limpia los datos temporales"
          left={(props) => <List.Icon {...props} icon="delete-outline" />}
          onPress={() => {}}
        />
        <List.Item
          title="Acerca de la app"
          description="Versión y créditos"
          left={(props) => <List.Icon {...props} icon="information-outline" />}
          onPress={() => {}}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
  },
  divider: {
    marginVertical: 8,
  },
});
