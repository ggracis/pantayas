import React, { useEffect, useState } from "react";
import { GET_PRODUCTO } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import {
  Box,
  Center,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditarAgregarProducto from "../EditarAgregarProducto";

function ListaProductosEditable({ productIds }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await Promise.all(
          productIds.map(async (productId) => {
            const data = await graphQLClient.request(GET_PRODUCTO, {
              productId: productId,
            });
            return data.producto.data;
          })
        );
        setProductos(productosData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, [productIds]);
  console.log("Productos: ", productos);

  // Función para formatear los precios
  const formatPrices = (precios) => {
    if (precios) {
      return Object.entries(precios).map(([key, value]) => {
        return (
          <div key={key}>
            <strong>{key}:</strong> ${value}
          </div>
        );
      });
    } else {
      return "N/A"; // O cualquier otro mensaje que desees para precios nulos
    }
  };

  return (
    <>
      <Box mt={4}>
        <EditarAgregarProducto />
      </Box>
      <Box
        w="80vw"
        p={4}
        bg="whiteAlpha.50"
        m="auto"
        mt={8}
        mb={8}
        borderRadius="lg"
      >
        <TableContainer>
          <Table variant="striped" colorScheme="whiteAlpha" size="sm">
            <Thead>
              <Tr>
                <Th>Producto</Th>
                <Th>Categoría</Th>
                <Th>SubCategoría</Th>
                <Th>Precio</Th>
                <Th fontWeight="bold" textAlign="center">
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {productos.map((producto) => (
                <Tr key={producto.id}>
                  <Td>
                    <Text fontSize="1.25em" lineHeight="1em" fontWeight="bold">
                      {producto.id}-{producto.attributes.nombre}
                    </Text>
                    <Text fontSize="1em" lineHeight="1em">
                      {producto.attributes.descripcion}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="1em" lineHeight="1em">
                      {producto.attributes.categorias.data
                        .map((categoria) => categoria.attributes.nombre)
                        .join(", ")}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="1em" lineHeight="1em">
                      {producto.attributes.subcategorias.data
                        .map((subcategoria) => subcategoria.attributes.nombre)
                        .join(", ")}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{formatPrices(producto.attributes.precios)}</Text>
                  </Td>
                  <Td>
                    <Center>
                      <IconButton
                        ml={2}
                        colorScheme="red"
                        icon={<FaRegTrashAlt />}
                      />

                      <EditarAgregarProducto productoEdicion={producto.id} />
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListaProductosEditable;
