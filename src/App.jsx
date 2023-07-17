import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { PersonComponent } from "./components/Test";
import { Navigate, Route, Routes } from "react-router-dom";
import UsuarioForm from "./components/Users/Form";
import NavBar from "./components/NavBar";
import ProductoForm from "./components/products/Form";
import Listado from "./components/products/Listado";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "WNBfJEeklSm2WQ7p92cJDtiPs7lpJyrkUErWj2uJ";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "bMSVQiyAwrqenmqdhc11M7gl1BcvlXEX5H1nJcoX";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <h1>Home</h1>
            <p>Esta es la página de inicio</p>
          </>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
      <Route
        path="/usuario"
        element={
          <>
            <NavBar /> <UsuarioForm />
          </>
        }
      />
      <Route
        path="/productos"
        element={
          <>
            <NavBar /> <ProductoForm /> <Listado />
          </>
        }
      />
      <Route path="/test" element={<PersonComponent />} />
    </Routes>
  );
}

export default App;
