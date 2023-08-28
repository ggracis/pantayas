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
            {producto.tituloProducto}
          </Text>
          <Text fontSize="0.9em" lineHeight="1em">
            {producto.descripcion}
          </Text>
        </div>
        {producto.titulosVariantes.map((titulo, index) => {
          if (producto.preciosVariantes[index] !== "") {
            return (
              <div key={index} style={{ textAlign: "center", margin: "5px" }}>
                <Text
                  fontSize={index === 0 ? "1.75em" : "1.5em"}
                  fontWeight="bold"
                  color={index === 0 ? "green.500" : "inherit"}
                >
                  ${producto.preciosVariantes[index]}
                </Text>
                <Text fontSize="0.9em" lineHeight="0.4em">
                  {titulo}
                </Text>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Box>
  );
};
export default Producto;
