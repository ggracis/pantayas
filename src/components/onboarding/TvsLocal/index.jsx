import React, { useEffect, useState } from "react";
import graphQLClient from "../../../graphqlClient";
import { GET_LOCAL } from "../../../graphqlQueries";
import { Box, Text, VStack, HStack, Center } from "@chakra-ui/react";

const TvsLocal = () => {
  const [televisores, setTelevisores] = useState([]);

  useEffect(() => {
    graphQLClient
      .request(GET_LOCAL)
      .then((data) => {
        const tvData = data.local.data.attributes.tvs.data;
        setTelevisores(tvData);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const dayNames = {
    1: "Lun",
    2: "Mar",
    3: "Mié",
    4: "Jue",
    5: "Vie",
    6: "Sáb",
    7: "Dom",
  };

  return (
    <>
      <Center m={4}>
        {televisores.length > 0 && (
          <HStack spacing={4}>
            {televisores.map((televisor, index) => (
              <Box
                key={index}
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <VStack spacing={4} p={4}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="green.500"
                    textTransform="uppercase"
                  >
                    {televisor.attributes.nombre}
                  </Text>

                  <HorarioCard
                    title="Por defecto"
                    dia="Lunes a Domingo"
                    horario="24Hs."
                    customview={televisor.attributes.horario.default.customview}
                  />

                  <HorarioCard
                    title="Días de la semana"
                    dia={televisor.attributes.horario.semana.dia
                      .map((day) => dayNames[day])
                      .join(", ")}
                    horario={`${televisor.attributes.horario.semana.horario[0]} - ${televisor.attributes.horario.semana.horario[1]}`}
                    customview={televisor.attributes.horario.semana.customview}
                  />

                  <HorarioCard
                    title="Fin de semana"
                    dia={televisor.attributes.horario.finde.dia
                      .map((day) => dayNames[day])
                      .join(", ")}
                    horario={`${televisor.attributes.horario.finde.horario[0]} - ${televisor.attributes.horario.finde.horario[1]}`}
                    customview={televisor.attributes.horario.finde.customview}
                  />
                </VStack>
              </Box>
            ))}
          </HStack>
        )}
      </Center>
    </>
  );
};

const HorarioCard = ({ title, dia, horario, customview }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%">
    <VStack p={4} spacing={2}>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <HStack justifyContent="space-between">
        <Text>Día: {dia}</Text>
        <Text>Horario: {horario}</Text>
      </HStack>
      <Text fontSize="md" fontWeight="bold" color="green.400">
        Customview: {customview}
      </Text>
    </VStack>
  </Box>
);

export default TvsLocal;
