import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Listado from "./components/products/Listado";
import UsuarioForm from "./components/Users/Form";
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";
import Screen3 from "./components/screens/Screen3";
import ProductTable from "./components/products/TablaProductos";
import Encabezado from "./components/Encabezado";
import {
  fetchProductos,
  agregarProducto,
  editarProducto,
} from "./productService"; // Importar las funciones
import EditarAgregarProducto from "./components/products/EditarAgregarProducto";
import ModPreferencias from "./components/Users/ModPreferencias";
import CustomView1 from "./views/Custom1";
import graphQLClient from "./graphqlClient";
import { GET_PANTALLA } from "./graphqlQueries";

function App() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const productosData = await fetchProductos();
    setProductos(productosData);
  };

  const handleAgregarProducto = async (nuevoProducto) => {
    try {
      await agregarProducto(nuevoProducto);
      await cargarProductos();
    } catch (error) {
      // Manejar el error
    }
  };

  const handleEditarProducto = async (productoEdit) => {
    try {
      await editarProducto(productoEdit);
      await cargarProductos();
    } catch (error) {
      // Manejar el error
    }
  };

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
      .request(GET_PANTALLA)
      .then((data) => {
        const opcionesData =
          data.pantalla.data.attributes.opciones.attributes.opciones;
        // Extraer el valor de "logoURL" de las opcionesData
        const logoURL =
          "http://54.94.34.59:1337" +
          data.pantalla.data.attributes.logoURL.data.attributes.url;

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
            <Encabezado tituloEncabezado="Productos" />
            <EditarAgregarProducto onAction={handleAgregarProducto} />
            <Listado
              productos={productos}
              onFetchProductos={fetchProductos}
              onEditProducto={handleEditarProducto}
            />
          </>
        }
      />

      <Route
        path="/tablaProductos"
        element={
          <>
            <NavBar />
            <Encabezado
              tituloEncabezado="Tabla de productos"
              bajadaEncabezado="Doble click en una celda para editarla"
            />
            <EditarAgregarProducto onAction={handleAgregarProducto} />
            <ProductTable
              productos={productos}
              onFetchProductos={fetchProductos}
              onEditProducto={handleEditarProducto}
              setProductos={setProductos}
            />
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
            <ModPreferencias />
          </>
        }
      />

      <Route
        path="/screen"
        element={
          <>
            <Screen1 productos={productos} onFetchProductos={fetchProductos} />
          </>
        }
      />

      <Route
        path="/screen2"
        element={
          <>
            <Screen2 productos={productos} onFetchProductos={fetchProductos} />
          </>
        }
      />

      <Route
        path="/screen3"
        element={
          <>
            <Screen3 productos={productos} onFetchProductos={fetchProductos} />
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
    </Routes>
  );
}

export default App;
