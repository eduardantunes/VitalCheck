import React, { useEffect } from "react";
import RegisterComponets from "../components/Register";
import { auth } from "../utils/firebase";
import Loading from "../components/Loading";

function Register() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // O usuário não autenticado
        //window.location.href = "/estatisticas";
        return <Loading />;
      }   
    });

    // Remova o listener do estado da autenticação ao desmontar o componente
    return () => {
      unsubscribe();
    };
  }, []);
  return <RegisterComponets />;
}

export default Register;
