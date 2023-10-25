import React, { useEffect, useState } from "react";
import graphQLClient from "../../graphqlClient";
import { GET_CUSTOMVIEWS, GET_LOCAL } from "../../graphqlQueries";
import ScHeader from "../../components/ScHeader";
import ListaProductos from "../../components/products/ListaProductos";
import styles from "./Custom1.module.css";

const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));

const hexBg = storedOpciones.hexBg;
/* 
const hexTexto = storedOpciones.hexTexto;
const hexHead = storedOpciones.hexHead;
fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
hexBrand1: "#b369cfff"
hexBrand2: "#6172e2ff"
hexHead: "#807435ff"
hexTexto: "#5da763ff"
 */

function CustomView1() {
  const [customViewData, setCustomViewData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const fetchCustomView = async () => {
      try {
        const data = await graphQLClient.request(GET_CUSTOMVIEWS, {
          id: 1,
        });
        setCustomViewData(data.customview.data.attributes.componentes);
        // Obtén los IDs de productos de productList y guárdalos en productIds
        const productListIds =
          data.customview.data.attributes.componentes.productList.productIds;
        console.log(productListIds);

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
          newSelectedComponents.push(<ScHeader key="ScHeader" />);
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
    <div bg={hexBg}>
      {selectedComponents.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
    </div>
  );
}

export default CustomView1;
