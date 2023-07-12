import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import "./Login.scss";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Loading from "./Loading";

function Login() {
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email.length && password.length) {
      signInWithEmailAndPassword(email, password);
    } else {
      alert("info", "Você não preencheu o formulário de login");
    }
  };

  if (loading) {
    return <Loading />;
  }

  /*if (user) {
    if (user) {
      window.location.href = "/estatisticas";
    }
  }*/

  const alert = (icon, message) => {
    MySwal.fire({
      icon: icon,
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
    });
  };

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="login-image">
        <img src="pexels-burak-the-weekender-186461.jpg" alt="monitoramento" />
      </div>
      <div className="login-form d-flex justify-content-center align-items-center">
        <form
          onSubmit={(e) => {
            handleSignIn(e);
          }}
          className="login-form-content"
        >
          <h1>Entrar em monitoramento IOT</h1>
          <p>
            Bem-vindo ao nosso sistema de login! Por favor, insira suas
            credenciais abaixo para acessar sua conta.
          </p>
          <div className="form-floating mb-3 formulario-input">
            <input
              type="email"
              className="form-control"
              autoComplete="off"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>
          <div className="form-floating mb-3 formulario-input">
            <input
              type="password"
              className="form-control"
              autoComplete="off"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingInput">Senha</label>
          </div>
          <button type="submit" className="btn w-100 btn-lg btn-primary">
            Entrar
          </button>
          <p><a className="mt-3 d-block link-offset-2 link-underline link-underline-opacity-0" href="/register">Não tem uma conta? Faça uma agora mesmo.</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
