// graphqlQueries.js
import { gql } from "graphql-request";

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

// Traer todas las customviews (id y nombre)
export const GET_CUSTOMVIEWS_LIST = gql`
  query getCustomViews {
    customviews {
      data {
        id
        attributes {
          nombre
        }
      }
    }
  }
`;

// Traer opciones de local
export const GET_LOCAL = gql`
  query getLocal {
    local(id: 1) {
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
          tvs {
            data {
              id
              attributes {
                activo
                nombre
                horario
                defaultCV
                diarioCV
                findeCV
              }
            }
          }
        }
      }
    }
  }
`;

// Crear Custom View

export const CREATE_CUSTOMVIEW = gql`
  mutation createCustomview($data: CustomviewInput!) {
    createCustomview(data: $data) {
      data {
        id
        attributes {
          nombre
          estructura
          componentes
        }
      }
    }
  }
`;

// ---------------- UPDATES ----------------

// Actualizar las opciones de local
export const UPDATE_LOCAL = gql`
  mutation UpdateLocal($data: JSON, $id: ID!) {
    updateLocal(data: { opciones: $data }, id: $id) {
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

// Actualizar las tv's
export const UPDATE_TV_CUSTOMVIEW = gql`
  mutation UpdateTvCustomview(
    $tvId: ID!
    $defaultCV: String
    $diarioCV: String
    $findeCV: String
  ) {
    updateTv(
      id: $tvId
      data: { defaultCV: $defaultCV, diarioCV: $diarioCV, findeCV: $findeCV }
    ) {
      data {
        attributes {
          defaultCV
          diarioCV
          findeCV
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
          categoria {
            data {
              attributes {
                nombre
              }
            }
          }
          subcategoria {
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
          categoria {
            data {
              id
              attributes {
                nombre
              }
            }
          }
          subcategoria {
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

// Buscar un producto por nombre
export const SEARCH_PRODUCTO = gql`
  query SearchProductos($nombre: String, $pageSize: Int, $page: Int) {
    productos(
      filters: { nombre: { containsi: $nombre } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "nombre"
    ) {
      data {
        id
        attributes {
          nombre
          categoria {
            data {
              attributes {
                nombre
              }
            }
          }
          subcategoria {
            data {
              attributes {
                nombre
              }
            }
          }
        }
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

// Buscar un producto
export const SEARCH_PRODUCTO_CATEGORIAS = gql`
  query SearchProductos(
    $nombre: String
    $pageSize: Int
    $page: Int
    $categoria: ID
    $subcategoria: ID
  ) {
    productos(
      filters: {
        nombre: { containsi: $nombre }
        categoria: { id: { containsi: $categoria } }
        subcategoria: { id: { containsi: $subcategoria } }
      }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "nombre"
    ) {
      data {
        id
        attributes {
          nombre
        }
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

// Eliminar producto
export const DELETE_PRODUCTO = gql`
  mutation deleteProducto($idProducto: ID!) {
    deleteProducto(id: $idProducto) {
      data {
        id
      }
    }
  }
`;

// Crear producto
export const CREATE_PRODUCTO = gql`
  mutation createProducto(
    $nombre: String
    $descripcion: String
    $unidadMedida: String
    $precios: JSON
    $categoria: ID
    $subcategoria: ID
  ) {
    createProducto(
      data: {
        nombre: $nombre
        descripcion: $descripcion
        unidadMedida: $unidadMedida
        precios: $precios
        categoria: $categoria
        subcategoria: $subcategoria
      }
    ) {
      data {
        attributes {
          nombre
          descripcion
          unidadMedida
          precios
          categoria {
            data {
              id
              attributes {
                nombre
              }
            }
          }
          subcategoria {
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

// ---------------- UPDATES ----------------

export const UPDATE_PRODUCTO = gql`
  mutation updateProducto(
    $id: ID!
    $nombre: String
    $descripcion: String
    $unidadMedida: String
    $precios: JSON
    $categoria: ID
    $subcategoria: ID
  ) {
    updateProducto(
      id: $id
      data: {
        nombre: $nombre
        descripcion: $descripcion
        unidadMedida: $unidadMedida
        precios: $precios
        categoria: $categoria
        subcategoria: $subcategoria
      }
    ) {
      data {
        id
        attributes {
          nombre
          descripcion
          unidadMedida
          precios
          categoria {
            data {
              id
              attributes {
                nombre
              }
            }
          }
          subcategoria {
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
