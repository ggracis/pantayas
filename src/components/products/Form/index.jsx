import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
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

  return (
    <Box maxW="700px" mx="auto" mt="4">
      <Text color="gray.500" fontSize="2em">
        Agregar un nuevo producto
      </Text>
      <Stack spacing="10px">
        <form onSubmit={handleSubmit}>
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
          <Button mt={4} type="submit">
            Agregar Producto
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default ProductoForm;
