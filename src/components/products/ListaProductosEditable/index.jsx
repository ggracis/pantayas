import { useEffect, useState } from "react";
import { DELETE_PRODUCTO, GET_PRODUCTO } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import {
  Box,
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import EditarAgregarProducto from "../EditarAgregarProducto";
import EditarProducto from "../EditarProducto";

function ListaProductosEditable({ productIds }) {
  const [editingProductId, setEditingProductId] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [abrirDialogo, setAbrirDialogo] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await Promise.all(
          productIds.map(async (productId) => {
            const data = await graphQLClient.request(GET_PRODUCTO, {
              productId,
            });
            return data.producto.data;
          })
        );
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, [productIds]);

  const formatPrices = (precios) => {
    if (precios && Object.keys(precios).length > 0) {
      return Object.entries(precios).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> ${value}
        </div>
      ));
    } else {
      return "N/A";
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const { deleteProducto } = await graphQLClient.request(DELETE_PRODUCTO, {
        idProducto: productId,
      });

      if (deleteProducto) {
        const productName = productos.find((p) => p.id === productId).attributes
          .nombre;
        toast({
          title: "Producto eliminado",
          description: `El producto "${productName}" se eliminó correctamente`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setProductos(productos.filter((p) => p.id !== productId));
      } else {
        throw new Error("No se pudo eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast({
        title: "Error al eliminar el producto",
        description: "Hubo un error al intentar eliminar el producto",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const confirmDeleteProduct = (productId) => {
    setProductoSeleccionado(productId);
    setAbrirDialogo(true);
  };

  const handleDeleteConfirmation = () => {
    if (productoSeleccionado) {
      deleteProduct(productoSeleccionado);
      setProductoSeleccionado(null);
      setAbrirDialogo(false);
    }
  };

  const closeDialog = () => {
    setProductoSeleccionado(null);
    setAbrirDialogo(false);
  };

  return (
    <Box mt={4}>
      <EditarAgregarProducto />
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
                      {producto.attributes.categoria &&
                      producto.attributes.categoria.data
                        ? producto.attributes.categoria.data.attributes.nombre
                        : ""}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="1em" lineHeight="1em">
                      {producto.attributes.categoria &&
                      producto.attributes.subcategoria.data
                        ? producto.attributes.subcategoria.data.attributes
                            .nombre
                        : ""}
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
                        onClick={() => confirmDeleteProduct(producto.id)}
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
      {abrirDialogo && (
        <Modal onClose={closeDialog} isOpen={abrirDialogo}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Eliminar Producto</ModalHeader>
            <ModalBody>
              <Text>¿Estás seguro de que quieres eliminar este producto?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleDeleteConfirmation}
              >
                Eliminar
              </Button>
              <Button variant="ghost" onClick={closeDialog}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default ListaProductosEditable;
