import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

export default function App() {
  firebase.initializeApp(Constants.manifest.extra.firebase);

    return (
    <GlobalProvider>
      <Index/>
    </GlobalProvider>
  );
}