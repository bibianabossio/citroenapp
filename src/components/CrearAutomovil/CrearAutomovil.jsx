import React, { useContext } from "react";
import Title from "../Title/Title";
import Label from "../Label/Label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";

const CrearAuto = () => {
  const { setSeleccion } = useContext(BarraNavegacionContexto);

  const crearAutomovil = async (event) => {
    event.preventDefault();
    console.log("hice click", event.target);
    let resYear = event.target.year.value ? event.target.year.value : "";
    let resName = event.target.name.value ? event.target.name.value : "";
    let resColor = event.target.color.value ? event.target.color.value : "";
    let resPrice = event.target.price.value ? event.target.price.value : "";

    try {
      let sesion = JSON.parse(localStorage.getItem("sesion"));
      let config = {
        method: "POST",
        headers: {
          Authorization: sesion.bearer + " " + sesion.token,
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          year: parseFloat(resYear),
          name: resName,
          color: resColor,
          price: parseFloat(resPrice),
        }),
      };
      let res = await fetch(
        `https://api-concesionario-taller6.herokuapp.com/auto`,
        config,
        { mode: "no-cors" }
      );
      let resEnJson = await res.json();
      if (res.status === 201) {
        console.log(" SE CREO UN NUEVO AUTO :", resEnJson);
        toast("Automóvil Registrado", {
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
      }
      if (res.status === 409) {
        toast(resEnJson.message.modelo, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progreso: undefined,
        });
      } else {
        if (resEnJson.message.color) {
          toast(resEnJson.message.color, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progreso: undefined,
          });
        } else {
          toast("Verificar los campos ingresados", {
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
    <div className="login-container">
      <div className="login-content">
        <br />
        <Title className="title-label" text="Crear Nuevo Automovil" /> <br />
        <tbody>
          <tr>
            <>
              <td>
                <form onSubmit={crearAutomovil} className="form">
                  <Label text="Año" />
                  <input className="regular-style" type="text" name="year" />
                  <br />
                  <Label text="Modelo" />
                  <input className="regular-style" type="text" name="name" />
                  <br />
                  <Label text="Color" />
                  <input className="regular-style" type="text" name="color" />
                  <br />
                  <Label text="Precio" />
                  <input className="regular-style" type="text" name="price" />
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
              </td>
              <td></td>
            </>
          </tr>
        </tbody>
      </div>
    </div>
  );
};
export default CrearAuto;
