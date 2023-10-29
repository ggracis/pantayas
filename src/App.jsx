import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import UsuarioForm from "./components/Users/Form";
import Encabezado from "./components/Encabezado";
import ModPreferencias from "./components/Users/ModPreferencias";
import CustomView1 from "./views/Custom1";
import CustomView2 from "./views/Custom2";
import BuscarProductos from "./components/products/BuscarProductos";
import UpdatePrecios from "./UpdatePrecios";
import graphQLClient from "./graphqlClient";
import { GET_LOCAL } from "./graphqlQueries";
import OnBoarding from "./components/onboarding";

/* Viejos
import Listado from "./components/products/Listado";
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";
import Screen3 from "./components/screens/Screen3";
import ProductTable from "./components/products/TablaProductos";
import EditarAgregarProducto from "./components/products/EditarAgregarProducto";
*/

function App() {
  // Define el estado para las opciones del usuario
  const [opciones, setOpciones] = useState({
    hexHead: "",
    hexBg: "",
    hexTexto: "",
    hexBrand1: "",
    hexBrand2: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    web: "",
    nombreLocal: "",
    direccion: "",
    logoURL: "",
  });
  // Carga las opciones desde el almacenamiento local al cargar la aplicación
  useEffect(() => {
    const storedOpciones = localStorage.getItem("userOpciones");
    if (storedOpciones) {
      setOpciones(JSON.parse(storedOpciones));
    }
  }, []);

  // Guarda las opciones en el almacenamiento local cuando cambian
  useEffect(() => {
    localStorage.setItem("userOpciones", JSON.stringify(opciones));
  }, [opciones]);

  // Traer las opciones de DB
  useEffect(() => {
    graphQLClient
      .request(GET_LOCAL)
      .then((data) => {
        const opcionesData =
          data.local.data.attributes.opciones.attributes.opciones;
        // Extraer el valor de "logoURL" de las opcionesData
        const logoURL =
          "http://54.94.34.59:1337" +
          data.local.data.attributes.logoURL.data.attributes.url;

        // Actualizar el estado de opciones, incluyendo logoURL << Esto se guarda en el localStorage
        setOpciones({
          ...opciones,
          ...opcionesData,
          logoURL: logoURL,
        });
      })
      .catch((error) => {
        console.error("Error al cargar la configuración:", error);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Encabezado
              tituloEncabezado="Home"
              bajadaEncabezado="Bienvenido a la página principal"
            />
          </>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />

      <Route
        path="/usuario"
        element={
          <>
            <NavBar />
            <Encabezado
              tituloEncabezado="Usuarios"
              bajadaEncabezado="Agregar un nuevo usuario"
            />
            <UsuarioForm />
          </>
        }
      />

      <Route
        path="/productos"
        element={
          <>
            <NavBar />
            <Encabezado tituloEncabezado="Buscar de productos" />
            <BuscarProductos />
          </>
        }
      />

      <Route
        path="/preferencias"
        element={
          <>
            <NavBar />
            <Encabezado
              tituloEncabezado="Preferencias de usuario"
              bajadaEncabezado="Personaliza todas tus pantallas"
            />
            <OnBoarding />
          </>
        }
      />

      <Route
        path="/c1"
        element={
          <>
            <CustomView1 />
          </>
        }
      />

      <Route
        path="/c2"
        element={
          <>
            <CustomView2 />
          </>
        }
      />

      <Route
        path="/ponerPrecios" // Un componente para ponerle precio a los productos que no tienen
        element={
          <>
            <UpdatePrecios />
          </>
        }
      />
    </Routes>
  );
}

export default App;
