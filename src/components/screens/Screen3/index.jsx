import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";
import Producto from "../../products/Producto";
import { SummaCorrection } from "../../../colorFunctions"; // Importar las funciones
import { availableSocialMedias } from "../../ModPreferencias/ModComponents/usefulObjectes";

const ListadoProductos = ({
  productos,
  onFetchProductos,
  nav,
  background,
  product,
  title,
  socialMedia = [],
  image,
}) => {
  const navSelected = useMemo(
    () => (nav === null || nav === undefined ? "#000" : nav),
    [nav]
  );
  const backgroundSelected = useMemo(
    () =>
      background === null || background === undefined ? "#1A202C" : background,
    [background]
  );
  const productSelected = useMemo(
    () => (product === null || product === undefined ? "#EBEBEB" : product),
    [product]
  );
  const textProductSelected = useMemo(
    () =>
      product === null || product === undefined
        ? "#000000"
        : SummaCorrection(product),
    [product]
  );
  const textCategoriesSelected = useMemo(
    () =>
      background === null || background === undefined
        ? "#ffffff"
        : SummaCorrection(background),
    [background]
  );
  const textNavSelected = useMemo(
    () =>
      nav === null || nav === undefined ? "#ffffff" : SummaCorrection(nav),
    [nav]
  );
  const titleSelected = useMemo(
    () => (title === null || title === undefined ? "NTQJ PANADERIA" : title),
    [title]
  );
  const imageSelected = useMemo(() => image, [image]);
  const socialMediaSelected = useMemo(
    () => (socialMedia.length <= 0 ? availableSocialMedias : socialMedia),
    [socialMedia]
  );

  const [grupoActual, setGrupoActual] = useState(0);

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

  const categoriasArray = Object.keys(categorias);

  useEffect(() => {
    // Función para avanzar al siguiente grupo de categoría cada 10 segundos
    const avanzarAlSiguienteGrupo = () => {
      if (categoriasArray.length > 0) {
        const categoriaActual = categoriasArray[grupoActual];
        const productosEnCategoria = categorias[categoriaActual].length;
        if (productosEnCategoria >= 10) {
          if (grupoActual === categoriasArray.length - 1) {
            setGrupoActual(0);
          } else {
            setGrupoActual((prevGrupo) => prevGrupo + 1);
          }
        }
      }
    };

    // Iniciar el intervalo para avanzar cada 10 segundos
    const intervalo = setInterval(avanzarAlSiguienteGrupo, 10000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, [grupoActual, categoriasArray, categorias]);

  return (
    <>
      <ScHeader
        bg={navSelected}
        color={textNavSelected}
        socialMedias={socialMediaSelected}
        title={titleSelected}
        image={imageSelected}
      />
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
        bg={backgroundSelected}
      >
        {categoriasArray.map((categoria, index) => (
          <div className={styles.myMasonryGridItem} key={index}>
            <Text fontSize="2.25em" fontWeight="bold" textAlign="center" mb="2">
              {categoria}
            </Text>
            <Flex flexWrap="wrap">
              {categorias[categoria].length >= 10
                ? categorias[categoria]
                    .slice(grupoActual * 9, grupoActual * 9 + 9)
                    .map((producto) => (
                      <Producto
                        key={`${categoria}-${producto.objectId}`}
                        producto={producto}
                        bg={productSelected}
                        textProduct={textProductSelected}
                      />
                    ))
                : categorias[categoria].map((producto) => (
                    <Producto
                      key={`${categoria}-${producto.objectId}`}
                      producto={producto}
                      bg={productSelected}
                      textProduct={textProductSelected}
                    />
                  ))}
            </Flex>
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default ListadoProductos;
