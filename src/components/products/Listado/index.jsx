import React, { useEffect } from "react";
import { Box, IconButton, Text, SimpleGrid, Stack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import useNotify from "../../../hooks/useNotify";
import Parse from "parse/dist/parse.min.js";

import Producto from "../Producto";
import EditItem from "../EditItem";

const Listado = ({ productos, onFetchProductos, onEditProducto }) => {
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
    <Box my="4" py="4">
      <SimpleGrid columns={4} spacing={10} mx="3em" mb="5em">
        {productos.map((producto) => (
          <Stack columns={1}>
            <Producto producto={producto} />
            <Box display="flex" justifyContent="space-around">
              <EditItem producto={producto} onEditProducto={onEditProducto} />
              <IconButton
                px="5em"
                variant="outline"
                colorScheme="teal"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(producto.objectId)}
              />
            </Box>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default Listado;
