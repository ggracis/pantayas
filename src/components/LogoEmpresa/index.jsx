import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = () => {
  return (
    <Box borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src="/panaderia.png"
          alt="Logotipo de la empresa"
          boxSize={24}
          mr={2}
        />
        <Text fontSize="1.5em" fontWeight="bold">
          PANADERIA NTQJ
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
