import React, { useContext, useState,useEffect } from "react";
import "./Perfil.css";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarraNavegacionContexto from "../../context/BarraNavegacionContexto";

const Perfil = () => {
  const [objeto, setObjeto] = useState([])
  const { setSeleccion } = useContext(
    BarraNavegacionContexto
  );

  let datos=localStorage.getItem("sesion")
  let localStorageEnArray=JSON.parse(datos)
  useEffect ( async () => {
      
    try {
    let config = {
      method: "GET",
      headers: {
        Authorization: localStorageEnArray.bearer +" " +localStorageEnArray.token,
        Accept: "application/json",
        "content-type": "application/json",
      }
    };
    const res = await fetch(
      `https://concesionario-crud.herokuapp.com/me`,
       config
       );
    const data = await res.json();
    setObjeto(data);
   
      
    } catch (error) {
      
    }
   
  },[])
  


  const editarUsuario = async (event) => {
    event.preventDefault();
    
  
    let resNombreUsuario = event.target.parentElement[0].value;
    let resApellido = event.target.parentElement[1].value
      ? event.target.parentElement[1].value
      : event.target.parentElement[1].placeholder;
    let resNombre = event.target.parentElement[2].value
      ? event.target.parentElement[2].value
      : event.target.parentElement[2].placeholder;
    let resDNI = event.target.parentElement[3].value
      ? event.target.parentElement[3].value
      : event.target.parentElement[3].placeholder;
    let resEmail = event.target.parentElement[4].value
      ? event.target.parentElement[4].value
      : event.target.parentElement[4].placeholder;
    let resPassword = event.target.parentElement[5].value
      ? event.target.parentElement[5].value
      : event.target.parentElement[5].placeholder;  
      console.log(resNombreUsuario,resApellido,resNombre, resDNI,resEmail);

     try {
          let config = {
        method: "PUT",
        headers: {
          Authorization: localStorageEnArray.bearer + " " + localStorageEnArray.token,
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: resNombreUsuario,
          apellido: resApellido,
          nombre: resNombre,
          dni: resDNI,
          email: resEmail,
         password: resPassword,
        }),
      };
      let res = await fetch(
        `https://concesionario-crud.herokuapp.com/usuarios`,
        config
      );
      let resEnJson = await res.json();
            if (res.status === 200) {
      
        toast("Usuario Actualizado", {
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
        toast(resEnJson.mensaje, {
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
      console.log(" hubo un error :( ", error);
    } 
  };

  const eliminarUsuario = async (event) => {
    event.preventDefault();
    

    try {
       let sesion = JSON.parse(localStorage.getItem("sesion")); 
      let config = {
        method: "DELETE",
        headers: {
          Authorization: sesion.bearer +" " +sesion.token, 
          Accept: "application/json",
          "content-type": "application/json",
        },
       
      };
      let res = await fetch(
        `https://concesionario-crud.herokuapp.com/me`,
        config
      );
      let resEnJson = res;
      if (res.status === 204) {
        
        toast("Usuario Eliminado", {
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
      console.log(" hubo un error :( ", error);
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-content">
        {" "}
        <Title className="title-label" text="Mi Perfil" /> <br />
        <form onSubmit={editarUsuario} id="usuarioModificar">
          Usuario 
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Usuario"
            disabled
            value={objeto.usuario}
          />
          <br />
          Apellido
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Apellido"
            placeholder={objeto.apellido}
          />
          <br />
          Nombre
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Nombre"
            placeholder={objeto.nombre}
          />
          <br />
          DNI
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Número de DNI"
            placeholder={objeto.dni}
          />
          <br />
          Dirección de mail
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Dirección de mail"
            placeholder={objeto.email}
          />
          <br />
          Password
          <br />
          <input
            className="perfil-style"
            type="text"
            name="Password"
            placeholder={objeto.password}
          /> 
          <br />
          <br />
          <br />
          <button
            
            onClick={editarUsuario}
            className="submit-button"
          >
            Editar Usuario
          </button>
          <button
            onClick={eliminarUsuario}
           className="submit-button"
          >
            Eliminar Usuario
          </button>
          <ToastContainer> </ToastContainer>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
