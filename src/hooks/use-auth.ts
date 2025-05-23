import useAuthStore from '@/store/auth-store';
import { useEffect } from 'react';
import { useUrl } from './use-url';

const useAuth = () => {
  const {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    checkAuth
  } = useAuthStore();

  const { currentUrl } = useUrl();

  // Verificar autenticación al iniciar
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, []);

  return {
    authState: {
      isAuthenticated,
      isLoading,
      error,
      user,
      token
    },
    authActions: {
      login: async (email: string, password: string) => {
        try {
          await login(email, password, currentUrl);
          // Forzar re-renderizado después de login exitoso
          return true;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: async () => {
        logout();
        // Forzar re-renderizado después de logout
        return true;
      },
      clearError
    }
  };
};

export default useAuth;