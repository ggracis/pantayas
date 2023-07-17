import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const ProductoForm = () => {
  const [item, setItem] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Producto = Parse.Object.extend("Producto");
    const producto = new Producto();

    producto.set({
      item: item,
      precio: precio,
      descripcion: descripcion,
      categoria: categoria,
    });

    try {
      await producto.save();
      console.log("Producto guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt="4">
      <Text color="gray.500" fontSize="2em">
        Agregar un nuevo producto
      </Text>
      <Stack spacing="10px">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="title">Nombre del item:</FormLabel>
            <Input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Precio:</FormLabel>
            <Input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Descripción:</FormLabel>
            <Input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Categoría:</FormLabel>
            <Input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
