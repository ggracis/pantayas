import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const ProductoForm = ({ onAgregarProducto }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    item: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });

  const handleSubmit = async (e) => {
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
        <Button onClick={onOpen} width="20em">
          Agregar producto 💾
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar un nuevo producto</ModalHeader>
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

            <ModalFooter alignItems="flex-end">
              <Button type="submit" mr="2em" onClick={onClose}>
                Agregar
              </Button>
              <Button onClick={onClose} bg="red.600" color="white">
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
