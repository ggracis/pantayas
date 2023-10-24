import React, { useEffect } from "react";
import { Box, IconButton, SimpleGrid, Stack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useNotify from "../../../hooks/useNotify";
import EditarAgregarProducto from "../EditarAgregarProducto";
import Producto from "../Producto";

const Listado = ({ productos, onFetchProductos, onEditProducto }) => {
  const { notify } = useNotify();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  const handleEdit = async (producto) => {
    try {
      await onEditProducto(producto);
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  return (
    <Box my="4" py="4">
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing="1em"
        m="2em"
        px={[4, 8, 10, 20]}
      >
        {productos.map((producto) => (
          <Stack key={producto.objectId} columns={1}>
            <Producto producto={producto} />

            <Box display="flex" justifyContent="space-around">
              <EditarAgregarProducto
                modoEdicion={true}
                productoEdicion={producto}
                onAction={handleEdit}
              />

              <IconButton
                variant="outline"
                width="40%"
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={async () => {
                  await eliminarProducto(producto.objectId);
                  fetchProductos();
                }}
              />
            </Box>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Listado;
