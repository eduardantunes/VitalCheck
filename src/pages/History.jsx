import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useFirebaseDataHistory from "../hooks/history";
import YearReport from "../components/YearReport";
import { auth } from "../utils/firebase";

function History() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // O usuário não autenticado
        window.location.href = "/404";
      }
    });

    // Remova o listener do estado da autenticação ao desmontar o componente
    return () => {
      unsubscribe();
    };
  }, []);

  const info = separateByMonth(useFirebaseDataHistory("/batimentos/"));

  function separateByMonth(data) {
    if (!data) return;
    let d = {};

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const [day, month, year] = element.date.split("-");

      if (d[year]) {
        if (d[year][month]) {
          d[year][month].push(element);
          continue;
        }

        d[year][month] = [element];
        continue;
      } else {
        d[year] = {
          [month]: [element],
        };
      }
    }

    d = Object.values(d);

    for (let index = 0; index < d.length; index++) {
      const element = d[index];
      d[index] = Object.values(element);
    }

    return d;
  }

  return (
    <>
      <Sidebar active={"/historico"} />
      <main className="content">
        <Navbar />
        {info.reverse().map((data, index) => {
          return <YearReport month={data} key={index} />;
        })}
      </main>
    </>
  );
}

export default History;
