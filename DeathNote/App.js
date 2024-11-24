import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { AuthProvider } from "./src/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
