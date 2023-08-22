import { Box, SimpleGrid, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";

const ListadoProductos = ({ productos, onFetchProductos }) => {
  const intervalDelay = 5 * 60 * 1000; // 5 minutos en milisegundos
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useInterval(() => {
    const now = new Date();
    const elapsedTime = now - lastUpdate;

    if (elapsedTime >= intervalDelay) {
      fetchProductos();
      setLastUpdate(now);
      console.log("Productos actualizados.");
    } else {
      const remainingTime = intervalDelay - elapsedTime;
      console.log(
        `Faltan ${Math.floor(
          remainingTime / 1000
        )} segundos para la próxima actualización.`
      );
    }
  }, 30 * 1000); // 30 segundos en milisegundos

  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    await onFetchProductos();
  };

  const categorias = {};
  productos.forEach((producto) => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  return (
    <>
      <ScHeader />
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {Object.keys(categorias).map((categoria) => (
          <div key={categoria} className={styles.myMasonryGridItem}>
            <Text fontSize="1.5em" fontWeight="bold" textAlign="center" mb="2">
              {categoria}
            </Text>
            {categorias[categoria].map((producto) => (
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
            ))}
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default ListadoProductos;
