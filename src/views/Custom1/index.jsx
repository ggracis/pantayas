import React, { useEffect, useState } from "react";
import graphQLClient from "../../graphqlClient";
import { GET_CUSTOMVIEWS, GET_PANTALLA } from "../../graphqlQueries";
import ScHeader from "../../components/ScHeader";
import ListaProductos from "../../components/products/ListaProductos";

function CustomView1() {
  const [customViewData, setCustomViewData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const fetchCustomView = async () => {
      try {
        const data = await graphQLClient.request(GET_CUSTOMVIEWS);
        setCustomViewData(data.customview.data.attributes.componentes);
        // Obtén los IDs de productos de productList y guárdalos en productIds
        const productListIds =
          data.customview.data.attributes.componentes.productList.productIds;
        setProductIds(productListIds);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCustomView();
  }, []);

  useEffect(() => {
    if (customViewData) {
      // Limpiar la lista de componentes seleccionados al cargar nuevos datos
      setSelectedComponents((prevSelectedComponents) => {
        let newSelectedComponents = [...prevSelectedComponents];

        // Verificar si el valor de "header" es "ScHeader" y renderizar el componente correspondiente
        if (customViewData.header === "ScHeader") {
          const ScBg = customViewData.ScBg || "gray.500";
          newSelectedComponents.push(<ScHeader key="ScHeader" ScBg={ScBg} />);
        }

        if (
          Array.isArray(customViewData.productList.productIds) &&
          customViewData.productList.productIds.length > 0
        ) {
          newSelectedComponents.push(
            <ListaProductos
              key="ListaProductos"
              productIds={customViewData.productList.productIds}
            />
          );
        }

        return newSelectedComponents;
      });
    }
  }, [customViewData]);

  return (
    <>
      {selectedComponents.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
    </>
  );
}

export default CustomView1;
