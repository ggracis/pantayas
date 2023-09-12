import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";
import Producto from "../../products/Producto";

/*
  colors{
    nav: #647382,
    background: #547826,
    product: #476238,
    textProduct: '#000000',
    textNav: '#FFFFFF'
  }
*/

const ListadoProductos = ({ productos, onFetchProductos, colors, socialMedias, title}) => {
  const intervalDelay = 5 * 60 * 1000; // 5 minutos en milisegundos
  const [lastUpdate, setLastUpdate] = useState(new Date());

  if (colors == null) {
    colors = {
      nav: '#000',
      background: '#1A202C',
      product: '#EBEBEB',
      textProduct: '#000000',
      textCategories: '#FFFFFF',
      textNav: '#FFFFFF'
    }
  }

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
  });

  return (
    <Box bg={colors.background}>
      <ScHeader bg={colors.nav} color={colors.textNav} socialMedias={socialMedias} title={title}/>
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {Object.keys(categorias).map((categoria) => (
          <div key={categoria} className={styles.myMasonryGridItem}>
            <Text fontSize="2.25em" fontWeight="bold" textAlign="center" mb="2" color={colors.textCategories}>
              {categoria}
            </Text>
            {categorias[categoria].map((producto) => (
              <Producto
                key={`${categoria}-${producto.objectId}`}
                producto={producto}
                bg={colors.product}
                textProduct={colors.textProduct}
              />
            ))}
          </div>
        ))}
      </Masonry>
    </Box>
  );
};

export default ListadoProductos;
