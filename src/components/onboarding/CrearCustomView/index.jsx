import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Box,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  SEARCH_PRODUCTO_BY_NAME,
  CREATE_CUSTOMVIEW,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import { AsyncSelect, Select } from "chakra-react-select";

const CrearCustomView = () => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [estructura, setEstructura] = useState(1);
  const [selectedEstructura, setSelectedEstructura] = useState({});

  const [componentesData, setComponentesData] = useState({
    header: "",
    col1: {
      estilo: "",
      titulo: "",
      productIds: [],
    },
  });

  const handleEstructuraChange = (selectedEstructura) => {
    const estructuraValue = parseInt(selectedEstructura.value, 10);
    setSelectedEstructura(selectedEstructura);
    console.log(selectedEstructura);
    setEstructura(estructuraValue);
    console.log(estructura);

    const componentes = {};
    for (let i = 1; i <= estructuraValue; i++) {
      componentes[`col${i}`] = {
        estilo: "ListaProductos",
        titulo: `Productos ${i}`,
        productIds: [],
      };
    }

    setComponentesData({
      ...componentesData,
      ...componentes,
    });
  };

  const handleDisenoChange = (selectedDiseno) => {
    console.log(selectedDiseno);
    if (selectedDiseno.value === "0") {
      setValue("diseno", "0");
    } else {
      setValue("diseno", selectedDiseno);
    }
  };

  const handleProductSearch = async (inputValue) => {
    if (inputValue.length >= 3) {
      try {
        const { productos } = await graphQLClient.request(
          SEARCH_PRODUCTO_BY_NAME,
          {
            nombre: inputValue,
            pageSize: 20,
          }
        );

        if (productos) {
          console.log(productos);
          return productos.data.map((producto) => ({
            label: producto.attributes.nombre,
            value: producto.id,
          }));
        }
      } catch (err) {
        console.log("Error al buscar productos.".error);
      }
    }

    return [];
  };

  const generarComponentesEstilo = () => {
    const componentesEstilo = [];
    for (let i = 1; i <= estructura; i++) {
      componentesEstilo.push(
        <Box
          display="grid"
          gridGap={3}
          key={i}
          p={4}
          border="1px"
          borderColor="gray.700"
          borderRadius={10}
        >
          <Controller
            name={`titulo-${i}`}
            control={control}
            render={({ field }) => (
              <Input variant="filled" placeholder="Titulo" {...field} />
            )}
          />

          <Controller
            name={`estilo-${i}`}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
                placeholder="Estilo"
                options={[
                  {
                    label: "Lista 1",
                    value: "lista-1",
                  },
                  {
                    label: "Lista 2",
                    value: "lista-2",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name={`productos-${i}`}
            render={({ field: { onChange, value } }) => (
              <AsyncSelect
                isMulti
                name={`productos-${i}`}
                placeholder="Buscar productos..."
                onChange={(newValue) => onChange(newValue)}
                value={value}
                loadOptions={(inputValue, callback) => {
                  handleProductSearch(inputValue).then((data) =>
                    callback(data)
                  );
                }}
              />
            )}
          />
        </Box>
      );
    }
    return componentesEstilo;
  };
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const { nombreCV, estructura, header } = data;
      const componentes = { header: header.value };

      for (let i = 1; i <= estructura.value; i++) {
        const colKey = `col${i}`;
        const titulo = data[`titulo-${i}`];
        const estilo = data[`estilo-${i}`].value;
        const productos = data[`productos-${i}`].map((producto) =>
          parseInt(producto.value, 10)
        );

        componentes[colKey] = {
          estilo,
          titulo,
          productIds: productos,
        };
      }

      const customViewData = {
        data: {
          nombre: nombreCV,
          componentes,
          estructura: estructura.label,
          activo: true,
        },
      };

      const result = await graphQLClient.request(
        CREATE_CUSTOMVIEW,
        customViewData
      );

      if (result && result.createCustomview) {
        console.log(result);
        toast({
          title: "CustomView creado!",
          description: `ID del CustomView: ${result.createCustomview.data.id}`,
          status: "success",
          duration: 8000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al crear CustomView",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error en la creación del CustomView:", error);
      toast({
        title: "Error en la creación del CustomView",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <SimpleGrid columns={3} spacing={10} p={2}>
          {/* Definimos el nombre del customview */}
          <FormControl>
            <FormLabel>Diseno</FormLabel>
            <Controller
              control={control}
              name="diseno"
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Elegir diseno"
                  onChange={(newValue) => {
                    onChange(newValue);
                    handleDisenoChange(newValue);
                  }}
                  value={value}
                  options={[
                    {
                      label: "prueba",
                      value: "1",
                    },
                    {
                      label: "2",
                      value: "2",
                    },
                    {
                      label: "Nuevo...",
                      value: "0",
                    },
                  ]}
                />
              )}
            />
            {watch("diseno") === "0" && (
              <Controller
                control={control}
                name="nombreCV"
                render={({ field: { onChange, value } }) => (
                  <Input
                    variant="filled"
                    mt={2}
                    value={value}
                    placeholder="Nombre del diseño"
                    onChange={(e) => {
                      onChange(e);
                      setValue("nombreCV", e.target.value);
                    }}
                  />
                )}
              />
            )}
          </FormControl>

          <Controller
            control={control}
            name="header"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <FormLabel>Header</FormLabel>
                <Select
                  placeholder="Header"
                  onChange={(newValue) => onChange(newValue)}
                  value={value}
                  options={[
                    {
                      label: "Header 1",
                      value: "ScHeader",
                    },
                  ]}
                />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="estructura"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <FormLabel>Estructura</FormLabel>
                <Select
                  placeholder="Elegir estructura"
                  onChange={(newValue) => {
                    const selectedEstructura = newValue;
                    onChange(selectedEstructura);
                    handleEstructuraChange(selectedEstructura);
                  }}
                  value={value}
                  options={[
                    {
                      label: "Pantalla completa",
                      value: "1",
                    },
                    {
                      label: "2 columnas",
                      value: "2",
                    },
                    {
                      label: "3 columnas",
                      value: "3",
                    },
                    {
                      label: "3 columnas - 2 filas",
                      value: "6",
                    },
                  ]}
                />
              </FormControl>
            )}
          />
        </SimpleGrid>
        <Divider m={4} />

        <SimpleGrid columns={3} spacing={10} p={2}>
          {generarComponentesEstilo()}
        </SimpleGrid>

        <Button
          type="submit"
          w="full"
          mt={4}
          loadingText="Guardando"
          variant="outline"
          colorScheme="teal"
          size="lg"
          spinnerPlacement="end"
        >
          Guardar
        </Button>
      </FormControl>
    </>
  );
};

export default CrearCustomView;
