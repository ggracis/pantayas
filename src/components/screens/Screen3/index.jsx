import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import ScHeader from "../../ScHeader";
import Masonry from "react-masonry-css";
import styles from "./ListadoProductos.module.css";
import Producto from "../../products/Producto";

const ListadoProductos = ({ productos, onFetchProductos }) => {
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
      <ScHeader />
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
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
                      <Producto key={producto.objectId} producto={producto} />
                    ))
                : categorias[categoria].map((producto) => (
                    <Producto key={producto.objectId} producto={producto} />
                  ))}
            </Flex>
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default ListadoProductos;
