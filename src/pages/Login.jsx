import React, { useEffect } from "react";
import LoginComponets from "../components/Login";
import { auth } from "../utils/firebase";

function Login() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // O usuário não autenticado
        window.location.href = "/estatisticas";
      }
    });

    // Remova o listener do estado da autenticação ao desmontar o componente
    return () => {
      unsubscribe();
    };
  }, []);
  return <LoginComponets />;
}

export default Login;
