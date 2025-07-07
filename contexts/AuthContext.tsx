import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirectUri = Platform.select({
    web: 'http://localhost:8081',
    default: AuthSession.makeRedirectUri({
      scheme: 'myapp',
      path: 'auth',
    }),
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
      redirectUri,
      codeChallenge: Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        'code_verifier',
        { encoding: Crypto.CryptoEncoding.BASE64URL }
      ),
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    },
    discovery
  );

  useEffect(() => {
    loadStoredUser();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthResponse(response);
    }
  }, [response]);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthResponse = async (response: AuthSession.AuthSessionResult) => {
    if (response.type === 'success') {
      try {
        setIsLoading(true);
        
        // Exchange code for token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET,
            code: response.params.code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code_verifier: 'code_verifier',
          }).toString(),
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.access_token) {
          // Get user info
          const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          });
          
          const userData = await userResponse.json();
          
          const user: User = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            given_name: userData.given_name,
            family_name: userData.family_name,
          };
          
          setUser(user);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('access_token', tokenData.access_token);
        }
      } catch (error) {
        console.error('Error handling auth response:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const signIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.multiRemove(['user', 'access_token']);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}