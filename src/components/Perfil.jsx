import React, { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "./Loading";
import { date } from "yup";

function Perfil() {
  const MySwal = withReactContent(Swal);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [docId, setDocId] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [preExistingConditions, setPreExistingConditions] = useState(true);
  const [loading, setLoading] = useState(true);
  const [getDadosUserFirebase, setGetDadosUserFirebase] = useState(true);

  const getInfoUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      if (doc.data().email == email && getDadosUserFirebase) {
        setDocId(doc.id);
        setAge(doc.data().age);
        setHeight(doc.data().height);
        setBirthdate(doc.data().birthdate);
        setWeight(doc.data().weight);
        setGetDadosUserFirebase(false);
        console.log("rodando...");
      }
    });
  };

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

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const { displayName, email } = user;
          setName(displayName || "");
          setEmail(email || "");
          setLoading(false);
        } else {
          // O usuário não autenticado
          window.location.href = "/404";
        }
      });
      // Remova o listener do estado da autenticação ao desmontar o componente
      return () => {
        unsubscribe();
      };
    }, []);
    if (loading) {
      return <Loading />;
    }
    getInfoUser();

    const save = async (e) => {
      e.preventDefault();

      await updateDoc(doc(db, "users", docId), {
        email: email,
        birthdate: birthdate,
        age: age,
        height: height,
        weight: weight,
      });

      alert("success", "Informações modificadas com sucesso!");

    };

    return (
      <>
        <form onSubmit={(e) => save(e)}>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start">Nome</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              disabled
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start">E-mail</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="E-mail"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start">Idade</label>
            <input
              type="number"
              className="form-control form-control-lg"
              id="idade"
              placeholder="Idade"
              value={age}
              onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start">Altura</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="height"
              placeholder="Altura"
              value={height}
              onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start">Peso</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="weight"
              placeholder="Altura"
              value={weight}
              onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="form-group mb-2">
            <label className="d-block text-secondary text-start"> Data de Nascimento </label>
            <input
              type="date"
              className="form-control form-control-lg"
              id="birthdate"
              placeholder="Data de Nascimento"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)} />
          </div>

          <button type="submit" className="mt-4 d-block btn btn-lg btn-primary">
            Modificar
          </button>
        </form>
      </>
    );
  }

export default Perfil;

