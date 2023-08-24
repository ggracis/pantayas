import React, { useState } from "react";
import {
  IconButton,
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
import { EditIcon } from "@chakra-ui/icons";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <IconButton
        width="40%"
        variant="outline"
        colorScheme="teal"
        icon={<EditIcon />}
        onClick={onOpen}
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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

            <ModalFooter alignItems="flex-end">
              <Button type="submit" mr="2em" onClick={onClose}>
                Cambiar
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

export default EditItem;
