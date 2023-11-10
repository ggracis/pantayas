import React, { useEffect, useState } from "react";
import { GET_PRODUCTO } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import styles from "./ListaProductos.module.css";

function ListaProductos({ productIds, titulo }) {
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
    <>
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

      <TableContainer>
        <Table variant="striped" colorScheme="whiteAlpha" size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              {preciosKeys.map((precioKey) => (
                <Th key={precioKey}>
                  <Text
                    className={styles.titulos}
                    id="titulos"
                  >{`${precioKey}`}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((producto) => (
              <Tr key={producto.nombre}>
                <Td>
                  <Text className={styles.nombres} id="nombres">
                    {producto.nombre}
                  </Text>
                  <Text className={styles.descripcion} id="descripcion">
                    {producto.descripcion}
                  </Text>
                </Td>
                {preciosKeys.map((precioKey) => (
                  <Td key={precioKey}>
                    {producto.precios[precioKey] ? (
                      <Text className={styles.precios}>
                        ${producto.precios[precioKey]}
                      </Text>
                    ) : (
                      <Text className={styles.precios}> </Text>
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListaProductos;
