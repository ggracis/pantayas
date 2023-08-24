import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Text,
  SimpleGrid,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useNotify from "../../../hooks/useNotify";
import Parse from "parse/dist/parse.min.js";

import Producto from "../Producto";


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
    <Box >
      <Text color="gray.500" fontSize="2em" maxW="700px" my="2em" ml='1.5em'>
        Productos Listados
      </Text>
      <SimpleGrid columns={4} spacing={10} mx='3em' mb='5em'>
        {productos.map((producto) => (

          <Stack columns={1}>
            <Producto producto={producto} />
            <Box display='flex' justifyContent='space-around'>

              <EditItem producto={producto} onEditProducto={onEditProducto} />
              <IconButton
                px='5em'
                variant="outline"
                colorScheme="teal"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(producto.objectId)}
              />
            </Box>
          </Stack>
        ))}
      </SimpleGrid >
    </Box>
  );
};

const EditItem = ({ producto, onEditProducto }) => {

  const [productoEdit, setEditProducto] = useState({
    item: producto.item,
    precio: producto.precio,
    descripcion: producto.descripcion,
    categoria: producto.categoria,
    objectId: producto.objectId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onEditProducto(productoEdit);


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const { item, precio, descripcion, categoria } = productoEdit;


  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)

  return (
    <>

      <IconButton
        px='5em'
        variant="outline"
        colorScheme="teal"
        icon={<EditIcon />}
        onClick={onOpen}
      />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar producto</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="item">Nombre del item:</FormLabel>
                <Input
                  type="text"
                  name="item"
                  value={item}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="precio">Precio:</FormLabel>
                <Input
                  type="text"
                  name="precio"
                  value={precio}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Input
                  type="text"
                  name="categoria"
                  value={categoria}
                  onChange={handleInputChange}
                />
              </FormControl>

            </ModalBody>

            <ModalFooter alignItems='flex-end'>
              <Button type="submit" mr='2em' onClick={onClose}>
                Cambiar
              </Button>
              <Button onClick={onClose} bg='red.600' color='white'>Salir</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Listado;
