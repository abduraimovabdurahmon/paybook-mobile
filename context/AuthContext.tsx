import api from '@/services/api';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '@/services/storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Tokenni tekshirish funksiyasi
  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Yangilash funksiyasi
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await api.post('/api/auth/refresh', { refreshToken });
      const { accessToken } = response.data.data;
      if (!accessToken) throw new Error('No access token received');

      await setAccessToken(accessToken);
      setIsAuthenticated(true);
      return accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await logout();
      return null;
    }
  }, []);

  // Login funksiyasi
  const login = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      
      if (!code || code.length !== 6) {
        throw new Error('Invalid code. Please enter a 6-digit code.');
      }

      // 1. Refresh token olish
      const refreshTokenResponse = await api.post('/api/auth/login', { code });
      const { refreshToken } = refreshTokenResponse.data.data;
      console.log('Refresh token received:', refreshToken);
      if (!refreshToken) throw new Error('Login failed. No refresh token received.');
      await setRefreshToken(refreshToken);

      // 2. Access token olish
      const accessToken = await refreshAccessToken();
      console.log('Access token received:', accessToken);
      if (!accessToken) throw new Error('Failed to get access token after login');

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      await logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [refreshAccessToken]);

  // Logout funksiyasi
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await removeAccessToken();
      await removeRefreshToken();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Dastlabki tekshiruv
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading,
      login,
      logout,
      refreshAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};