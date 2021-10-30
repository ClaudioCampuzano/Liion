import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";

import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

export default function App() {
  const app = initializeApp(Constants.manifest.extra.firebase);

  return (
    <GlobalProvider>
      <Index />
    </GlobalProvider>
  );
}
