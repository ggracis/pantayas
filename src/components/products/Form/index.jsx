import React, { useState } from "react";
import {
  Box,
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
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { MdAddCircleOutline, MdOutlineSave } from "react-icons/md";

const ProductoForm = ({ onAgregarProducto }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    item: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await onAgregarProducto(nuevoProducto);

    setNuevoProducto({
      item: "",
      precio: "",
      descripcion: "",
      categoria: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const { item, precio, descripcion, categoria } = nuevoProducto;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  return (
    <>
      <Box alignItems="center" display="flex" flexDir="column">
        <Button
          onClick={onOpen}
          rightIcon={<MdAddCircleOutline fontSize="1.75em" />}
          colorScheme="teal"
          variant="outline"
        >
          Agregar producto
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar un nuevo producto</ModalHeader>
          <form onSubmit={handleFormSubmit}>
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

            <ModalFooter alignItems="flex-end">
              <Button
                mr={3}
                type="submit"
                onClick={onClose}
                rightIcon={<MdOutlineSave fontSize="1.75em" />}
                colorScheme="teal"
                variant="outline"
              >
                Guardar
              </Button>
              <Button onClick={onClose} colorScheme="red" variant="outline">
                Salir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductoForm;
