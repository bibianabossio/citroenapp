import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Registrarse from "./components/Registrarse/Registrarse";
import Main from "./components/Main/Main";
import "./index.css";
import { SeleccionProvider } from "./context/BarraNavegacionContexto";

import { useJwt } from "react-jwt";
let tokenExpirado =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzYwNDU0ODJ9.m4VPBh7C8bjwuJgg3DAg0OZt_cOzzKmFvp258R9B1Fw";
function App() {
  const [sesionActiva, setSesionActiva] = useState(false);

  const { isExpired } = useJwt(
    JSON.parse(localStorage.getItem("sesion"))?.token
      ? JSON.parse(localStorage.getItem("sesion")).token
      : tokenExpirado
  );
 

  useEffect(() => {
    if (localStorage.getItem("activo") === "true") {
      if (!isExpired) {
        setSesionActiva(true);
  
      } else {
        setSesionActiva(false);
      }
    } else {
      setSesionActiva(false);
    }
  }, [sesionActiva]);

  return (
    <Router>
     
        <SeleccionProvider setSesionActiva={setSesionActiva}>
          <Switch>
            <Route exact path="/login">
              {!sesionActiva ? (
                <Login
                  setSesionActiva={setSesionActiva}
                  sesionActiva={sesionActiva}
                />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>
            <Route exact path="/singin">
              <Registrarse />
            </Route>
            <Route exact path="/">
              {!sesionActiva ? (
                <Redirect exact to="/login" />
              ) : (
                <Main setSesionActiva={setSesionActiva} />
              )}
            </Route>
          </Switch>
        </SeleccionProvider>
     
    </Router>
  );
}

export default App;
