import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdOutlineSave } from "react-icons/md";
import { FaDollarSign, FaRegEdit } from "react-icons/fa";

import {
  GET_CATEGORIAS,
  GET_SUBCATEGORIAS,
  GET_PRODUCTO,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const EditarAgregarProducto = ({ onAction, productoEdicion }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    subcategoria: "",
    unidadMedida: "Kg.",
    titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
    preciosVariantes: Array(3).fill(""), // Inicializar con valores vacíos
    activo: true,
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { categorias } = await graphQLClient.request(GET_CATEGORIAS);
        if (categorias) {
          setCategorias(categorias.data);
        } else {
          setCategorias([]);
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setCategorias([]);
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const { subcategorias } = await graphQLClient.request(
          GET_SUBCATEGORIAS
        );
        if (subcategorias) {
          setSubcategorias(subcategorias.data);
        } else {
          setSubcategorias([]);
        }
      } catch (error) {
        console.error("Error al obtener subcategorías:", error);
        setSubcategorias([]);
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, []);

  // Este efecto se ejecutará cuando cambie productoEdicion
  useEffect(() => {
    const loadProductoData = async () => {
      if (productoEdicion) {
        setIsEditMode(true);
        editarProducto(productoEdicion);
      } else {
        setIsEditMode(false);
        resetProducto();
      }
    };

    loadProductoData();
  }, [productoEdicion]);

  const editarProducto = async (productId) => {
    console.log("Editar Producto ", productId);
    try {
      const { producto } = await graphQLClient.request(GET_PRODUCTO, {
        productId,
      });
      if (producto) {
        console.log("Producto: ", producto);

        const productoAttributes = producto.data.attributes;
        const categoria =
          productoAttributes.categorias.data.length > 0
            ? productoAttributes.categorias.data[0].attributes.nombre
            : "";

        const subcategoria =
          productoAttributes.subcategorias.data.length > 0
            ? productoAttributes.subcategorias.data[0].attributes.nombre
            : "";

        setProducto({
          ...productoAttributes,
          categoria,
          subcategoria, // Establece el valor de subcategoria
        });
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const resetProducto = () => {
    setProducto({
      nombre: "",
      descripcion: "",
      categoria: "",
      subcategoria: "",
      unidadMedida: "Kg.",
      titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
      preciosVariantes: Array(3).fill(""),
      activo: true,
    });
  };

  const handleUnidadMedidaChange = (e) => {
    const unidadMedida = e.target.value;
    const titulosVariantes = generateTitulosVariantes(unidadMedida);
    const preciosVariantes = Array(titulosVariantes.length).fill(""); // Inicializar con valores vacíos
    setProducto((prevProducto) => ({
      ...prevProducto,
      unidadMedida,
      titulosVariantes,
      preciosVariantes,
    }));
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const preciosVariantes = [...producto.preciosVariantes];
    preciosVariantes[index] = value;
    setProducto((prevProducto) => ({
      ...prevProducto,
      preciosVariantes,
    }));
  };

  const generateTitulosVariantes = (unidadMedida) => {
    switch (unidadMedida) {
      case "Kg.":
        return ["1/4 Kg.", "1/2 Kg.", "1 Kg."];
      case "Unidad":
        return ["C/U", "1/2 Doc.", "1 Doc."];
      case "Tamaño":
        return ["Chico", "Mediano", "Grande"];
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAction(producto);
    resetProducto();
    setIsEditMode(false);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  // Renderizar el botón y el encabezado del modal en función de isEditMode
  const modalButtonText = isEditMode ? "Guardar" : "Agregar";
  const modalHeader = isEditMode
    ? "Editar producto"
    : "Agregar un nuevo producto";

  return (
    <>
      {isEditMode ? (
        <IconButton
          onClick={() => {
            onOpen();
            console.log(producto.unidadMedida);
          }}
          ml={2}
          colorScheme="teal"
          icon={<FaRegEdit />}
        />
      ) : (
        <Box alignItems="center" display="flex" flexDir="column">
          <Button onClick={onOpen} rightIcon={<FaRegEdit />} colorScheme="teal">
            {modalButtonText}
          </Button>
        </Box>
      )}

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="nombre">Nombre del producto:</FormLabel>
                <Input
                  type="text"
                  name="nombre"
                  value={producto.nombre || ""}
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={producto.descripcion || ""}
                  onChange={(e) => handleInputChange(e, 1)}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Select
                  key={producto.id}
                  name="categoria"
                  value={producto.categoria}
                  onChange={(e) => handleInputChange(e, 2)}
                >
                  <option value={null}>Elegir categoría</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id}
                      value={categoria.attributes.nombre}
                    >
                      {categoria.attributes.nombre}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="subcategoria">Subcategoría:</FormLabel>
                <Select
                  name="subcategoria"
                  value={producto.subcategoria}
                  onChange={(e) => handleInputChange(e, 3)}
                >
                  <option value={null}>Elegir subcategoría</option>
                  {subcategorias.map((subcategoria) => (
                    <option
                      key={subcategoria.id}
                      value={subcategoria.attributes.nombre}
                    >
                      {subcategoria.attributes.nombre}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="unidadMedida">Unidad de Medida:</FormLabel>
                <Select
                  name="unidadMedida"
                  value={producto.unidadMedida}
                  onChange={(e) => handleUnidadMedidaChange(e)}
                >
                  <option value="Kg.">Kg.</option>
                  <option value="Unidad">Unidad</option>
                  <option value="Porcion">Porción</option>
                </Select>
              </FormControl>
              <Text>Precios</Text>

              {producto.precios && Object.keys(producto.precios).length > 0 && (
                <HStack spacing={4}>
                  {Object.keys(producto.precios).map((titulo) => (
                    <InputGroup key={titulo} flex={1}>
                      <Text>{titulo}</Text>
                      <Input
                        size="sm"
                        type="text"
                        name={titulo}
                        value={producto.precios[titulo] || ""}
                        onChange={(e) => handleInputChange(e, titulo)}
                      />
                    </InputGroup>
                  ))}
                </HStack>
              )}
            </ModalBody>
            <ModalFooter alignItems="flex-end">
              <Button
                mr={3}
                type="submit"
                rightIcon={<MdOutlineSave fontSize="1.75em" />}
                colorScheme="teal"
                variant="outline"
              >
                {modalButtonText}
              </Button>
              <Button onClick={onClose} colorScheme="red" variant="outline">
                Salir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditarAgregarProducto;
