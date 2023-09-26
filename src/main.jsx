import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { GET_PANTALLA } from "./graphqlQueries";
import graphQLClient from "./graphqlClient";

// Función para crear el tema personalizado a partir de la configuración en JSON
const createCustomTheme = (opciones) => {
  return extendTheme({
    colors: {
      brand: opciones.brand,
      // ...otros colores según la configuración
    },
    styles: {
      global: (props) => ({
        body: {
          bg: opciones.bg,
          color: opciones.color,
          fontFamily: opciones["font-family"],
          // ...otros estilos globales según la configuración
        },
        // ...otros estilos globales según la configuración
      }),
    },
  });
};

function Main() {
  const [customTheme, setCustomTheme] = useState(null);

  useEffect(() => {
    // Realiza la consulta GraphQL para obtener la configuración
    graphQLClient
      .request(GET_PANTALLA)
      .then((data) => {
        const opciones = data.pantalla.data.attributes.opciones;
        console.log("Opciones del usuario: ", opciones);
        // Crea el tema personalizado a partir de la configuración
        const theme = createCustomTheme(opciones);
        // Establece el tema personalizado
        setCustomTheme(theme);
      })
      .catch((error) => {
        console.error("Error al cargar la configuración:", error);
      });
  }, []);

  if (!customTheme) {
    // Puedes mostrar una pantalla de carga aquí mientras se obtiene la configuración
    return <div>Conectacndo a la API...</div>;
  }

  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
