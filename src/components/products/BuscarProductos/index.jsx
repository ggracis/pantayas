import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Select,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  InputGroup,
  Stack,
  Center,
  Text,
} from "@chakra-ui/react";

import ListaProductosEditable from "../ListaProductosEditable";
import { FaSearch } from "react-icons/fa";
import { SEARCH_PRODUCTO_BY_NAME } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const BuscarProductos = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const variables = {
      nombre: formData.get("nombre"),
      categoria: formData.get("categoria"),
      subcategoria: formData.get("subcategoria"),
      pageSize: parseInt(formData.get("pagesize"), 15),
      page: parseInt(formData.get("page"), 1),
    };

    try {
      const { productos } = await graphQLClient.request(
        SEARCH_PRODUCTO_BY_NAME,
        variables
      );
      if (productos) {
        setSearchResults(productos.data);
      } else {
        setSearchResults([]);
      }
      setError(null);
    } catch (err) {
      setError("Error al buscar productos.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Center mt={4}>
        <Box>
          <form onSubmit={handleSearch}>
            <Stack direction={["column", "row"]} spacing="15px">
              <FormControl>
                <Input type="text" name="nombre" placeholder="Producto" />
              </FormControl>

              <FormControl>
                <Select placeholder="Categoría" name="categoria">
                  <option value="Pastelería">Pastelería</option>
                  <option value="categoria2">Categoría 2</option>
                  <option value="categoria3">Categoría 3</option>
                </Select>
              </FormControl>

              <FormControl>
                <Select placeholder="Subcategoría" name="subcategoria">
                  <option value="Tarta">Tarta</option>
                  <option value="subcategoria2">Subcategoría 2</option>
                  <option value="subcategoria3">Subcategoría 3</option>
                </Select>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftAddon children="Resultados" />
                  <NumberInput
                    step={15}
                    defaultValue={15}
                    min={15}
                    max={300}
                    allowMouseWheel
                    name="pagesize"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>{" "}
                </InputGroup>
              </FormControl>

              <Input type="hidden" name="page" value="1" />

              <FormControl>
                <Button
                  colorScheme="teal"
                  type="submit"
                  variant="outline"
                  rightIcon={<FaSearch />}
                >
                  Buscar
                </Button>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Center>

      {loading && <Text>Cargando resultados...</Text>}
      {error && <Text color="red">{error}</Text>}
      {!loading && !error && (
        <ListaProductosEditable
          productIds={searchResults.map((producto) => producto.id)}
        />
      )}
    </>
  );
};

export default BuscarProductos;
