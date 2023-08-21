import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductoForm from "./components/products/Form";
import Listado from "./components/products/Listado";
import UsuarioForm from "./components/Users/Form";
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "WNBfJEeklSm2WQ7p92cJDtiPs7lpJyrkUErWj2uJ";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "bMSVQiyAwrqenmqdhc11M7gl1BcvlXEX5H1nJcoX";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const Producto = Parse.Object.extend("Producto");
    const query = new Parse.Query(Producto);
    const results = await query.find();
    const productosData = results.map((result) => result.toJSON());
    setProductos(productosData);
  };

  const handleAgregarProducto = async (nuevoProducto) => {
    const Producto = Parse.Object.extend("Producto");
    const producto = new Producto();

    producto.set({
      item: nuevoProducto.item,
      precio: nuevoProducto.precio,
      descripcion: nuevoProducto.descripcion,
      categoria: nuevoProducto.categoria,
    });

    try {
      await producto.save();
      console.log("Producto guardado exitosamente");
      setProductos((prevProductos) => [...prevProductos, producto.toJSON()]);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

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
            <NavBar />
            <UsuarioForm />
          </>
        }
      />
      <Route
        path="/productos"
        element={
          <>
            <NavBar />
            <ProductoForm onAgregarProducto={handleAgregarProducto} />
            <Listado productos={productos} onFetchProductos={fetchProductos} />
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
    </Routes>
  );
}

export default App;
