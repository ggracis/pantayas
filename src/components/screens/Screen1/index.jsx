import { Box, Text, SimpleGrid, useColorMode, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";

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

  return (
    <Box>
      <Text
        color={colorMode === "light" ? "black" : "White"}
        fontSize="2em"
        mb="4"
        textAlign="center"
        textTransform="uppercase"
        fontFamily={["arial", "Rowdies", "Caprasimo"]}
        mt="1em"
      >
        PANADERIA NTQJ
      </Text>
      <SimpleGrid
        columns={[1, 2, 3, 4]} // Ajustar el número de columnas según el ancho de pantalla
        spacing="1em"
        m="2em"
        px={[4, 8, 10, 20]} // Ajustar los márgenes laterales según el ancho de pantalla
      >
        {productos.map((producto) => (
          <Box
            key={producto.objectId}
            p="4"
            borderWidth="1px"
            border
            borderRadius="md"
            boxShadow="sm"
            bg={colorMode === "light" ? "#353535" : "#e6e6e6"}
            color={colorMode === "light" ? "white" : "black"}
          >
            <Text fontWeight="bold" fontSize="x-large" fontFamily={fontText}>
              {producto.item}
            </Text>
            <Badge
              variant="solid"
              colorScheme="green"
              fontFamily={["arial", "Rowdies", "Caprasimo"]}
              w="9em"
              textAlign="center"
              fontWeight="extrabold"
              color={colorMode === "light" ? "white" : "black"}
            >
              {producto.categoria}
            </Badge>
            <Text fontFamily={fontText} pt="0.5em">
              {producto.descripcion}
            </Text>
            <Text
              fontWeight="bold"
              fontSize="x-large"
              textAlign="end"
              pt="0.2em"
              fontFamily={fontText}
            >
              ${producto.precio}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ListadoProductos;
