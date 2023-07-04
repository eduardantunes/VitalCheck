import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function Sair() {
  const logout = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // O usuário não autenticado
        window.location.href = "/";
      }
    });

    // Remova o listener do estado da autenticação ao desmontar o componente
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(()=>{
    logout()
  }, [])
  return <Loading />;
}

export default Sair;
