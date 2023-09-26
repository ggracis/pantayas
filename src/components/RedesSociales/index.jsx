import React from "react";
import { Box, Text, Icon, Flex, Link } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGlobe,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./RedesSociales.module.css";

const socialMediaIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  web: FaGlobe,
  twitter: FaTwitter,
  whatsapp: FaWhatsapp,
};

const RedesSociales = () => {
  const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));
  const redesSocialesEnLocalStorage = storedOpciones
    ? storedOpciones.redes
    : {};
  const redesSociales = Object.entries(redesSocialesEnLocalStorage).filter(
    ([key, value]) => value // Filtra las redes sociales con valores no vacíos
  );

  return (
    <Carousel
      autoPlay
      interval={10 * 1000}
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      className={styles.carousel}
    >
      {redesSociales.map(([nombre, valor]) => (
        <div key={nombre} className={styles.carouselItem}>
          <Flex borderRadius="md" textAlign="center" justifyContent="center">
            <Flex alignItems="center" fontSize="2xl" verticalAlign="middle">
              <Icon as={socialMediaIcons[nombre]} boxSize={6} mr={3} />
              <Link href={valor} target="_blank">
                <Text>{valor}</Text>
              </Link>
            </Flex>
          </Flex>
        </div>
      ))}
    </Carousel>
  );
};

export default RedesSociales;
