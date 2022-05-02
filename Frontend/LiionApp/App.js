import React, { useEffect } from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { initializeApp } from "firebase/app";
import { requestPermission } from "./src/utils/fcm";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "@env";

LogBox.ignoreLogs(["AsyncStorage", "Setting a timer"]);

export default function App() {
  //dato al instalar estas variables deben estar escritas, ya que la compilacion no toma .env
  // se colocan en local, pero no se pushean al git
 
  const app = initializeApp(firebaseKeys);

  useEffect(() => {
    requestPermission();
  }, []);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </GlobalProvider>
    </QueryClientProvider>
  );
}
