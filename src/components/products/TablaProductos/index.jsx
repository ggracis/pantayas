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
  Box,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { eliminarProducto } from "../../../productService";
import ProductTableCell from "../TablaProductosCelda";

const ProductTable = ({
  productos,
  onEditProducto,
  onFetchProductos,
  setProductos,
}) => {
  useEffect(() => {
    fetchProductos();
  }, []);

  const handleCellSave = async (product, field, newValue) => {
    const updatedProduct = { ...product, [field]: newValue };
    await onEditProducto(updatedProduct);
  };

  const handlePrecioChange = async (e, productIndex, precioIndex) => {
    if (e.key === "Enter") {
      const updatedProductos = [...productos];
      const updatedPrecios = [
        ...updatedProductos[productIndex].preciosVariantes,
      ];
      updatedPrecios[precioIndex] = e.target.value;
      updatedProductos[productIndex].preciosVariantes = updatedPrecios;

      // Actualizar los precios en la base de datos usando onEditProducto
      const updatedProduct = { ...updatedProductos[productIndex] };
      updatedProduct.preciosVariantes = updatedPrecios;

      onEditProducto(updatedProduct);
    }
  };

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
            <Tr m="2">
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Producto
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Categoría
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Subcategoría
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Descripción
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Unidad de medida
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Precios
              </Th>
              <Th
                fontWeight="bold"
                textAlign="center"
                position="sticky"
                top="20"
                background="gray.800"
                color="white"
                zIndex="sticky"
              >
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((product, productIndex) => (
              <Tr key={product.objectId}>
                <ProductTableCell
                  value={product.tituloProducto}
                  onSave={(value) =>
                    handleCellSave(product, "tituloProducto", value)
                  }
                />
                <ProductTableCell
                  value={product.categoria}
                  onSave={(value) =>
                    handleCellSave(product, "categoria", value)
                  }
                />
                <ProductTableCell
                  value={product.subcategoria}
                  onSave={(value) =>
                    handleCellSave(product, "subcategoria", value)
                  }
                />
                <ProductTableCell
                  value={product.descripcion}
                  onSave={(value) =>
                    handleCellSave(product, "descripcion", value)
                  }
                />

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
                        {product.preciosVariantes.map((precio, precioIndex) => (
                          <Td key={precioIndex}>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children="$"
                              />
                              <Input
                                type="number"
                                placeholder={precio}
                                onChange={(e) => setEditedValue(e.target.value)}
                                onKeyDown={(e) =>
                                  handlePrecioChange(
                                    e,
                                    productIndex,
                                    precioIndex
                                  )
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
