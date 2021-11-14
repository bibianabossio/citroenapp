import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";
import Buscador from "../Buscador/Buscador";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState({
    opcionSeleccionada: null,
    textoAbuscar: "",
  });
  const { handleSubmitModificar } = useContext(BarraNavegacionContexto);

  const onValueChange = (e) => {
    console.log(e.target.value);
    e.target.name === "textoAbuscar"
      ? setSearch({
          ...search,
          textoAbuscar: e.target.value,
        })
      : setSearch({
          ...search,
          opcionSeleccionada: e.target.value,
        });
  };

  const formSubmitSearch = async (e) => {
    e.preventDefault();
    let resBusqueda = await Buscador(
      search.opcionSeleccionada,
      search.textoAbuscar
    );
    console.log(resBusqueda);
    setPost(resBusqueda);
  };

  useEffect(async () => {
    const res = await fetch(
      "https://api-taller-mecanico.herokuapp.com/repuestos"
    );
    const data = await res.json();
    setPost(data);
  }, []);

  const actualizarListado = async () => {
    const res = await fetch(
      "https://api-taller-mecanico.herokuapp.com/repuestos"
    );
    const data = await res.json();
    setPost(data);
  };

  const funcionBorrarFiltroBusq = () => {
    setSearch({
      textoAbuscar: null,
      opcionSeleccionada: null,
    });
    document.getElementById("textBox").value = "";
    actualizarListado();
  };

  const funcionBorrar = async (event) => {
    event.preventDefault();
    console.log(" se hizo click para borara el coso :", event.target.value);

    try {
      let config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(event.target.value),
      };
      let res = await fetch(
        `https://api-taller-mecanico.herokuapp.com/repuestos/${event.target.value}`,
        config
      );
      let resEnJson = res;
      if (res.status === 204) {
        actualizarListado();

        toast(`Repuesto ${event.target.value} Eliminado`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progreso: undefined,
        });
      } else {
        toast(resEnJson.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progreso: undefined,
        });
      }
    } catch (error) {
      console.log(" hubo un error :( :", error);
    }
  };

  return (
    <>
      <h2 style={{ height: 25, width: "100%" }}>Listado de Repuestos</h2>
      <br />
      <form onSubmit={formSubmitSearch}>
        <input
          type="radio"
          value="tipo"
          name="tipo"
          onChange={onValueChange}
          checked={search.opcionSeleccionada === "tipo" ? true : false}
        />
        Tipo
        <input
          type="radio"
          value="marca"
          name="marca"
          onChange={onValueChange}
          checked={search.opcionSeleccionada === "marca" ? true : false}
        />
        Marca
        <input
          type="radio"
          value="modelo"
          name="modelo"
          onChange={onValueChange}
          checked={search.opcionSeleccionada === "modelo" ? true : false}
        />
        Modelo
        <input
          type="text"
          name="textoAbuscar"
          id="textBox"
          onChange={onValueChange}
        />
        <br />
        <br />
        <button type="submit">Buscar</button>
        <button onClick={funcionBorrarFiltroBusq}>
          Eliminar Filtro de Búsqueda
        </button>
        <br />
      </form>

      <table style={{ height: 25, width: "100%" }} className="tabla-style2">
        <thead>
          <th>Clave</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Precio</th>
          <th>Stock</th>
          <th></th>
          <th></th>
        </thead>
        <tbody className="tabla-style2">
          {post ? (
            post.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.tipo}</td>
                <td>{post.marca}</td>
                <td>{post.modelo}</td>
                <td>{post.precio}</td>
                <td>{post.stock}</td>
                <td>
                  <form>
                    <button
                      type="submit"
                      onClick={funcionBorrar}
                      value={post.id}
                      className="submit-button"
                    >
                      Eliminar
                    </button>
                  </form>
                </td>
                <td>
                  <form onSubmit={handleSubmitModificar}>
                    <input
                      type="text"
                      hidden
                      name="idInputModif"
                      value={post.id}
                      onChange={(e) => {
                        console.log(
                          "se hizo clicl  en modificar perro",
                          e.target.idInputModif
                        );
                      }}
                    />
                    <input
                      type="text"
                      hidden
                      name="marcaInputModif"
                      value={post.marca}
                      onChange={(e) => {}}
                    />
                    <input
                      type="text"
                      hidden
                      name="tipoInputModif"
                      value={post.tipo}
                      onChange={(e) => {}}
                    />
                    <input
                      type="text"
                      hidden
                      name="modeloInputModif"
                      value={post.modelo}
                      onChange={(e) => {}}
                    />
                    <input
                      type="text"
                      hidden
                      name="precioInputModif"
                      value={post.precio}
                      onChange={(e) => {}}
                    />
                    <input
                      type="text"
                      hidden
                      name="stockInputModif"
                      value={post.stock}
                      onChange={(e) => {}}
                    />
                    <button
                      type="submit"
                      name="tipoComponente"
                      value={"editar repuesto"}
                      className="submit-button"
                    >
                      Editar Repuesto
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <Loading />
          )}
          <tr>
            <td colspan="5">
              <Router>
                <Link className="submit-button" to="/crearrepuesto">
                  Crear Repuesto
                </Link>
              </Router>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer> </ToastContainer>
    </>
  );
};

export default Post;
