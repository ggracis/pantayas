import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { Box, Text, VStack } from "@chakra-ui/react";

const Listado = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const Producto = Parse.Object.extend("Producto");
    const query = new Parse.Query(Producto);
    const results = await query.find();
    const productosData = results.map((result) => result.toJSON());
    setProductos(productosData);
  };

  return (
    <Box mt="4">
      <Text color="gray.500" fontSize="2em">
        Listado de productos
      </Text>
      <VStack spacing="4" align="start">
        {productos.map((producto) => (
          <Box key={producto.objectId}>
            <Text fontWeight="bold">{producto.item}</Text>
            <Text>Precio: {producto.precio}</Text>
            <Text>Descripción: {producto.descripcion}</Text>
            <Text>Categoría: {producto.categoria}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Listado;
