import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Panel from "../components/Panel";
import LineChartFC from "../components/LineChartFC";
import { auth } from "../utils/firebase";

import "./Statistics.scss";
import temperaturaIcon from "../assets/icons/temperature-quarter.svg";
import heart from "../assets/icons/heart-pulse.svg";

function Statistics() {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => { 
      if (user) {
        const { displayName } = user;
        setDisplayName(displayName || '');
      }else{
        // O usuário não autenticado
        window.location.href = "/404";
      }
    });

    // Remova o listener do estado da autenticação ao desmontar o componente
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <>
      <Sidebar active={"/estatisticas"} />
      <main className="content">
        <Navbar />
        <h4 className="d-block text-start">Olá, {displayName}</h4>

        <Panel
          name={"Temperatura"}
          unity={"ºC"}
          firebasePath={"/temperatura"}
          icon={temperaturaIcon}
        />

        <Panel
          name={"Batimentos"}
          unity={"BPM"}
          firebasePath={"/batimento"}
          icon={heart}
        />
      </main>
    </>
  );
}

export default Statistics;
