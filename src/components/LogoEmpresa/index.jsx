import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = ({ title, image }) => {
  const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));

  // Verifica si title y image son nulos y utiliza los valores del almacenamiento local si están disponibles
  if (title == null) {
    title = storedOpciones
      ? storedOpciones.nombreLocal || "NTQJ PANADERIA"
      : "NTQJ PANADERIA";
  }

  if (image == null) {
    image = storedOpciones ? storedOpciones.logoURL || "" : "";
  } else {
    // Si se proporciona una imagen, verifica si es una URL completa o una ruta relativa
    image = image.startsWith("http")
      ? image
      : `http://54.94.34.59:1337${image}`;
  }

  return (
    <Box borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src={image}
          alt={title}
          title={title}
          mr={2}
          maxW={"100%"}
          maxH={"6em"}
        />
        <Text fontSize="1.5em" fontWeight="bold">
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
