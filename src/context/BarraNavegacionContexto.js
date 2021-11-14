import React, { createContext, useState } from "react";

const BarraNavegacionContexto = createContext();
const SeleccionProvider = ({ children, setSesionActiva }) => {
  const [seleccion, setSeleccion] = useState("menu");

  const [usuarioModificar, setUsuarioModificar] = useState({
    nombreUsuario: null,
    apellido: null,
    nombre: null,
    dni: null,
    email: null,
    password: null,
  });

  const [form, setForm] = useState({
    id: null,
    tipo: null,
    marca: null,
    modelo: null,
    precio: null,
    stock: null,
  });
  const [autoModificar, setAutoModificar] = useState({
    id: null,
    year: null,
    name: null,
    color: null,
    price: null,
  });
  const handleSeleccion = (e) => {
    if (e.target.value !== "cerrar sesion") {
      setSeleccion(e.target.value);
    } else {
      setSesionActiva(false);
      localStorage.setItem("activo", false);
    }
    console.dir(seleccion);
  };

  const handleSubmitModificar = (e) => {
    e.preventDefault();
    if (e.target.tipoComponente.value === "editar automovil") {
      setAutoModificar({
        id: e.target.idInputModif.value,
        year: e.target.yearInputModif.value,
        name: e.target.nameInputModif.value,
        color: e.target.colorInputModif.value,
        price: e.target.precioInputModif.value,
      });
      setSeleccion(e.target.tipoComponente.value);
    } else if (e.target.tipoComponente.value === "perfil") {
      setUsuarioModificar({
        nombreUsuario: e.target.nombreUsuarioInputModif.value,
        apellido: e.target.apellidoInputModif.value,
        nombre: e.target.nombreInputModif.value,
        dni: e.target.dniInputModif.value,
        email: e.target.emailInputModif.value,
        password: e.target.passwordInputModif.value,
      });
      setSeleccion(e.target.tipoComponente.value);
    } else if (e.target.tipoComponente.value === "editar repuesto") {
      setForm({
        id: e.target.idInputModif.value,
        tipo: e.target.tipoInputModif.value,
        marca: e.target.marcaInputModif.value,
        modelo: e.target.modeloInputModif.value,
        precio: e.target.precioInputModif.value,
        stock: e.target.stockInputModif.value,
      });
      setSeleccion(e.target.tipoComponente.value);
    }
  };

  const data = {
    usuarioModificar,
    autoModificar,
    setSeleccion,
    seleccion,
    handleSeleccion,
    handleSubmitModificar,
    form,
  };
  return (
    <BarraNavegacionContexto.Provider value={data}>
      {children}
    </BarraNavegacionContexto.Provider>
  );
};

export { SeleccionProvider };

export default BarraNavegacionContexto;
