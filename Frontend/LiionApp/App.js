import React from "react";
import Index from "./src/Index";
import GlobalProvider from "./src/context/Provider";

export default function App() {
    return (
    <GlobalProvider>
      <Index/>
    </GlobalProvider>
  );
}