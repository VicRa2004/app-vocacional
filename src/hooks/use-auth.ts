// hooks/useAuth.ts
import { useEffect } from 'react';
import useAuthStore from '@/store/auth-store';

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

  // Efecto para verificar autenticación al montar el componente
  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        await checkAuth();
      }
    };
    verifyAuth();
  }, [token, checkAuth]);

  return {
    // Estado
    authState: {
      isAuthenticated,
      isLoading,
      error,
      user,
      token
    },
    
    // Acciones
    authActions: {
      login: async (email: string, password: string) => {
        await login(email, password);
      },
      logout: () => {
        logout();
      },
      clearError: () => {
        clearError();
      }
    },
    
    // Helpers
    //isAdmin: user?.role === 'admin', // Opcional: si tienes roles
    isCurrentUser: (userId: string) => user?.id === userId
  };
};

export default useAuth;