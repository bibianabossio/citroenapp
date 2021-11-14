import React, { useContext } from "react";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";
import "./EditarRepuesto.css";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarRepuesto = () => {
  const { setSeleccion, form } = useContext(BarraNavegacionContexto);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    let resId = event.target.id.value;
    let resTipo = event.target.tipo.value ? event.target.tipo.value : form.tipo;
    let resMarca = event.target.marca.value
      ? event.target.marca.value
      : form.marca;
    let resModelo = event.target.modelo.value
      ? event.target.modelo.value
      : form.modelo;
    let resPrecio = event.target.precio.value
      ? event.target.precio.value
      : form.precio;
    let resStock = event.target.stock.value
      ? event.target.stock.value
      : form.stock;

    try {
      let config = {
        method: "PATCH",
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
        `https://api-taller-mecanico.herokuapp.com/repuestos/${resId}`,
        config
      );
      let resEnJson = await res.json();
      console.log(" SE ACTUALIZO! :", resEnJson);
      if (res.status === 200) {
        console.log(" Repuesto Actualizado");
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
        if (res.status === 412) {
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
    <div className="login-container">
      <div className="login-content">
        <Title className="title-label" text="Editar Repuesto" /> <br />
        <tbody>
          <tr>
            <>
              <td>
                <form onSubmit={handleSubmit} id="formEditRep">
                  id
                  <input
                    className="regular-style"
                    type="text"
                    name="id"
                    disabled
                    value={form.id}
                  />
                  Tipo
                  <input
                    className="regular-style"
                    type="text"
                    name="tipo"
                    placeholder={form.tipo}
                  />
                  Marca
                  <input
                    className="regular-style"
                    type="text"
                    name="marca"
                    placeholder={form.marca}
                  />
                  Modelo
                  <input
                    className="regular-style"
                    type="text"
                    name="modelo"
                    placeholder={form.modelo}
                  />
                  Precio
                  <input
                    className="regular-style"
                    type="text"
                    name="precio"
                    placeholder={form.precio}
                  />
                  Stock
                  <input
                    className="regular-style"
                    type="text"
                    name="stock"
                    placeholder={form.stock}
                  />
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

export default EditarRepuesto;
