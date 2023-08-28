import {
  Box,
  Text,
  SimpleGrid,
  useColorMode,
  Badge,
  Flex,
} from "@chakra-ui/react";
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
              {producto.tituloProducto}
            </Text>
            <Badge
              variant="solid"
              colorScheme="green"
              fontFamily={["arial", "Rowdies", "Caprasimo"]}
              textAlign="center"
              fontWeight="extrabold"
              color={colorMode === "light" ? "white" : "black"}
            >
              {producto.categoria} - {producto.subcategoria}
            </Badge>
            <Text fontFamily={fontText} pt="0.5em">
              {producto.descripcion}
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              {producto.titulosVariantes.map((titulo, index) => {
                if (producto.preciosVariantes[index] !== "") {
                  return (
                    <div
                      key={index}
                      style={{
                        textAlign: "center",
                        margin: "5px",
                      }}
                    >
                      <Text
                        fontSize={index === 0 ? "1.75em" : "1.5em"}
                        fontWeight="bold"
                        color={index === 0 ? "green.500" : "inherit"}
                      >
                        ${producto.preciosVariantes[index]}
                      </Text>
                      <Text fontSize="0.9em" lineHeight="0.4em">
                        {titulo}
                      </Text>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ListadoProductos;
