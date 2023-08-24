import { Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Categoría</Th>
          <Th>Descripción</Th>
          <Th>Precio</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {productos.map((product) => (
          <Tr key={product.objectId}>
            <Td
              onDoubleClick={() => handleCellDoubleClick(product, "item")}
              onBlur={() => handleBlur(product, "item")}
            >
              {editingCell?.productId === product.objectId &&
              editingCell?.field === "item" ? (
                <Input
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                product.item
              )}
            </Td>
            <Td
              onDoubleClick={() => handleCellDoubleClick(product, "categoria")}
              onBlur={() => handleBlur(product, "categoria")}
            >
              {editingCell?.productId === product.objectId &&
              editingCell?.field === "categoria" ? (
                <Input
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                product.categoria
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
                <Input
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                product.descripcion
              )}
            </Td>
            <Td
              onDoubleClick={() => handleCellDoubleClick(product, "precio")}
              onBlur={() => handleBlur(product, "precio")}
            >
              {editingCell?.productId === product.objectId &&
              editingCell?.field === "precio" ? (
                <Input
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                product.precio
              )}
            </Td>

            <Td> {/* Aquí irán los botones de edición */} </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductTable;
