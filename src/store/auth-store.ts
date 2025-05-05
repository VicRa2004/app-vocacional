// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    email: string;
    name: string;
    id: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Aquí iría tu llamada API real
          const mockResponse = {
            token: 'mock-token-123',
            user: {
              email,
              name: 'Usuario Ejemplo',
              id: 'user-id-123',
            },
          };

          set({
            token: mockResponse.token,
            user: mockResponse.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error desconocido',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // Verificar token válido aquí
          // Si es válido, mantener el estado
          // Si no, hacer logout
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error de autenticación',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // nombre para el localStorage
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }), // qué persistir
    }
  )
);

export default useAuthStore;