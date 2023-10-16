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
import { eliminarProducto } from "../../../productService.jsx";

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
    const updatedProduct = {
      ...product,
      attributes: { ...product.attributes, [field]: newValue },
    };
    await onEditProducto(updatedProduct);
  };

  const handlePrecioChange = async (e, productIndex, precioIndex) => {
    if (e.key === "Enter") {
      const updatedProductos = [...productos];
      const updatedPrecios = [
        ...updatedProductos[productIndex].attributes.precios,
      ];
      updatedPrecios[precioIndex] = e.target.value;
      updatedProductos[productIndex].attributes.precios = updatedPrecios;

      // Actualizar los precios en la base de datos usando onEditProducto
      const updatedProduct = { ...updatedProductos[productIndex] };
      updatedProduct.attributes.precios = updatedPrecios;

      onEditProducto(updatedProduct);
    }
  };

  const fetchProductos = async () => {
    try {
      await onFetchProductos();
      console.log("Productos cargados correctamente:", productos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const [editingCell, setEditingCell] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleCellDoubleClick = (product, field) => {
    setEditingCell({ productId: product.id, field });
    setEditedValue(product.attributes[field]);
  };

  const handleBlur = async (product, field) => {
    if (editingCell) {
      const { productId } = editingCell;
      if (productId === product.id && editingCell.field === field) {
        const updatedProduct = {
          ...product,
          attributes: { ...product.attributes, [field]: editedValue },
        };
        await onEditProducto(updatedProduct);
        await fetchProductos();
        setEditingCell(null);
        setEditedValue("");
      }
    }
  };

  // Función de utilidad para acceder a propiedades anidadas de un objeto de forma segura
  function getNestedPropertyValue(obj, path, defaultValue = "") {
    try {
      const keys = Array.isArray(path) ? path : path.split(".");
      return keys.reduce((acc, key) => acc[key], obj) || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

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
            {productos.map((product) => (
              <Tr key={product.id}>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "categorias")
                  }
                >
                  {editingCell &&
                  editingCell.productId === product.id &&
                  editingCell.field === "categorias" ? (
                    <Input
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => handleBlur(product, "categorias")}
                    />
                  ) : (
                    getNestedPropertyValue(
                      product,
                      "attributes.categorias.data",
                      []
                    )
                      .map((categoria) =>
                        getNestedPropertyValue(
                          categoria,
                          "attributes.nombre",
                          ""
                        )
                      )
                      .join(", ")
                  )}
                </Td>

                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "categorias")
                  }
                >
                  {editingCell &&
                  editingCell.productId === product.id &&
                  editingCell.field === "categorias" ? (
                    <Input
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => handleBlur(product, "categorias")}
                    />
                  ) : (
                    product.attributes.categorias.data
                      .map((categoria) => attributes.nombre)
                      .join(", ")
                  )}
                </Td>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "subcategorias")
                  }
                >
                  {editingCell &&
                  editingCell.productId === product.id &&
                  editingCell.field === "subcategorias" ? (
                    <Input
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => handleBlur(product, "subcategorias")}
                    />
                  ) : (
                    product.attributes.subcategorias.data
                      .map((subcategoria) => subcategoria.attributes.nombre)
                      .join(", ")
                  )}
                </Td>
                <Td
                  onDoubleClick={() =>
                    handleCellDoubleClick(product, "descripcion")
                  }
                >
                  {editingCell &&
                  editingCell.productId === product.id &&
                  editingCell.field === "descripcion" ? (
                    <Input
                      autoFocus
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onBlur={() => handleBlur(product, "descripcion")}
                    />
                  ) : (
                    product.attributes.descripcion || "-"
                  )}
                </Td>

                <Td>{product.attributes.unidadMedida}</Td>
                <Td>
                  <Table size="sm">
                    <Tbody>
                      <Tr>
                        {product.attributes.precios &&
                          Object.keys(product.attributes.precios).map(
                            (precioVariante, precioIndex) => (
                              <Td key={precioIndex}>
                                {editingCell &&
                                editingCell.productId === product.id &&
                                editingCell.field === "precios" ? (
                                  <InputGroup>
                                    <InputLeftElement
                                      pointerEvents="none"
                                      color="gray.300"
                                      children="$"
                                    />
                                    <Input
                                      type="number"
                                      autoFocus
                                      value={editedValue}
                                      onChange={(e) =>
                                        setEditedValue(e.target.value)
                                      }
                                      onKeyDown={(e) =>
                                        handlePrecioChange(
                                          e,
                                          productIndex,
                                          precioVariante
                                        )
                                      }
                                      onBlur={() =>
                                        handleBlur(product, "precios")
                                      }
                                    />
                                  </InputGroup>
                                ) : (
                                  product.attributes.precios[precioVariante]
                                )}
                              </Td>
                            )
                          )}
                      </Tr>
                    </Tbody>
                  </Table>
                </Td>

                <Td>
                  <IconButton
                    variant="outline"
                    width="40%"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={async () => {
                      await eliminarProducto(product.id);
                      fetchProductos();
                    }}
                  />
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
