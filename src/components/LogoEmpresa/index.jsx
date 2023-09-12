import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = ({title}) => {
  return (
    <Box borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src={title.image==null?"/panaderia.png":URL.createObjectURL(title.image)}//
          alt="Logotipo de la empresa"
          boxSize={24}
          mr={2}
        />
        <Text fontSize="1.5em" fontWeight="bold">
          {title.title==''?'NTQJ PANADERIA' :title.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
