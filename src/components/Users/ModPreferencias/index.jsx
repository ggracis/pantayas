import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  useColorMode,
  Input,
  Stack,
  Button,
  FormControl,
  Td,
  InputGroup,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGlobe,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTag,
  FaUpload,
} from "react-icons/fa";
import Colorful from "@uiw/react-color-colorful";
import styles from "./ModPreferencias.module.css";
import CustomView1 from "../../../views/Custom1";
import { GET_PANTALLA, UPDATE_PANTALLA } from "../../../graphqlQueries";
import graphQLClient from "../../../graphqlClient";

const ModPreferencias = () => {
  const { colorMode } = useColorMode();
  const [opciones, setOpciones] = useState({
    hexHead: "",
    hexBg: "",
    hexTexto: "",
    hexBrand1: "",
    hexBrand2: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    web: "",
    nombreLocal: "",
    direccion: "",
  });
  const [logoURL, setLogoURL] = useState("");

  useEffect(() => {
    graphQLClient
      .request(GET_PANTALLA)
      .then((data) => {
        const opciones =
          data.pantalla.data.attributes.opciones.attributes.opciones;
        setOpciones(opciones);

        // Actualiza la URL del logo
        const relativeURL =
          data.pantalla.data.attributes.logoURL.data.attributes.url;
        const fullURL = `http://54.94.34.59:1337${relativeURL}`; // Concatena la URL base
        setLogoURL(fullURL); // Actualiza la URL del logo con la URL completa
      })
      .catch((error) => {
        console.error("Error al cargar la configuración:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Divide el nombre en partes usando el punto como separador
    const nameParts = name.split(".");

    // Realiza una actualización profunda del estado en función de las partes del nombre
    setOpciones((prevOpciones) => {
      let updatedOpciones = { ...prevOpciones };
      let currentOpciones = updatedOpciones;

      // Itera a través de las partes del nombre, excepto la última
      for (let i = 0; i < nameParts.length - 1; i++) {
        const part = nameParts[i];
        if (!currentOpciones[part]) {
          currentOpciones[part] = {};
        }
        currentOpciones = currentOpciones[part];
      }
      // Establece el valor en la parte final del objeto
      currentOpciones[nameParts[nameParts.length - 1]] = value;

      return updatedOpciones;
    });
  };

  const copyFileToPublicFolder = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      // A continuación, puedes realizar acciones con el contenido del archivo
      // Por ejemplo, puedes enviarlo a través de una solicitud AJAX para guardarlo en el servidor
      // O realizar otras acciones necesarias

      console.log("Contenido del archivo:", fileContent);
    };

    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      // Crea un objeto FormData para enviar el archivo a Strapi
      const formData = new FormData();
      formData.append("files", file);
      formData.append("ref", "api::pantalla.pantalla"); // Nombre del modelo
      formData.append("refId", "1"); // ID de la entidad pantalla
      formData.append("field", "logoURL"); // Nombre del campo donde se guardará el archivo
      // Realiza una solicitud POST a Strapi para cargar el archivo
      fetch("http://54.94.34.59:1337/api/upload/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Extrae la URL del archivo cargado desde la respuesta de Strapi
          const logoURL = data[0].url;

          // Actualiza el estado con la URL del logo
          setOpciones((prevOpciones) => ({
            ...prevOpciones,
            logoURL: logoURL,
          }));
        })
        .catch((error) => {
          console.error("Error al cargar el archivo:", error);
        });
    }
  };

  const handleGuardar = () => {
    graphQLClient
      .request(UPDATE_PANTALLA, {
        data: {
          attributes: {
            opciones: opciones,
          },
        },
        id: 1,
      })
      .then((data) => {
        console.log("Datos actualizados con éxito:", data);
        // Mostrar un mensaje de éxito o realizar otras acciones necesarias
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
        // Mostrar un mensaje de error al usuario
      });
  };

  return (
    <>
      <FormControl
        w="80vw"
        p={4}
        bg="whiteAlpha.500"
        m="auto"
        mt={8}
        mb={8}
        borderRadius="lg"
      >
        <Table>
          <Thead>
            <Tr fontSize="1.5em" fontWeight="bold" textAlign="center" m="2">
              <Th textAlign="center">Información</Th>
              <Th textAlign="center">Color header</Th>
              <Th textAlign="center">Color fondo</Th>
              <Th textAlign="center">Color texto</Th>
              <Th textAlign="center">Color Brand 1</Th>
              <Th textAlign="center">Color Brand 2</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              fontSize="1.5em"
              fontWeight="bold"
              textAlign="center"
              alignItems="center"
            >
              <Td>
                <Stack spacing={2}>
                  <InputGroup>
                    <InputLeftElement>
                      <FaTag />
                    </InputLeftElement>
                    <Input
                      name="nombreLocal"
                      placeholder="Nombre"
                      value={opciones.nombreLocal}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaMapMarkerAlt />
                    </InputLeftElement>
                    <Input
                      name="direccion"
                      placeholder="Dirección"
                      value={opciones.direccion}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaWhatsapp />
                    </InputLeftElement>
                    <Input
                      name="redes.whatsapp"
                      placeholder="Whatsapp"
                      value={opciones.redes ? opciones.redes.whatsapp : ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaFacebook />
                    </InputLeftElement>
                    <Input
                      name="redes.facebook"
                      placeholder="Facebook"
                      value={opciones.redes ? opciones.redes.facebook : ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaInstagram />
                    </InputLeftElement>
                    <Input
                      name="redes.instagram"
                      placeholder="Instagram"
                      value={opciones.redes ? opciones.redes.instagram : ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaTiktok />
                    </InputLeftElement>
                    <Input
                      name="redes.tiktok"
                      placeholder="Tiktok"
                      value={opciones.redes ? opciones.redes.tiktok : ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FaGlobe />
                    </InputLeftElement>
                    <Input
                      name="redes.web"
                      placeholder="Web"
                      value={opciones.redes ? opciones.redes.web : ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <Button
                        onClick={() => {
                          // Abre la ventana de selección de archivo cuando se hace clic en el botón
                          document.querySelector('input[type="file"]').click();
                        }}
                        size="sm"
                      >
                        <FaUpload />
                      </Button>
                    </InputLeftElement>
                    <Input
                      name="logoURL"
                      placeholder="Logo URL"
                      value={logoURL} // Usa el estado para mostrar la URL del logo
                      onChange={handleLogoUpload}
                    />
                    <input
                      type="file" // Establece el tipo de entrada como archivo
                      accept="image/*" // Acepta cualquier tipo de imagen
                      style={{ display: "none" }} // Oculta el elemento de entrada para que no se vea
                      onChange={handleLogoUpload} // Maneja el cambio de archivo
                    />
                    {logoURL && (
                      <>
                        <Image
                          maxH={45}
                          src={logoURL} // Muestra la URL del logo como fuente de la imagen
                          alt={opciones.nombreLocal}
                          title={opciones.nombreLocal}
                        />
                      </>
                    )}
                  </InputGroup>
                </Stack>
              </Td>
              <Td>
                <Colorful
                  className={styles.colorful}
                  color={opciones.hexHead} // Acceder a hexHead desde opciones
                  disableAlpha={true}
                  onChange={(color) => {
                    setOpciones((prevOpciones) => ({
                      ...prevOpciones,
                      hexHead: color.hexa, // Actualizar hexHead en opciones
                    }));
                  }}
                />
              </Td>
              <Td>
                <Colorful
                  className={styles.colorful}
                  color={opciones.hexBg}
                  disableAlpha={true}
                  onChange={(color) => {
                    setOpciones((prevOpciones) => ({
                      ...prevOpciones,
                      hexBg: color.hexa,
                    }));
                  }}
                />
              </Td>
              <Td>
                <Colorful
                  className={styles.colorful}
                  color={opciones.hexTexto}
                  disableAlpha={true}
                  onChange={(color) => {
                    setOpciones((prevOpciones) => ({
                      ...prevOpciones,
                      hexTexto: color.hexa,
                    }));
                  }}
                />
              </Td>
              <Td>
                <Colorful
                  className={styles.colorful}
                  color={opciones.hexBrand1}
                  disableAlpha={true}
                  onChange={(color) => {
                    setOpciones((prevOpciones) => ({
                      ...prevOpciones,
                      hexBrand1: color.hexa,
                    }));
                  }}
                />
              </Td>
              <Td>
                <Colorful
                  className={styles.colorful}
                  color={opciones.hexBrand2}
                  disableAlpha={true}
                  onChange={(color) => {
                    setOpciones((prevOpciones) => ({
                      ...prevOpciones,
                      hexBrand2: color.hexa,
                    }));
                  }}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button
          onClick={handleGuardar}
          // isLoading
          width="100%"
          loadingText="Guardando"
          variant="outline"
          colorScheme="teal"
          size="lg"
          spinnerPlacement="end"
        >
          Guardar
        </Button>
      </FormControl>

      <Box
        borderColor={colorMode === "light" ? "black" : "white"}
        width="90%"
        maxHeight="30em"
        overflow="hidden"
        p={4}
        m="auto"
        mt={8}
        mb={8}
      >
        <CustomView1 />
      </Box>
    </>
  );
};

export default ModPreferencias;
