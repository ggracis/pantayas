import { Box, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Producto = ({ producto }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p="2"
      m="1"
      borderWidth="1px"
      border
      borderRadius="md"
      boxShadow="sm"
      bg={colorMode === "light" ? "#353535" : "#e6e6e6"}
      color={colorMode === "light" ? "white" : "black"}
    >
      <Text fontSize="1.5em" fontWeight="bold">
        {producto.item}
      </Text>

      <Text fontSize="0.9em">{producto.descripcion}</Text>

      <Text fontSize="1.75em">${producto.precio}</Text>
    </Box>
  );
};
