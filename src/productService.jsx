import Parse from "parse/dist/parse.min.js";

// Inicializar Parse SDK (conexión con la base de datos)
const PARSE_APPLICATION_ID = "WNBfJEeklSm2WQ7p92cJDtiPs7lpJyrkUErWj2uJ";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "bMSVQiyAwrqenmqdhc11M7gl1BcvlXEX5H1nJcoX";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// Traer los productos desde la base de datos
export const fetchProductos = async () => {
  const Producto = Parse.Object.extend("Producto");
  const query = new Parse.Query(Producto);
  const results = await query.find();
  return results.map((result) => result.toJSON());
};

// Agregar un producto a la base de datos
export const agregarProducto = async (nuevoProducto) => {
  const Producto = Parse.Object.extend("Producto");
  const producto = new Producto();

  producto.set({
    tituloProducto: nuevoProducto.tituloProducto,
    descripcion: nuevoProducto.descripcion,
    categoria: nuevoProducto.categoria,
    subcategoria: nuevoProducto.subcategoria,
    unidadMedida: nuevoProducto.unidadMedida,
    titulosVariantes: nuevoProducto.titulosVariantes,
    preciosVariantes: nuevoProducto.preciosVariantes,
    activo: nuevoProducto.activo,
  });

  try {
    await producto.save();
    console.log("Producto guardado exitosamente");
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

// Editar un producto en la base de datos
export const editarProducto = async (productoEdit) => {
  try {
    const Producto = Parse.Object.extend("Producto");
    const producto = new Producto();

    await producto.save({
      objectId: productoEdit.objectId,
      tituloProducto: productoEdit.tituloProducto,
      descripcion: productoEdit.descripcion,
      categoria: productoEdit.categoria,
      subcategoria: productoEdit.subcategoria,
      unidadMedida: productoEdit.unidadMedida,
      titulosVariantes: productoEdit.titulosVariantes,
      preciosVariantes: productoEdit.preciosVariantes,
      activo: productoEdit.activo,
    });

    console.log("Producto editado exitosamente");
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

// Eliminar un producto de la base de datos
export const eliminarProducto = async (id) => {
  const confirmation = window.confirm(
    "¿Estás seguro de que deseas eliminar este producto?"
  );

  if (confirmation) {
    try {
      const producto = await Parse.Object.extend("Producto").createWithoutData(
        id
      );

      await producto.destroy();
      console.log(`Producto con ID ${id} eliminado`);

      // Actualizar la lista de productos después de eliminar
      await fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
};
