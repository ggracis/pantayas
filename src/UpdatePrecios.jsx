import React, { useEffect } from "react";
import graphQLClient from "./graphqlClient";

const UpdatePrecios = () => {
  useEffect(() => {
    async function updateProductsPricesAndUnitOfMeasure() {
      try {
        // Consulta para obtener productos con precios nulos
        const query = `
          query ProductosSinPrecio {
            productos(
              filters: {
                precios: { null: true }
              }
              sort: "nombre"
            ) {
              data {
                id
              }
            }
          }
        `;

        const { productos } = await graphQLClient.request(query);
        console.log(productos);

        // Iterar sobre los productos con precios nulos y actualizarlos
        for (const producto of productos.data) {
          const mutation = `
            mutation UpdateProduct($id: ID!) {
              updateProducto(
                data: {
                  precios: {
                    Chico: 0,
                    Mediano: 0,
                    Grande: 0
                  }
                }
                id: $id
              ) {
                data {
                  attributes {
                    nombre
                  }
                }
              }
            }
          `;

          const variables = {
            id: producto.id,
          };

          const updatedProducto = await graphQLClient.request(
            mutation,
            variables
          );
          console.log(
            `Se actualizó el producto ${updatedProducto.updateProducto.data.attributes.nombre}`
          );
        }

        console.log("Se han actualizado los precios de los productos.");
      } catch (error) {
        console.error("Error al actualizar los productos:", error);
      }
    }

    // Llama a la función de actualización cuando el componente se monta
    updateProductsPricesAndUnitOfMeasure();
  }, []);

  return <div>UpdatePrecios</div>;
};

export default UpdatePrecios;
