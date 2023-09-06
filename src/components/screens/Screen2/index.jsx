import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";
import Producto from "../../products/Producto";

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
    //console.log(categorias);
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
            <Text fontSize="2.25em" fontWeight="bold" textAlign="center" mb="2">
              {categoria}
            </Text>
            {categorias[categoria].map((producto) => (
              <Producto
                key={`${categoria}-${producto.objectId}`}
                producto={producto}
              />
            ))}
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default ListadoProductos;
