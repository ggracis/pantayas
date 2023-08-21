import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";

const RedesSociales = () => {
  const redes = [
    { nombre: "Facebook", icono: FaFacebook, enlace: "/PanaderiaNTQJ" },
    { nombre: "Instagram", icono: FaInstagram, enlace: "@PanaderiaNTQJ" },
    { nombre: "TikTok", icono: FaTiktok, enlace: "@PanaderiaNTQJ" },
    { nombre: "Web", icono: FaGlobe, enlace: "www.PanaderiaNTQJ.com" },
  ];

  return (
    <Carousel
      autoPlay
      interval={10 * 1000} // 10 segundos en milisegundos
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
    >
      {redes.map((red) => (
        <div key={red.nombre}>
          <Flex
            p={2}
            borderRadius="md"
            textAlign="center"
            justifyContent="center"
          >
            <Flex alignItems="center" fontSize="2xl" verticalAlign="middle">
              <Icon as={red.icono} boxSize={6} mr={1} />
              <Text>{red.enlace}</Text>
            </Flex>
          </Flex>
        </div>
      ))}
    </Carousel>
  );
};

export default RedesSociales;
