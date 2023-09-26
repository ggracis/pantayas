// graphqlQueries.js
import { gql } from "graphql-request";
import graphQLClient from "./graphqlClient";

// Trae todos los productos... ponele
export const GET_PRODUCTOS = gql`
  query getProductos {
    productos {
      data {
        id
        attributes {
          nombre
          descripcion
          precios
          categorias {
            data {
              attributes {
                nombre
              }
            }
          }
          subcategorias {
            data {
              attributes {
                nombre
              }
            }
          }
        }
      }
    }
  }
`;

// Consulta para obtener una vista custom
export const GET_CUSTOMVIEWS = gql`
  query getCustomView {
    customview(id: 1) {
      data {
        attributes {
          componentes
        }
      }
    }
  }
`;

// Traer un producto específico por ID
export const GET_PRODUCTO = gql`
  query getProducto($productId: ID!) {
    producto(id: $productId) {
      data {
        id
        attributes {
          nombre
          descripcion
          precios
        }
      }
    }
  }
`;

// Traer opciones de pantalla
export const GET_PANTALLA = gql`
  query getPantalla {
    pantalla(id: 1) {
      data {
        attributes {
          logoURL {
            data {
              attributes {
                url
              }
            }
          }
          opciones
        }
      }
    }
  }
`;

// ----------------
// Modificar
// ----------------

// Actualizar las opciones de pantalla
export const UPDATE_PANTALLA = gql`
  mutation UpdatePantalla($data: JSON, $id: ID!) {
    updatePantalla(data: { opciones: $data }, id: $id) {
      data {
        attributes {
          logoURL {
            data {
              attributes {
                url
              }
            }
          }
          opciones
        }
      }
    }
  }
`;
