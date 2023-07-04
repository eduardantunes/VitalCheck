import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import "./Login.scss";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import Loading from "./Loading";

function Register() {
  const MySwal = withReactContent(Swal);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const updateUserInfo = async () => {
    const success = await updateProfile({ displayName });
    if (success) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          age: 0,
          height: "0",
          weight: "0",
        });
        if(docRef.id){
          window.location.href = "/estatisticas";
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setDisabledBtn(true);
    createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        updateUserInfo();
        setDisabledBtn(false);
      })
      .catch((err) => {
        console.log("Error", err);
        setDisabledBtn(false);
      });
  };

  if (loading || updating) {
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
          <h1>Cadastre em monitoramento IOT</h1>
          <p>
            Crie uma conta em nosso sistema. Por favor, insira suas informações
            abaixo para criar sua conta.
          </p>
          <div className="form-floating mb-3 formulario-input">
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              id="name"
              placeholder="Nome"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label htmlFor="floatingInput">Nome</label>
          </div>
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
          <button
            type="submit"
            disabled={disabledBtn}
            className="btn w-100 btn-lg btn-primary"
          >
            Cadastrar
          </button>
          <p>
            <a
              className="mt-3 d-block link-offset-2 link-underline link-underline-opacity-0"
              href="/"
            >
              Já tem uma conta? Faça login agora mesmo.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
