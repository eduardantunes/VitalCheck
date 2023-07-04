import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";


/* PAGES */
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import History from './pages/History';
import Statistics from './pages/Statistics';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';


/* STYLES */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="perfil" element={<Perfil />}></Route>
          <Route path="/historico" element={<History />} />
          <Route path="/estatisticas" element={<Statistics />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" exact={true} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
