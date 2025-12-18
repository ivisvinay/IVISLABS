import { create } from 'zustand';
import { User, Company, Student } from '../types';
import { authService } from '../services/auth.service';
import { connectSocket, disconnectSocket } from '../services/socket';

interface AuthState {
  user: User | null;
  profile: Company | Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email, password) => {
    const response = await authService.login({ email, password });
    set({
      user: response.data.user,
      isAuthenticated: true,
    });

    // Connect socket
    connectSocket(response.data.token);

    // Fetch full profile
    const meResponse = await authService.getMe();
    set({ profile: meResponse.data.profile });
  },

  register: async (data) => {
    const response = await authService.register(data);
    set({
      user: response.data.user,
      isAuthenticated: true,
    });

    // Connect socket
    connectSocket(response.data.token);

    // Fetch full profile
    const meResponse = await authService.getMe();
    set({ profile: meResponse.data.profile });
  },

  logout: async () => {
    await authService.logout();
    disconnectSocket();
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
    });
  },

  fetchUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ isLoading: false });
        return;
      }

      const response = await authService.getMe();
      set({
        user: response.data.user,
        profile: response.data.profile,
        isAuthenticated: true,
        isLoading: false,
      });

      // Connect socket
      connectSocket(token);
    } catch (error) {
      set({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
