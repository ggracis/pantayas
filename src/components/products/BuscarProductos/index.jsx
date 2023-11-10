import React, { useEffect, useState } from "react";
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
import {
  GET_CATEGORIAS,
  GET_SUBCATEGORIAS,
  SEARCH_PRODUCTO,
  SEARCH_PRODUCTO_CATEGORIAS,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const BuscarProductos = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const subcategoria = document.getElementById("subcategoria").value;
    const pageSize = parseInt(document.getElementById("pagesize").value) || 20;
    const page = parseInt(document.getElementById("page").value) || 1;

    const variables = {
      nombre,
      categoria: categoria,
      subcategoria: subcategoria,
      pageSize,
      page,
    };

    try {
      if (!categoria && !subcategoria) {
        console.log("No se eligió ni categoría ni subcategoría");
        const result = await graphQLClient.request(SEARCH_PRODUCTO, variables);
        const productos = result.productos.data || [];
        setSearchResults(productos);
        console.log(productos);
      } else {
        console.log("Se eligió categoría o subcategoría");
        const result = await graphQLClient.request(
          SEARCH_PRODUCTO_CATEGORIAS,
          variables
        );
        const productos = result.productos.data || [];
        setSearchResults(productos);
        console.log(productos);
      }

      setError(null);
    } catch (err) {
      setError("Error al buscar productos.");
      console.log(err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const SelectCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCategorias = async () => {
        setLoading(true);
        try {
          const { categorias } = await graphQLClient.request(GET_CATEGORIAS);
          if (categorias && categorias.data) {
            setCategorias(
              categorias.data.map((categoria) => ({
                id: categoria.id,
                nombre: categoria.attributes.nombre,
              }))
            );

            setError(null);
          } else {
            setCategorias([]);
            setError("No se encontraron categorías.");
          }
        } catch (err) {
          setError("Error al obtener las categorías.");
          setCategorias([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCategorias();
    }, []);

    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>Ocurrió un error: {error}</p>;
    }

    return (
      <FormControl>
        <Select placeholder="Categoría" id="categoria" name="categoria">
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  };

  const SelectSubcategorias = () => {
    const [subcategorias, setSubcategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchSubcategorias = async () => {
        setLoading(true);
        try {
          const { subcategorias } = await graphQLClient.request(
            GET_SUBCATEGORIAS
          );
          if (subcategorias && subcategorias.data) {
            setSubcategorias(
              subcategorias.data.map((subcategoria) => ({
                id: subcategoria.id,
                nombre: subcategoria.attributes.nombre,
              }))
            );
            setError(null);
          } else {
            setSubcategorias([]);
            setError("No se encontraron subcategorías.");
          }
        } catch (err) {
          setError("Error al obtener las subcategorías.");
          setSubcategorias([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSubcategorias();
    }, []);

    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>Ocurrió un error: {error}</p>;
    }

    return (
      <FormControl>
        <Select
          placeholder="Subcategoría"
          id="subcategoria"
          name="subcategoria"
        >
          {subcategorias.map((subcategoria) => (
            <option key={subcategoria.id} value={subcategoria.id}>
              {subcategoria.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Center mt={4}>
        <Box>
          <div>
            <Stack direction={["column", "row"]} spacing="15px">
              <FormControl>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Producto"
                  onKeyDown={handleKeyPress}
                />{" "}
              </FormControl>

              <SelectCategorias />

              <SelectSubcategorias />

              <FormControl>
                <InputGroup>
                  <InputLeftAddon>
                    <Text>Resultados</Text>
                  </InputLeftAddon>
                  <NumberInput
                    step={20}
                    defaultValue={20}
                    min={20}
                    max={300}
                    allowMouseWheel
                    id="pagesize"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>

              <Input type="hidden" id="page" value="1" />

              <FormControl>
                <Button
                  colorScheme="teal"
                  onClick={handleSearch}
                  variant="outline"
                  rightIcon={<FaSearch />}
                >
                  Buscar
                </Button>
              </FormControl>
            </Stack>
          </div>
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
