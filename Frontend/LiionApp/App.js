import React, {useEffect} from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";
import { initializeApp } from "firebase/app";
import {requestPermission} from './src/utils/fcm'
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

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);





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

  useEffect(() => {
    requestPermission();
   },[]);

  return (
    <GlobalProvider>
      <Index />
    </GlobalProvider>
  );
}
