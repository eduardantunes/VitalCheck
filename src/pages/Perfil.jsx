import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PerfilUser from "../components/Perfil";
import { auth } from "../utils/firebase";

const Perfil = () => {
  return (
    <>
      <Sidebar active={"/perfil"} />
      <main className="content">
        <Navbar />
        <PerfilUser />
      </main>
    </>
  );
};

export default Perfil;
