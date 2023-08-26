import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { MdOutlineSave, MdMode } from "react-icons/md";

const EditarAgregarProducto = ({ onAction, modoEdicion, productoEdicion }) => {
  const [producto, setProducto] = useState({
    item: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });

  useEffect(() => {
    if (modoEdicion && productoEdicion) {
      setProducto(productoEdicion);
    }
  }, [modoEdicion, productoEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAction(producto);
    setProducto({
      item: "",
      precio: "",
      descripcion: "",
      categoria: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <Box alignItems="center" display="flex" flexDir="column">
        <Button
          onClick={onOpen}
          rightIcon={<MdMode fontSize="1.75em" />}
          colorScheme="teal"
          variant="outline"
        >
          {modoEdicion ? "Editar producto" : "Agregar producto"}
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modoEdicion ? "Editar producto" : "Agregar un nuevo producto"}
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="item">Nombre del item:</FormLabel>
                <Input
                  type="text"
                  name="item"
                  value={producto.item}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="precio">Precio:</FormLabel>
                <Input
                  type="text"
                  name="precio"
                  value={producto.precio}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Input
                  type="text"
                  name="categoria"
                  value={producto.categoria}
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
                {modoEdicion ? "Guardar cambios" : "Agregar"}
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

export default EditarAgregarProducto;
