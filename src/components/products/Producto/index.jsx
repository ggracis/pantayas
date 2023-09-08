import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../../screens/Screen2/ListadoProductos.module.css";

const Producto = ({ producto, bg, textProduct }) => {

  return (
    <Box
      key={producto.objectId}
      p="1"
      m="1"
      borderRadius="md"
      bg= {bg}
      className={styles.masonryItem}
      width="100%"
    >
      <div className={styles.productInfo}>
        <div className={styles.productText}>
          <Text fontSize="2em" lineHeight="1em" fontWeight="bold" color={textProduct}>
            {producto.tituloProducto}
          </Text>
          <Text fontSize="0.9em" lineHeight="1em" color={textProduct}>
            {producto.descripcion}
          </Text>
        </div>
        {producto.titulosVariantes.map((titulo, index) => {
          if (producto.preciosVariantes[index] !== "") {
            return (
              <div key={index} style={{ textAlign: "center", margin: "5px" }}>
                <Text
                  fontSize={index === 0 ? "2em" : "1.75em"}
                  fontWeight="bold"
                  color={textProduct}
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
