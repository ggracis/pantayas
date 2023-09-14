import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";

const LogoEmpresa = ({title}) => {

  if(title == null){
    title={
      image: '/panaderia.png',
      title: 'NTQJ PANADERIA'
    }
  }
  else{
    title={
      ...title,
      image: title.image==null?'/panaderia.png':URL.createObjectURL(title.image),
    }
  }

  return (
    <Box borderRadius="md" textAlign="center">
      <Flex align="center" justify="center">
        <Image
          src={title.image}
          alt="Logotipo de la empresa"
          boxSize={24}
          mr={2}
          maxW={'6em'}
          maxH={'6em'}
        />
        <Text fontSize="1.5em" fontWeight="bold">
          {title.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default LogoEmpresa;
