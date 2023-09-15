import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = ({ title, image }) => {

  if (title == null)
    title = 'NTQJ PANADERIA'

  if (image == null)
    image = '/panaderia.png'
  else 
    image= image.url

  return (
    <Box borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src={image}
          alt="Logotipo de la empresa"
          boxSize={24}
          mr={2}
          maxW={'6em'}
          maxH={'6em'}
        />
        <Text fontSize="1.5em" fontWeight="bold">
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
