import { Box, Heading, Text } from "@chakra-ui/react";

function Encabezado({ tituloEncabezado, bajadaEncabezado }) {
  return (
    <Box textAlign="center" my="4" mx="auto" p="4">
      <Heading
        as="h1"
        color="green.500"
        fontSize="2xl"
        fontWeight="bold"
        lineHeight="tall"
        letterSpacing="wide"
        textAlign="center"
      >
        {tituloEncabezado}
      </Heading>
      <Text fontSize="lg" fontWeight="medium">
        {bajadaEncabezado}
      </Text>
    </Box>
  );
}

export default Encabezado;
