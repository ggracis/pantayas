import React, { useEffect, useState } from "react";
import { GET_PRODUCTO } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function ListaProductos({ productIds }) {
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

        console.log(productosData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, [productIds]);

  return (
    <TableContainer>
      <Table
        variant="striped"
        colorScheme="blackAlpha"
        size="sm"
        bg="brand.100"
      >
        <Thead>
          <Tr>
            <Th></Th>
            {preciosKeys.map((precioKey) => (
              <Th
                fontSize="1.5em"
                lineHeight="2em"
                key={precioKey}
              >{`${precioKey}`}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((producto) => (
            <Tr key={producto.nombre}>
              <Td>
                <Text fontSize="2.25em" lineHeight="1em" fontWeight="bold">
                  {producto.nombre}
                </Text>
                <Text fontSize="0.9em" lineHeight="1em">
                  {producto.descripcion}
                </Text>
              </Td>
              {preciosKeys.map((precioKey) => (
                <Td key={precioKey}>
                  <Text
                    fontSize={`${3 - preciosKeys.indexOf(precioKey) / 2.5}em`}
                    fontWeight="bold"
                  >
                    ${producto.precios[precioKey]}
                  </Text>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListaProductos;
