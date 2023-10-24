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
  Text,
  HStack,
  InputGroup,
} from "@chakra-ui/react";
import { MdOutlineSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import {
  GET_CATEGORIAS,
  GET_SUBCATEGORIAS,
  GET_PRODUCTO,
  UPDATE_PPRODUCTO,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const EditarAgregarProducto = ({ productoEdicion }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria: null,
    subcategoria: null,
    unidadMedida: "Kg.",
    titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
    preciosVariantes: Array(3).fill(""),
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
          subcategoria,
        });
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const handleNombreChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      nombre: value,
    }));
  };

  const handleDescripcionChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      descripcion: value,
    }));
  };

  // Función para generar los precios basados en la unidad de medida
  const generarPrecios = (unidadMedida, preciosVariantes) => {
    const precios = {};

    // Define los títulos de los precios según la unidad de medida
    switch (unidadMedida) {
      case "Kg.":
        precios["1/4 Kg."] = preciosVariantes[0] || 0;
        precios["1/2 Kg."] = preciosVariantes[1] || 0;
        precios["1 Kg."] = preciosVariantes[2] || 0;
        break;
      case "Unidad":
        precios["C/U"] = preciosVariantes[0] || 0;
        precios["1/2 Doc."] = preciosVariantes[1] || 0;
        precios["1 Doc."] = preciosVariantes[2] || 0;
        break;
      case "Porcion":
        precios["Chico"] = preciosVariantes[0] || 0;
        precios["Mediano"] = preciosVariantes[1] || 0;
        precios["Grande"] = preciosVariantes[2] || 0;
        break;
      default:
        break;
    }

    return precios;
  };

  // En la función handleUnidadMedidaChange
  const handleUnidadMedidaChange = (e) => {
    const unidadMedida = e.target.value;
    const titulosVariantes = generateTitulosVariantes(unidadMedida);
    // Genera los precios en base a la unidad de medida
    const preciosVariantes = Array(titulosVariantes.length).fill("");
    setProducto((prevProducto) => ({
      ...prevProducto,
      unidadMedida,
      titulosVariantes,
      preciosVariantes,
      // Genera los precios actualizados
      precios: generarPrecios(unidadMedida, preciosVariantes),
    }));
  };

  const handleInputChange = (e, titulo) => {
    const { value } = e.target;
    const preciosVariantes = [...producto.preciosVariantes];

    // Encuentra el índice numérico del título en los titulosVariantes
    const index = producto.titulosVariantes.indexOf(titulo);

    if (index !== -1) {
      preciosVariantes[index] = value;
      setProducto((prevProducto) => ({
        ...prevProducto,
        preciosVariantes,
        // Actualiza los precios basados en los preciosVariantes
        precios: generarPrecios(producto.unidadMedida, preciosVariantes),
      }));
    }
  };

  const handleCategoriaChange = (categoriaId) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      categoria: categoriaId,
    }));
    console.log(categoriaId);
  };

  const handleSubcategoriaChange = (subcategoriaId) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      subcategoria: subcategoriaId,
    }));
    console.log(subcategoriaId);
  };

  const generateTitulosVariantes = (unidadMedida) => {
    switch (unidadMedida) {
      case "Kg.":
        return ["1/4 Kg.", "1/2 Kg.", "1 Kg."];
      case "Unidad":
        return ["C/U", "1/2 Doc.", "1 Doc."];
      case "Porcion":
        return ["Chico", "Mediano", "Grande"];
      default:
        return [];
    }
  };

  const actualizarProducto = async (producto) => {
    try {
      const updatedProductData = {
        data: {
          id: producto.id,
          attributes: {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            unidadMedida: producto.unidadMedida,
            precios: producto.precios,
            categorias: producto.categoria,
            subcategorias: producto.subcategoria,
          },
        },
      };
      console.log("PRODUCTO: ", updatedProductData);

      // Utiliza la consulta de actualización y las variables necesarias
      const { updateProducto } = await graphQLClient.request(
        UPDATE_PPRODUCTO,
        updatedProductData
      );
      console.log("Producto actualizado:", updateProducto);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarProducto(producto);
    resetProducto();
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
                  onChange={handleNombreChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={producto.descripcion || ""}
                  onChange={handleDescripcionChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Select
                  key={producto.id}
                  name="categoria"
                  value={producto.categoria}
                  onChange={(e) => handleCategoriaChange(e.target.value)}
                >
                  <option key="cat" value={null}>
                    Elegir categoría
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
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
                  onChange={(e) => handleSubcategoriaChange(e.target.value)}
                >
                  <option key="subcat" value={null}>
                    Elegir subcategoría
                  </option>
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
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
