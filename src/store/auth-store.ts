// store/auth-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/services/auth.service';

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  genero: string;
  fechaNacimiento: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string, currentUrl: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password, currentUrl) => {

        set({ isLoading: true, error: null });

        const authService = new AuthService(`${currentUrl}/api/auth`);

        try {
          const { token, usuario } = await authService.login(email, password);

          console.log(usuario, token);
          
          set({
            token,
            user: usuario,
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
        const { token } = get();
        set({ isLoading: true });
        
        try {
          if (token) {
            // Aquí podrías implementar la verificación del token con el backend
            set({ isAuthenticated: true });
          } else {
            set({ isAuthenticated: false });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error de autenticación',
            isAuthenticated: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage', // Nombre único para el storage
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;