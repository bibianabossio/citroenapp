import React, { useContext } from "react";
import Title from "../Title/Title";
import Label from "../Label/Label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";

const CrearRep = () => {
  const { setSeleccion } = useContext(BarraNavegacionContexto);

  const crearRepuesto = async (event) => {
    event.preventDefault();
    console.log("hice click", event.target.tipo.value);
    let resTipo = event.target.tipo.value ? event.target.tipo.value : "";
    let resMarca = event.target.marca.value ? event.target.marca.value : "";
    let resModelo = event.target.modelo.value ? event.target.modelo.value : "";
    let resPrecio = event.target.precio.value ? event.target.precio.value : "";
    let resStock = event.target.stock.value ? event.target.stock.value : "";

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          tipo: resTipo,
          marca: resMarca,
          modelo: resModelo,
          precio: parseFloat(resPrecio),
          stock: parseFloat(resStock),
        }),
      };
      let res = await fetch(
        `https://api-taller-mecanico.herokuapp.com/repuestos`,
        config,
        { mode: "no-cors" }
      );
      let resEnJson = await res.json();
      if (res.status === 201) {
        console.log(" SE CREO UN NUEVO REPUESTO :", resEnJson);
        toast("Repuesto Registrado", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progreso: undefined,
        });
        setTimeout(() => {
          setSeleccion("menu");
        }, 5000);
      } else {
        if (res.status === 409) {
          toast(
            "ERROR! Tipo: Parabrisas, Espejo o Radiador. Marca: Citroen o Lael",
            {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progreso: undefined,
            }
          );
        } else {
          toast("Datos Incorrectos", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progreso: undefined,
          });
        }
      }
    } catch (error) {
      console.log(" hubo un error :( EN LA ACTUALIZACION :", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <br />
          <Title className="title-label" text="Crear Nuevo Repuesto" /> <br />
          <form onSubmit={crearRepuesto} className="form">
            <Label text="Tipo" />
            <input className="regular-style" type="text" name="tipo" />
            <br />
            <Label text="Marca" />
            <input className="regular-style" type="text" name="marca" /> <br />
            <Label text="Modelo" />
            <input className="regular-style" type="text" name="modelo" />
            <br />
            <Label text="Precio" />
            <input className="regular-style" type="text" name="precio" />
            <br />
            <Label text="Stock" />
            <input className="regular-style" type="text" name="stock" />
            <br />
            <br />
            <button
              value={setSeleccion}
              type="submit"
              className="submit-button"
            >
              Confirmar
            </button>
            <ToastContainer> </ToastContainer>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

export default CrearRep;
