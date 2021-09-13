import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";
import Constants from "expo-constants";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default function App() {
  !firebase.apps.length ? firebase.initializeApp(Constants.manifest.extra.firebase) : firebase.app();
  
  return (
    <GlobalProvider>
      <Index />
    </GlobalProvider>
  );
}
