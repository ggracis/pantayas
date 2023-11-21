import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import graphQLClient from "../../../graphqlClient";
import {
  GET_CUSTOMVIEWS_LIST,
  GET_LOCAL,
  UPDATE_TV_CUSTOMVIEW,
} from "../../../graphqlQueries";

const TvsLocal = () => {
  const [televisores, setTelevisores] = useState([]);
  const [customviews, setCustomviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = await graphQLClient.request(GET_LOCAL);
        setTelevisores(localData.local.data.attributes.tvs.data);
      } catch (error) {
        console.error("Error fetching local data: ", error);
      }

      try {
        const customviewsData = await graphQLClient.request(
          GET_CUSTOMVIEWS_LIST
        );
        setCustomviews(customviewsData.customviews.data);
      } catch (error) {
        console.error("Error fetching customviews list: ", error);
      }
    };

    fetchData();
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
  const toast = useToast();

  const onSubmit = async (data, tvId) => {
    const televisor = televisores.find((tv) => tv.id === tvId);

    if (!televisor) {
      console.error("Televisor no encontrado");
      return;
    }

    const requestData = {
      tvId: tvId,
    };

    if (data.defaultCustomview !== null) {
      requestData.defaultCV = data.defaultCustomview;
    }

    if (data.semanaCustomview !== null) {
      requestData.diarioCV = data.semanaCustomview;
    }

    if (data.findeCustomview !== null) {
      requestData.findeCV = data.findeCustomview;
    }

    try {
      await graphQLClient.request(UPDATE_TV_CUSTOMVIEW, requestData);

      console.log("Datos actualizados con éxito");
      toast({
        title: "TV actualizado!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const handleSaveClick = async (
    tvId,
    defaultCustomview,
    semanaCustomview,
    findeCustomview,
    viewType
  ) => {
    const televisor = televisores.find((tv) => tv.id === tvId);

    if (televisor) {
      try {
        await onSubmit(
          {
            defaultCustomview,
            semanaCustomview,
            findeCustomview,
          },
          tvId,
          viewType
        );
      } catch (error) {
        console.error("Error al guardar los datos:", error);
      }
    }
  };

  return (
    <>
      <FormControl
        w="80vw"
        p={4}
        bg="blackAlpha.300"
        m="auto"
        mt={8}
        mb={8}
        borderRadius="lg"
        as="form"
      >
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
                  bg="whiteAlpha.300"
                >
                  <VStack spacing={4} p={4}>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="green.500"
                      textTransform="uppercase"
                    >
                      {televisor.id} - {televisor.attributes.nombre}
                    </Text>

                    <HorarioCard
                      title="Defecto"
                      dia="Lunes a Domingo"
                      horario="24Hs."
                      customview={televisor.attributes.defaultCV}
                      customviews={customviews}
                      onSave={(defaultCustomview) =>
                        handleSaveClick(
                          televisor.id,
                          defaultCustomview,
                          null,
                          null,
                          "default"
                        )
                      }
                    />

                    <HorarioCard
                      title="Semana"
                      dia={televisor.attributes.horario.semana.dia
                        .map((day) => dayNames[day])
                        .join(", ")}
                      horario={`${televisor.attributes.horario.semana.horario[0]} - ${televisor.attributes.horario.semana.horario[1]}`}
                      customview={televisor.attributes.diarioCV}
                      customviews={customviews}
                      onSave={(semanaCustomview) =>
                        handleSaveClick(
                          televisor.id,
                          null,
                          semanaCustomview,
                          null,
                          "semana"
                        )
                      }
                    />

                    <HorarioCard
                      title="Finde"
                      dia={televisor.attributes.horario.finde.dia
                        .map((day) => dayNames[day])
                        .join(", ")}
                      horario={`${televisor.attributes.horario.finde.horario[0]} - ${televisor.attributes.horario.finde.horario[1]}`}
                      customview={televisor.attributes.findeCV}
                      customviews={customviews}
                      onSave={(findeCustomview) =>
                        handleSaveClick(
                          televisor.id,
                          null,
                          null,
                          findeCustomview,
                          "finde"
                        )
                      }
                    />
                  </VStack>
                </Box>
              ))}
            </HStack>
          )}
        </Center>
      </FormControl>
    </>
  );
};

const HorarioCard = ({
  title,
  dia,
  horario,
  customview,
  customviews,
  onSave,
}) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%">
    <VStack p={4} spacing={2}>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <HStack justifyContent="space-between">
        <Text>Día: {dia}</Text>
        <Text>Horario: {horario}</Text>
      </HStack>
      <CustomviewSelect
        customview={customview}
        customviews={customviews}
        onSave={onSave}
      />
    </VStack>
  </Box>
);

const CustomviewSelect = ({ customview, customviews, onSave }) => {
  const [selectedValue, setSelectedValue] = useState(customview);

  const handleCustomviewChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onSave(newValue);
    console.log(newValue);
  };

  return (
    <FormControl>
      <HStack>
        <FormLabel>Diseño:</FormLabel>
        <Select
          placeholder="Elegir diseño"
          value={selectedValue}
          onChange={handleCustomviewChange}
        >
          {customviews.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.attributes.nombre} (ID: {cv.id})
            </option>
          ))}
        </Select>
      </HStack>
    </FormControl>
  );
};

export default TvsLocal;
