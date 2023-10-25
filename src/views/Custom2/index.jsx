import React, { useEffect, useState } from "react";
import graphQLClient from "../../graphqlClient";
import { GET_CUSTOMVIEWS, GET_LOCAL } from "../../graphqlQueries";
import ScHeader from "../../components/ScHeader";
import { Grid, GridItem } from "@chakra-ui/react";
import ListaProductos from "../../components/products/ListaProductos";

import "./Custom2.css";
import ListaProductosV2 from "../../components/products/ListaProductosV2";

const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));
const hexBg = storedOpciones.hexBg;
const CustomView2 = () => {
  const [customViewData, setCustomViewData] = useState(null);

  useEffect(() => {
    const fetchCustomView = async () => {
      try {
        const data = await graphQLClient.request(GET_CUSTOMVIEWS, {
          id: 2,
        });
        setCustomViewData(data.customview.data.attributes.componentes);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCustomView();
  }, []);
  console.log(customViewData);

  // Función para renderizar componentes dinámicamente
  const renderComponent = (component) => {
    switch (component.estilo) {
      case "ScHeader":
        return <ScHeader title={component.header} />;
      case "ListaProductos":
        // Asegúrate de tener un componente "ListaProductos" que acepte productIds como prop.
        return <ListaProductos productIds={component.productIds} />;
      case "ListaProductosV2":
        // Asegúrate de tener un componente "ListaProductos" que acepte productIds como prop.
        return <ListaProductosV2 productIds={component.productIds} />;
      /*       case "Carrusel":
        // Asegúrate de tener un componente "Carrusel" que acepte productIds como prop.
        return <Carrusel productIds={component.productIds} />; */
      default:
        return null;
    }
  };

  return (
    <div bg={hexBg}>
      {customViewData && (
        <>
          <ScHeader title={customViewData.header} />
          <Grid templateColumns="repeat(3, 2fr)">
            <GridItem m="1" w="32vw" h="90vh">
              {renderComponent(customViewData.col1)}
            </GridItem>
            <GridItem m="1" w="32vw" h="90vh">
              {renderComponent(customViewData.col2)}
            </GridItem>
            <GridItem m="1" w="32vw" h="90vh">
              {renderComponent(customViewData.col3)}
            </GridItem>
          </Grid>
        </>
      )}
    </div>
  );
};

export default CustomView2;
