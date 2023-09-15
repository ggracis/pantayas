import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";
import Producto from "../../products/Producto";
import {
  SummaCorrection
} from "../../../colorFunctions"; // Importar las funciones
import { availableSocialMedias } from "../../ModPreferencias/ModComponents/usefulObjectes";

const ListadoProductos = ({ productos, onFetchProductos, nav, background, product, title, socialMedia = [], image }) => {
  const intervalDelay = 5 * 60 * 1000; // 5 minutos en milisegundos
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const navSelected = useMemo(() => (nav === null||nav===undefined) ? '#000' : nav, [nav])
  const backgroundSelected = useMemo(() => (background === null||background===undefined) ?'#1A202C':background, [background])
  const productSelected = useMemo(() => (product === null||product===undefined) ? '#EBEBEB' : product, [product])
  const textProductSelected = useMemo(() => (product === null||product===undefined) ? '#000000':SummaCorrection(product), [product])
  const textCategoriesSelected = useMemo(() =>(background === null||background===undefined)?'#ffffff':SummaCorrection(background), [background])
  const textNavSelected = useMemo(() => (nav === null||nav===undefined) ? '#ffffff':SummaCorrection(nav), [nav])
  const titleSelected = useMemo(() => (title === null||title===undefined) ? 'NTQJ PANADERIA' : title, [title])
  const imageSelected = useMemo(() => image, [image])
  const socialMediaSelected = useMemo(() =>socialMedia.length<=0?availableSocialMedias:socialMedia, [socialMedia])

  // const navSelected = (nav === null||nav===undefined) ? '#000' : nav
  // const backgroundSelected = (background === null||background===undefined) ?'#1A202C':background
  // const productSelected = (product === null||product===undefined) ? '#EBEBEB' : product
  // const textProductSelected = (product === null||product===undefined) ? '#000000':SummaCorrection(product)
  // const textCategoriesSelected = (background === null||background===undefined)?'#ffffff':SummaCorrection(background)
  // const textNavSelected = (nav === null||nav===undefined) ? '#ffffff':SummaCorrection(nav)
  // const titleSelected = (title === null||title===undefined) ? 'NTQJ PANADERIA' : title
  // const imageSelected = image

  

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
  <Box bg={backgroundSelected}>
    <ScHeader bg={navSelected} color={textNavSelected} socialMedias={socialMediaSelected} title={titleSelected} image={imageSelected} />
    <Masonry
      breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {Object.keys(categorias).map((categoria) => (
        <div key={categoria} className={styles.myMasonryGridItem}>
          <Text fontSize="2.25em" fontWeight="bold" textAlign="center" mb="2" color={textCategoriesSelected}>
            {categoria}
          </Text>
          {categorias[categoria].map((producto) => (
            <Producto
              key={`${categoria}-${producto.objectId}`}
              producto={producto}
              bg={productSelected}
              textProduct={textProductSelected}
            />
          ))}
        </div>
      ))}
    </Masonry>
  </Box>
);
};

export default ListadoProductos;
