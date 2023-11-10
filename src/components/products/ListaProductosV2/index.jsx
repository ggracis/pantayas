import React, { useEffect, useState } from "react";
import { GET_PRODUCTO } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import {
  VStack,
  Text,
  Box,
  StackDivider,
  GridItem,
  Grid,
} from "@chakra-ui/react";

import styles from "./ListaProductos.module.css";

function ListaProductosV2({ productIds, titulo }) {
  const [productos, setProductos] = useState([]);
  const [preciosKeys, setPreciosKeys] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await Promise.all(
          productIds.map(async (productId) => {
            const data = await graphQLClient.request(GET_PRODUCTO, {
              productId: productId,
            });
            return data.producto.data.attributes;
          })
        );
        setProductos(productosData);

        const allPreciosKeys = productosData.reduce((acc, producto) => {
          Object.keys(producto.precios).forEach((precioKey) => {
            if (!acc.includes(precioKey)) {
              acc.push(precioKey);
            }
          });
          return acc;
        }, []);
        setPreciosKeys(allPreciosKeys);

        console.log("Productos: ", productosData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, [productIds]);

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={2}
      align="stretch"
      mt={4}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        lineHeight="shorter"
        textAlign="center"
        mb={1}
        mt={2}
      >
        {titulo}
      </Text>
      {productos.map((producto, index) => (
        <Grid templateColumns="repeat(6, 1fr)" key={index}>
          <GridItem colSpan={4}>
            <Text className={styles.nombres}>{producto.nombre}</Text>
            <Text className={styles.descripcion}>{producto.descripcion}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Grid templateColumns="repeat(3, 1fr)" key={index}>
              {preciosKeys.map(
                (precioKey, index) =>
                  producto.precios[precioKey] && (
                    <GridItem className={styles.precioBox} key={index}>
                      <Text className={`${styles[`precioNumero${index + 1}`]}`}>
                        ${producto.precios[precioKey]}
                      </Text>
                      <Text className={styles.precioDescripcion}>
                        {precioKey}
                      </Text>
                    </GridItem>
                  )
              )}
            </Grid>
          </GridItem>
        </Grid>
      ))}
    </VStack>
  );
}

export default ListaProductosV2;
