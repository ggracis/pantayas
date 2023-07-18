import React, { useEffect } from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useNotify from "../../../hooks/useNotify";
import Parse from "parse/dist/parse.min.js";

const Listado = ({ productos, onFetchProductos }) => {
  const { notify } = useNotify();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  const handleDelete = async (id) => {
    const Producto = Parse.Object.extend("Producto");
    const query = new Parse.Query(Producto);
    const producto = await query.get(id);
    await producto.destroy();
    notify("info", `Producto con ID ${id} eliminado (falso)`);
    fetchProductos();
  };

  return (
    <Box maxW="700px" mx="auto" mt="4">
      <Text color="gray.500" fontSize="2em">
        Listado de productos
      </Text>
      <ul>
        {productos.map((producto) => (
          <li key={producto.objectId}>
            <Text fontWeight="bold">
              {producto.item} - Precio: {producto.precio}
            </Text>
            <Text>
              Categoría: {producto.categoria} - Descripción:{" "}
              {producto.descripcion}
            </Text>
            <IconButton
              m="2"
              variant="outline"
              colorScheme="teal"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(producto.objectId)}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Listado;
