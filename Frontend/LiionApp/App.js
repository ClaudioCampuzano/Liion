import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";

import { initializeApp } from "firebase/app";
import { LogBox } from "react-native";
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
  const firebaseKeys = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };
  const app = initializeApp(firebaseKeys);

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
