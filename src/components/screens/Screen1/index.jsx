import { Box, Text, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ListadoProductos = ({ productos, onFetchProductos }) => {
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  return (
    <Box maxW="700px" mx="auto" mt="4">
      <Text color="gray.500" fontSize="2em" mb="4">
        Listado de productos
      </Text>
      <Stack spacing="4">
        {productos.map((producto) => (
          <Box
            key={producto.objectId}
            p="4"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <Text fontWeight="bold" fontSize="lg">
              {producto.item} - Precio: ${producto.precio}
            </Text>
            <Text>Categoría: {producto.categoria}</Text>
            <Text>Descripción: {producto.descripcion}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ListadoProductos;
