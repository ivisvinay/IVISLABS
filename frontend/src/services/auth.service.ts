import api from './api';
import { User, Company, Student } from '../types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  userType: 'company' | 'student';
  [key: string]: any;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

interface MeResponse {
  success: boolean;
  data: {
    user: User;
    profile: Company | Student;
  };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', data);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/api/auth/register', data);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },

  async getMe(): Promise<MeResponse> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};
