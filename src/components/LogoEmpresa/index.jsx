import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = () => {
  return (
    <Box p={4} borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src="/panaderia.png"
          alt="Logotipo de la empresa"
          boxSize={24}
          mr={2}
        />
        <Text fontSize="lg" fontWeight="bold">
          PANADERIA NTQJ
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
