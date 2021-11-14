import React, { useState } from "react";

import Title from "../Title/Title";
import Label from "../Label/Label";
import Input from "../Input/Input";
import "./Login.css";
import { useContext } from "react";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setSesionActiva, sesionActiva }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [hasError] = useState(false);
  const { setSeleccion } = useContext(BarraNavegacionContexto);
  let history = useHistory();

  function handleChange(name, value) {
    if (name === "usuario") {
      setUser(value);
    }
    if (value.length < 6 || value.length > 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassword(value);
    }
  }
  const formHandler = async (e) => {
    e.preventDefault();

    if (user && password !== "") {
      try {
        let config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nombreUsuario: user,
            password: password,
          }),
        };

        let res = await fetch(
          `https://concesionario-crud.herokuapp.com/auth/session`,
          config
        );
        let resEnJson = await res.json();
        localStorage.setItem("sesion", JSON.stringify(resEnJson));
        console.log(" Inicio sesion! :", resEnJson);
        if (res.status === 401) {
          toast("Datos Incorrectos", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progreso: undefined,
          });
        } else {
          if (resEnJson.bearer === "Bearer") {
            toast("iniciaste sesion!", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progreso: undefined,
            });
            setTimeout(() => {
              localStorage.setItem("activo", true);

              setSesionActiva(true);
              console.log("entro aca, estanaca", sesionActiva);
              setSeleccion("menu");
              history.push("/");
            }, 5000);
          }
        }
      } catch (error) {
        console.log(" hubo un error :(  :", error);
      }
    } else {
      toast("Los campos no pueden estar vacíos", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progreso: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {" "}
        <br />
        <Title className="title-label" text="Concesionaria Citroën" />
        <form className="form">
          {hasError && (
            <label className="label-alert">
              {" "}
              Datos incorrectos o No registrados
            </label>
          )}
          <br />
          <div className="label">
            <Label text="Usuario" />
            <Input
              attribute={{
                id: "usuario",
                name: "usuario",
                type: "text",
                placeholder: "",
              }}
              handleChange={handleChange}
            />
          </div>
          <br />
          <div className="label">
            <Label text="Contraseña" />
            <Input
              attribute={{
                id: "contraseña",
                name: "contraseña",
                type: "password",
                placeholder: "",
              }}
              handleChange={handleChange}
              param={passwordError}
            />
          </div>
          {passwordError && (
            <label className="label-error">Campo de 6 caractéres</label>
          )}
          <br />
          <div className="submit-button-container">
            <button
              onClick={formHandler}
              value="menu"
              className="submit-button"
            >
              Ingresar al Sistema
            </button>

            <ToastContainer> </ToastContainer>
          </div>
          <div className="crear-cuenta-login">
            <p>Aun no estas registrado?</p>
            <br />
            <Link
              type="button"
              className="submit-button-crear-cuenta"
              to="/singin"
            >
              Crear Cuenta
            </Link>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Login;
