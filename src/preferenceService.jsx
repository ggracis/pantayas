import Parse from "parse/dist/parse.min.js";

// Inicializar Parse SDK (conexión con la base de datos)
const PARSE_APPLICATION_ID = "WNBfJEeklSm2WQ7p92cJDtiPs7lpJyrkUErWj2uJ";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "bMSVQiyAwrqenmqdhc11M7gl1BcvlXEX5H1nJcoX";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// Traer los productos desde la base de datos
export const fetchPantallas = async () => {
  const Pantallas = Parse.Object.extend("Pantallas");
  const query = new Parse.Query(Pantallas);
  const results = await query.find();
  return results.map((result) => result.toJSON());
};

// Agregar un producto a la base de datos
export const agregarPantallas = async (nuevaPantallas) => {
  const Pantalla = Parse.Object.extend("Pantallas");
  const pantalla = new Pantalla();

  pantalla.set({
    Preferences: nuevaPantallas.Preferences,
    Title: nuevaPantallas.Title,
    Image: productoEdit.Image
  });

  try {
    await pantalla.save();
    console.log("Pantalla guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar la pantalla:", error);
    throw error;
  }
};

// Editar un producto en la base de datos
export const editarPantalla = async (productoEdit) => {
  try {
    const Pantalla = Parse.Object.extend("Pantallas");
    const pantalla = new Pantalla();

    await pantalla.save({
      Preferences: productoEdit.Preferences,
      Title: productoEdit.Title,
      Image: productoEdit.Image,
    });

    console.log("Pantalla editada exitosamente");
  } catch (error) {
    console.log(productoEdit)
    console.error("Error al editar la pantalla:", error);
    throw error;
  }
};

// Eliminar un producto de la base de datos
export const eliminarProducto = async (id) => {
  const confirmation = window.confirm(
    "¿Estás seguro de que deseas eliminar esta pantalla?"
  );

  if (confirmation) {
    try {
      const pantalla = await Parse.Object.extend("Pantallas").createWithoutData(
        id
      );

      await pantalla.destroy();
      console.log(`Pantalla con ID ${id} eliminada`);

      // Actualizar la lista de productos después de eliminar
      await fetchPantallas();
    } catch (error) {
      console.error("Error al eliminar la pantalla:", error);
      throw error;
    }
  }
};
