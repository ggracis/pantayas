import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
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
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { MdOutlineSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import {
  GET_CATEGORIAS,
  GET_SUBCATEGORIAS,
  GET_PRODUCTO,
  UPDATE_PRODUCTO,
  CREATE_PRODUCTO,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const EditarAgregarProducto = ({ productoEdicion }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
        setValue("categoria", producto.categoria);
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
    try {
      const { producto } = await graphQLClient.request(GET_PRODUCTO, {
        productId,
      });
      if (producto) {
        console.log("Producto: ", producto);

        const productoAttributes = producto.data.attributes;

        const categoriaId =
          productoAttributes.categoria && productoAttributes.categoria.data
            ? productoAttributes.categoria.data.id
            : null;

        const subcategoriaId =
          productoAttributes.subcategoria &&
          productoAttributes.subcategoria.data
            ? productoAttributes.subcategoria.data.id
            : null;

        setProducto({
          ...productoAttributes,
          categoria: categoriaId,
          subcategoria: subcategoriaId,
        });

        setValue("id", producto.data.id);
        setValue("nombre", productoAttributes.nombre);
        setValue("descripcion", productoAttributes.descripcion);
        setValue("categoria", categoriaId);
        setValue("subcategoria", subcategoriaId);
        setValue("unidadMedida", productoAttributes.unidadMedida);
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
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

  const toast = useToast();

  const actualizarProducto = async (producto) => {
    try {
      const id = producto.id;
      const nombre = producto.nombre;
      const descripcion = producto.descripcion;
      const unidadMedida = producto.unidadMedida;
      const precios = producto.precios;
      const categoria = producto.categoria;
      const subcategoria = producto.subcategoria;

      let mutation;

      if (id) {
        mutation = UPDATE_PRODUCTO;
      } else {
        mutation = CREATE_PRODUCTO;
      }

      const data = {
        nombre,
        descripcion,
        unidadMedida,
        precios,
        categoria,
        subcategoria,
      };

      const result = await graphQLClient.request(mutation, {
        id,
        ...data,
      });

      const action = isEditMode ? "actualizado" : "creado";

      toast({
        title: `Producto ${action}`,
        description: `${nombre} ${action} correctamente`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      console.log(`Producto ${action}:`, result);
    } catch (error) {
      console.error("Error al actualizar/crear el producto:", error);

      const action = isEditMode ? "actualizar" : "crear";

      toast({
        title: `Error al ${action} el producto`,
        description: `Hubo un error al intentar ${action} el producto`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await actualizarProducto(data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  //  console.log("Valores de subcategoria:", watch("subcategoria"));

  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="nombre">Nombre del producto:</FormLabel>
                <Input {...register("nombre")} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input {...register("descripcion")} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Select
                  {...register("categoria", {
                    required: "Seleccione una categoría",
                  })}
                >
                  <option value="">Elegir categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.attributes.nombre}
                    </option>
                  ))}
                </Select>
                {errors.categoria && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>
                      {errors.categoria.message}
                    </AlertDescription>
                  </Alert>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="subcategoria">Subcategoría:</FormLabel>
                <Select
                  {...register("subcategoria", {
                    required: "Seleccione una subcategoría",
                  })}
                >
                  <option key="subcat" value={null}>
                    Elegir subcategoría
                  </option>{" "}
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
                      {subcategoria.attributes.nombre}
                    </option>
                  ))}
                </Select>
                {errors.subcategoria && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>
                      {errors.subcategoria.message}
                    </AlertDescription>
                  </Alert>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="unidadMedida">Unidad de Medida:</FormLabel>
                <Select
                  {...register("unidadMedida", {
                    required: "Seleccione una unidad de medida",
                  })}
                  onChange={(e) => handleUnidadMedidaChange(e)}
                >
                  <option value="Kg.">Kg.</option>
                  <option value="Unidad">Unidad</option>
                  <option value="Porcion">Porción</option>
                </Select>
                {errors.unidadMedida && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>
                      {errors.unidadMedida.message}
                    </AlertDescription>
                  </Alert>
                )}
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
                        name={`precios.${titulo}`}
                        defaultValue={producto.precios[titulo] || ""}
                        {...register(`precios.${titulo}`)}
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
