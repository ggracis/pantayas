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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdOutlineSave, MdModeEdit } from "react-icons/md";

const EditarAgregarProducto = ({ onAction, modoEdicion, productoEdicion }) => {
  const [producto, setProducto] = useState({
    ID_Usuario: "",
    tituloProducto: "",
    descripcion: "",
    categoria: "",
    subcategoria: "",
    unidadMedida: "Kg.",
    titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
    preciosVariantes: Array(3).fill(""), // Inicializar con valores vacíos
    activo: true,
  });

  useEffect(() => {
    if (modoEdicion && productoEdicion) {
      setProducto(productoEdicion);
    }
  }, [modoEdicion, productoEdicion]);

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
  const handleTituloChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      tituloProducto: value,
    }));
  };

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      categoria: value,
    }));
  };

  const handleSubcategoriaChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      subcategoria: value,
    }));
  };

  const handleDescripcionChange = (e) => {
    const { value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      descripcion: value,
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
    setProducto({
      ID_Usuario: "",
      tituloProducto: "",
      descripcion: "",
      categoria: "",
      subcategoria: "",
      unidadMedida: "Kg.",
      titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
      preciosVariantes: Array(3).fill(""),
      activo: true,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Box alignItems="center" display="flex" flexDir="column">
        <Button
          onClick={onOpen}
          rightIcon={<MdModeEdit fontSize="1.75em" />}
          colorScheme="teal"
          variant="outline"
        >
          {modoEdicion ? "Editar producto" : "Agregar producto"}
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modoEdicion ? "Editar producto" : "Agregar un nuevo producto"}
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="tituloProducto">
                  Título del producto:
                </FormLabel>
                <Input
                  type="text"
                  name="tituloProducto"
                  value={producto.tituloProducto}
                  onChange={handleTituloChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleDescripcionChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="categoria">Categoría:</FormLabel>
                <Input
                  type="text"
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleCategoriaChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="subcategoria">Subcategoría:</FormLabel>
                <Input
                  type="text"
                  name="subcategoria"
                  value={producto.subcategoria}
                  onChange={handleSubcategoriaChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="unidadMedida">Unidad de Medida:</FormLabel>
                <Select
                  name="unidadMedida"
                  value={producto.unidadMedida}
                  onChange={handleUnidadMedidaChange}
                >
                  <option value="Kg.">Kg.</option>
                  <option value="Unidad">Unidad</option>
                  <option value="Tamaño">Tamaño</option>
                </Select>
              </FormControl>
              <Table>
                <Thead>
                  <Tr>
                    {producto.titulosVariantes.map((titulo, index) => (
                      <Th key={index}>{titulo}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    {producto.preciosVariantes.map((precio, index) => (
                      <Td key={index}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children="$"
                          />
                          <Input
                            placeholder="0.00"
                            type="number"
                            value={precio}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        </InputGroup>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>

            <ModalFooter alignItems="flex-end">
              <Button
                mr={3}
                type="submit"
                onClick={onClose}
                rightIcon={<MdOutlineSave fontSize="1.75em" />}
                colorScheme="teal"
                variant="outline"
              >
                {modoEdicion ? "Guardar cambios" : "Agregar"}
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
