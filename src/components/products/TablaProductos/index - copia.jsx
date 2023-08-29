import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { eliminarProducto } from "../../../productService";
import { MdOutlineSave } from "react-icons/md";

const ProductTable = ({ productos, onFetchProductos, onEditProducto }) => {
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  const [editingCell, setEditingCell] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleCellDoubleClick = (product, field) => {
    setEditingCell({ productId: product.objectId, field });
    setEditedValue(product[field]);
  };

  const handleBlur = async (product, field) => {
    if (editingCell) {
      const { productId } = editingCell;

      if (productId === product.objectId && editingCell.field === field) {
        const updatedProduct = { ...product, [field]: editedValue };

        await onEditProducto(updatedProduct);
        await fetchProductos();

        setEditingCell(null);
        setEditedValue("");
      }
    }
  };

  const handleKeyPress = async (e, product, field) => {
    if (e.key === "Enter") {
      await handleBlur(product, field);
      console.log("Ejecutando el guardado de cambios...");
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setEditedValue("");
      console.log("No se guardan cambios...");
    }
  };

  return (
    <>
      <Box
        w="80vw"
        p={4}
        bg="whiteAlpha.50"
        m="auto"
        mt={8}
        mb={8}
        borderRadius="lg"
      >
        <Table variant="striped">
          <Thead>
            <Tr fontSize="1.5em" fontWeight="bold" textAlign="center" m="2">
              <Th>Producto</Th>
              <Th>Categoría</Th>
              <Th>Subcategoría</Th>
              <Th>Descripción</Th>
              <Th>Unidad de medida</Th>
              <Th>Precios</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((product) => (
              <Tr key={product.objectId}>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "tituloProducto")
                  }
                  onBlur={() => handleBlur(product, "tituloProducto")}
                >
                  {editingCell?.productId === product.objectId &&
                  editingCell?.field === "tituloProducto" ? (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyPress(e, product, "tituloProducto")
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => handleBlur(product, "tituloProducto")}
                        >
                          <MdOutlineSave />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    product.tituloProducto
                  )}
                </Td>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "categoria")
                  }
                  onBlur={() => handleBlur(product, "categoria")}
                >
                  {editingCell?.productId === product.objectId &&
                  editingCell?.field === "categoria" ? (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyPress(e, product, "categoria")
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => handleBlur(product, "categoria")}
                        >
                          <MdOutlineSave />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    product.categoria
                  )}
                </Td>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "subcategoria")
                  }
                  onBlur={() => handleBlur(product, "subcategoria")}
                >
                  {editingCell?.productId === product.objectId &&
                  editingCell?.field === "subcategoria" ? (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyPress(e, product, "subcategoria")
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => handleBlur(product, "subcategoria")}
                        >
                          <MdOutlineSave />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    product.subcategoria
                  )}
                </Td>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "descripcion")
                  }
                  onBlur={() => handleBlur(product, "descripcion")}
                >
                  {editingCell?.productId === product.objectId &&
                  editingCell?.field === "descripcion" ? (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyPress(e, product, "descripcion")
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => handleBlur(product, "descripcion")}
                        >
                          <MdOutlineSave />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    product.descripcion
                  )}
                </Td>
                <Td>{product.unidadMedida}</Td>
                <Td>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        {product.titulosVariantes.map((titulo, index) => (
                          <Th key={index}>{titulo}</Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        {product.preciosVariantes.map((precio, index) => (
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
                                onChange={(e) => setEditedValue(e.target.value)}
                                onKeyDown={(e) =>
                                  handleKeyPress(e, product, "unidadMedida")
                                }
                              />
                            </InputGroup>
                          </Td>
                        ))}
                      </Tr>
                    </Tbody>
                  </Table>
                </Td>

                <Td>
                  {" "}
                  <IconButton
                    variant="outline"
                    width="40%"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={async () => {
                      await eliminarProducto(product.objectId);
                      fetchProductos();
                    }}
                  />{" "}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ProductTable;
