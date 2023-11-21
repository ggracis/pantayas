import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScHeader from "../../components/ScHeader";
import ListaProductos from "../../components/products/ListaProductos";
import ListaProductosV2 from "../../components/products/ListaProductosV2";
import graphQLClient from "../../graphqlClient";
import { GET_CUSTOMVIEWS, GET_LOCAL } from "../../graphqlQueries";

const CustomView2 = () => {
  const [customViewData, setCustomViewData] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));

  const hexBg = storedOpciones ? storedOpciones.hexBg : "#ffffff";

  const [defaultCustomViewId, setDefaultCustomViewId] = useState(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const localData = await graphQLClient.request(GET_LOCAL);
        const tvId = params.get("tvId") || "1";
        const defaultCV = localData.local.data.attributes.tvs.data.find(
          (tv) => tv.id === tvId
        ).attributes.defaultCV;
        setDefaultCustomViewId(defaultCV);
      } catch (error) {
        console.error("Error fetching local data: ", error);
      }
    };

    fetchLocalData();
  }, [params]);

  useEffect(() => {
    const fetchCustomView = async (id) => {
      try {
        const data = await graphQLClient.request(GET_CUSTOMVIEWS, { id });
        setCustomViewData(data.customview.data.attributes.componentes);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCustomView(defaultCustomViewId);
  }, [defaultCustomViewId]);

  const checkForChanges = async () => {
    try {
      const data = await graphQLClient.request(GET_LOCAL);
      const tvId = params.get("tvId") || "1";
      const newDefaultCV = data.local.data.attributes.tvs.data.find(
        (tv) => tv.id === tvId
      )?.attributes.defaultCV;
      console.log(newDefaultCV);
      console.log(defaultCustomViewId);

      if (
        newDefaultCV !== null &&
        newDefaultCV !== undefined &&
        newDefaultCV !== defaultCustomViewId
      ) {
        console.log("Cambio detectado");
        setDefaultCustomViewId(newDefaultCV);
      } else {
        console.log("Sin cambios");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkForChanges, 10000);
    return () => clearInterval(intervalId);
  }, []);

  console.log("customViewData: ", customViewData);

  // Función para renderizar componentes dinámicamente
  const renderComponent = (component) => {
    if (!component || !component.estilo) {
      return null;
    }

    switch (component.estilo) {
      case "ScHeader":
        return <ScHeader title={component.header} />;
      case "ListaProductos":
        return (
          <ListaProductos
            productIds={component.productIds}
            titulo={component.titulo}
          />
        );
      case "ListaProductosV2":
        return (
          <ListaProductosV2
            productIds={component.productIds}
            titulo={component.titulo}
          />
        );
      case "lista-1":
        return (
          <ListaProductos
            productIds={component.productIds}
            titulo={component.titulo}
          />
        );
      case "lista-2":
        return (
          <ListaProductosV2
            productIds={component.productIds}
            titulo={component.titulo}
          />
        );
      /*       case "Carrusel":
        // Asegúrate de tener un componente "Carrusel" que acepte productIds como prop.
        return <Carrusel productIds={component.productIds} />; */
      default:
        return null;
    }
  };

  const renderColumns = (data) => {
    const columnKeys = Object.keys(data).filter((key) => key.startsWith("col"));

    return (
      <Grid templateColumns="repeat(3, 2fr)">
        {columnKeys.map((key) => (
          <GridItem key={key} m="1" w="32vw" flex="1">
            {renderComponent(data[key])}
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Box bg={hexBg} h="100vh">
      {customViewData && (
        <>
          <ScHeader title={customViewData.header} />
          {renderColumns(customViewData)}
        </>
      )}
    </Box>
  );
};

export default CustomView2;
