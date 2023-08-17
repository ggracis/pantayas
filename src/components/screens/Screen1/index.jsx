import { Box, Text, SimpleGrid, useColorMode, Badge } from "@chakra-ui/react";

import React, { useEffect } from "react";

const ListadoProductos = ({ productos, onFetchProductos }) => {

  const fontText = ["arial", "Rowdies", "Caprasimo", "Courier Prime"];

  const productosArray = () => { let _ar = new Array(0); productos.map((x) => (_ar.push(x))); return _ar; }
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  return (
    <Box>
      <Text
        color={(colorMode === 'light' ? 'black' : 'White')}
        fontSize="2em"
        mb="4"
        textAlign="center"
        textTransform="uppercase"
        fontFamily={["arial", "Rowdies", "Caprasimo"]}
        mt="1em"
      >
        PANADERIA NTQJ
      </Text>
      <SimpleGrid
        columns={clamp(Math.ceil(productosArray().length / 3), 1, 4)}
        spacing="1em"
        m="2em 5em"
      >
        {productos.map((producto) => (
          <Box
            key={producto.objectId}
            p="4"
            borderWidth="1px"
            border
            borderRadius="md"
            boxShadow="sm"
            paddingLeft='3em'
            bg={(colorMode === 'light' ? '#353535' : '#e6e6e6')}
            color={(colorMode === 'light' ? 'white' : 'black')}
          >
            <Text fontWeight="bold" fontSize="x-large" fontFamily={fontText}>
              {producto.item}
            </Text>
            <Badge
              variant='solid'
              colorScheme='green'
              fontFamily={["arial", "Rowdies", "Caprasimo"]}
              w='9em'
              textAlign='center'
              fontWeight='extrabold'
              color={(colorMode === 'light' ? 'white' : 'black')}
            >
              {producto.categoria}</Badge>
            <Text fontFamily={fontText} pt='0.5em'>{producto.descripcion}</Text>
            <Text fontWeight="bold" fontSize='x-large' textAlign='end' pt='0.2em' fontFamily={fontText}>
              ${producto.precio}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ListadoProductos;
