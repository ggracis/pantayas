import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";

const ListadoProductos = ({ productos, onFetchProductos }) => {
  const intervalDelay = 5 * 60 * 1000; // 5 minutos en milisegundos
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useInterval(() => {
    const now = new Date();
    const elapsedTime = now - lastUpdate;

    if (elapsedTime >= intervalDelay) {
      fetchProductos();
      setLastUpdate(now);
      console.log("Productos actualizados.");
    } else {
      const remainingTime = intervalDelay - elapsedTime;
      console.log(
        `Faltan ${Math.floor(
          remainingTime / 1000
        )} segundos para la próxima actualización.`
      );
    }
  }, 30 * 1000); // 30 segundos en milisegundos

  const fontText = ["arial", "Rowdies", "Caprasimo", "Courier Prime"];

  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  const categorias = {};
  productos.forEach((producto) => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  return (
    <>
      <ScHeader />
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="space-between"
        p="1em"
      >
        {Object.keys(categorias).map((categoria) => (
          <Box key={categoria} flex="1" minWidth="250px">
            <Text fontSize="1.5em" fontWeight="bold">
              {categoria}
            </Text>
            {categorias[categoria].map((producto) => (
              <Box
                key={producto.objectId}
                p="2"
                m="1"
                borderWidth="1px"
                border
                borderRadius="md"
                boxShadow="sm"
                bg={colorMode === "light" ? "#353535" : "#e6e6e6"}
                color={colorMode === "light" ? "white" : "black"}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <div>
                    <Text
                      fontSize="1.5em"
                      fontWeight="bold"
                      fontFamily={fontText}
                    >
                      {producto.item}
                    </Text>
                    <Text fontSize="0.9em" fontFamily={fontText}>
                      {producto.descripcion}
                    </Text>
                  </div>
                  <Text
                    fontSize="1.75em"
                    textAlign="end"
                    fontFamily={fontText}
                    float={"right"}
                  >
                    ${producto.precio}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListadoProductos;
