// graphqlQueries.js
import { gql } from "graphql-request";
import graphQLClient from "./graphqlClient";

// ----------------
// Opciones del usuario
// ----------------

// Consulta para obtener una vista custom
export const GET_CUSTOMVIEWS = gql`
  query getCustomView($id: ID!) {
    customview(id: $id) {
      data {
        attributes {
          componentes
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

// ---------------- UPDATES ----------------

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

// ----------------
// Productos
// ----------------

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

// Traer un producto específico por ID
export const GET_PRODUCTO = gql`
  query getProducto($productId: ID!) {
    producto(id: $productId) {
      data {
        id
        attributes {
          nombre
          descripcion
          foto {
            data {
              attributes {
                url
              }
            }
          }
          precios
          unidadMedida
          categorias {
            data {
              id
              attributes {
                nombre
              }
            }
          }
          subcategorias {
            data {
              id
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

// Buscar un producto por nombre
export const SEARCH_PRODUCTO_BY_NAME = gql`
  query SearchProductosByName($nombre: String, $pageSize: Int, $page: Int) {
    productos(
      filters: { nombre: { containsi: $nombre } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "nombre"
    ) {
      data {
        id
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;

// Traer categorias
export const GET_CATEGORIAS = gql`
  query getCategorias {
    categorias {
      data {
        id
        attributes {
          nombre
        }
      }
    }
  }
`;

// Traer subcategorias
export const GET_SUBCATEGORIAS = gql`
  query getSubcategorias {
    subcategorias {
      data {
        id
        attributes {
          nombre
        }
      }
    }
  }
`;

// Eliminar producto
export const REMOVE_PRODUCTO = gql`
  mutation deleteProducto($idProducto: Int) {
    deleteProducto(id: $idProducto) {
      data {
        id
      }
    }
  }
`;

// Editar producto

// Crear producto
export const CREATE_PRODUCTO = gql``;

// ---------------- UPDATES ----------------

export const UPDATE_PPRODUCTO = gql`
  mutation updateProducto($id: ID!, $data: ProductoInput) {
    updateProducto(id: $id, data: $data) {
      producto {
        id
        nombre
        descripcion
        unidadMedida
        precios
        categorias
        subcategorias
      }
    }
  }
`;
