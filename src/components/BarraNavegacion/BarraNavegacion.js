import * as React  from "react";
import {useContext} from "react";
import "./BarraNavegacion.css";
import Box from "@mui/material/Box";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";
import { Button } from "@mui/material";

const BarraNavegacion = ({setSesionActiva}) => {

  const {handleSeleccion} = useContext(BarraNavegacionContexto)
  return (
    <>
      
        <Box className="barraNavegacion">
          <Button onClick={handleSeleccion} style={{color:'white'}}  value="menu" >Inicio</Button>
          <Button onClick={handleSeleccion} style={{color:'white'}}  value="perfil" >Perfil</Button>
          <Button onClick={handleSeleccion} style={{color:'white'}}  value="crear repuesto" >Crear Repuesto</Button>
          <Button onClick={handleSeleccion} style={{color:'white'}}  value="crear automovil" >Crear Automovil</Button>
          <Button onClick={handleSeleccion} style={{color:'white'}}  value="cerrar sesion" >Cerrar Sesion</Button>
       
        </Box>
     
    </>
  );
};

export default BarraNavegacion;

