import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Text } from "@chakra-ui/react";
import {
  GET_CATEGORIAS,
  GET_SUBCATEGORIAS,
  GET_PRODUCTO,
  UPDATE_PRODUCTO,
} from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const EditarProducto = ({ productId }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria: null,
    subcategoria: null,
    unidadMedida: "Kg.",
    titulosVariantes: ["1/4 Kg.", "1/2 Kg.", "1 Kg."],
    preciosVariantes: Array(3).fill(""),
    activo: true,
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { categorias } = await graphQLClient.request(GET_CATEGORIAS);
        if (categorias) {
          setCategorias(categorias.data);
        } else {
          setCategorias([]);
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setCategorias([]);
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const { subcategorias } = await graphQLClient.request(
          GET_SUBCATEGORIAS
        );
        if (subcategorias) {
          setSubcategorias(subcategorias.data);
        } else {
          setSubcategorias([]);
        }
      } catch (error) {
        console.error("Error al obtener subcategorías:", error);
        setSubcategorias([]);
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, []);

  // Idealmente, obtendrías el nombre del producto desde una fuente de datos o de una prop,
  // en lugar de depender de una consulta inicial
  const [product, setProduct] = useState({ nombre: "" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Lógica para enviar la actualización del nombre del producto
      // Por ejemplo, enviar una solicitud a tu API para actualizar el nombre del producto
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error al actualizar el nombre del producto.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>ID del producto: {productId}</Text>
      <Input {...register("nombre")} defaultValue={product.nombre} />

      <Button type="submit">Actualizar Nombre</Button>
      {loading && <Text>Cargando...</Text>}
      {error && <Text color="red">{error}</Text>}
    </form>
  );
};

export default EditarProducto;
