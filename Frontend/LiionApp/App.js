import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";

import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

export default function App() {
  const app = initializeApp(Constants.manifest.extra.firebase);

  return (
    <GlobalProvider>
      <Index />
    </GlobalProvider>
  );
}
