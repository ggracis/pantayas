import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGlobe,
  FaWhatsapp,
} from "react-icons/fa";

export const availableSocialMedias = [
  { value: "Facebook", icon: FaFacebook, link: "/PanaderiaNTQJ", key: 0 },
  { value: "Instagram", icon: FaInstagram, link: "@PanaderiaNTQJ", key: 1 },
  { value: "TikTok", icon: FaTiktok, link: "@PanaderiaNTQJ", key: 2 },
  { value: "Web", icon: FaGlobe, link: "www.PanaderiaNTQJ.com", key: 3 },
  { value: "WhatsApp", icon: FaWhatsapp, link: "+54 11 3293-0807", key: 4 },
];
export const productos = [
  {
    tituloProducto: "Pasta frola batata",
    categoria: "Pasteleria",
    subcategoria: "Tarta",
    unidadMedida: "Unidad",
    titulosVariantes: ["Chico", "Mediano", "Grande"],
    preciosVariantes: ["123", "", "1233"],
    activo: true,
    createdAt: "2023-09-03T23:04:43.496Z",
    updatedAt: "2023-09-14T20:35:04.523Z",
    objectId: "bG8NPoA4Cq",
  },
  {
    tituloProducto: "Lunitas",
    categoria: "Galletitas",
    subcategoria: "Hojaldre",
    unidadMedida: "Kg.",
    titulosVariantes: ["1/4", "1/2", "1Kg."],
    preciosVariantes: ["123", "", "1233"],
    activo: true,
    createdAt: "2023-09-03T23:04:43.497Z",
    updatedAt: "2023-09-03T23:04:43.497Z",
    objectId: "m6BEg1sdvo",
  },
];
