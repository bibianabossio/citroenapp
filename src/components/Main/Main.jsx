import * as React from "react";
import { useContext } from "react";

import Menu from "../Menu/Menu";
import "./Main.css";
import BarraNavegacion from "../BarraNavegacion/BarraNavegacion";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";

import CrearRepuesto from "../CrearRepuesto/CrearRepuesto";
import CrearAutomovil from "../CrearAutomovil/CrearAutomovil";
import EditarAutomovil from "../EditarAutomovil/EditarAutomovil";
import EditarRepuesto from "../EditarRepuesto/EditarRepuesto";
import Perfil from "../Perfil/Perfil";
const Main = ({ sesionActiva }) => {
  const { seleccion, form } = useContext(BarraNavegacionContexto);

  const seleccionado = () => {
    switch (seleccion) {
      case "crear repuesto":
        return <CrearRepuesto />;
      case "menu":
        return <Menu />;
      case "perfil":
        return <Perfil />;
      case "crear automovil":
        return <CrearAutomovil />;
      case "editar automovil":
        return <EditarAutomovil />;
      case "editar repuesto": {
        return <EditarRepuesto data={form} />;
      }

      default:
        return <h1>No project match {seleccion}</h1>;
    }
  };

  return (
    <>
      <BarraNavegacion />
      {seleccionado()}
    </>
  );
};
export default Main;
