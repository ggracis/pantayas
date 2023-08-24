import { Box, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../../screens/Screen2/ListadoProductos.module.css";

const Producto = ({ producto }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      key={producto.objectId}
      p="1"
      m="1"
      borderRadius="md"
      bg={colorMode === "light" ? "#353535" : "#e6e6e6"}
      color={colorMode === "light" ? "white" : "black"}
      className={styles.masonryItem}
    >
      <div className={styles.productInfo}>
        <div className={styles.productText}>
          <Text fontSize="1.5em" lineHeight="1em" fontWeight="bold">
            {producto.item}
          </Text>
          <Text fontSize="0.9em" lineHeight="1em">
            {producto.descripcion}
          </Text>
        </div>
        <Text fontSize="1.75em" fontWeight="bolder">
          ${producto.precio}
        </Text>
      </div>
    </Box>
  );
};
export default Producto;
