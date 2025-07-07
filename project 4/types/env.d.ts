declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_GOOGLE_CLIENT_ID: string;
      EXPO_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};