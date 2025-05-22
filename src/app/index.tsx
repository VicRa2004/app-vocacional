import { Redirect } from 'expo-router';
import useAuth from '@/hooks/use-auth';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { authState: { isAuthenticated, isLoading } } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? 
    <Redirect href="/(tabs)" /> : 
    <Redirect href="/login" />;
}