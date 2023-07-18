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

const UsuarioForm = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Usuario = Parse.Object.extend("Usuario");
    const nuevoUsuario = new Usuario();

    nuevoUsuario.set(usuario);

    try {
      await nuevoUsuario.save();
      console.log("Usuario guardado exitosamente");
      // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página.
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje de error al usuario.
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt="2em" mb="10em">
      <Stack spacing="10px">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Apellido:</FormLabel>
            <Input
              type="text"
              name="apellido"
              value={usuario.apellido}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono:</FormLabel>
            <Input
              type="text"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="text"
              name="mail"
              value={usuario.mail}
              onChange={handleChange}
            />
          </FormControl>
          <Button mt={4} type="submit">
            Agregar Usuario
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default UsuarioForm;
