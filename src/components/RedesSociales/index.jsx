import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./RedesSociales.module.css";
import { useEffect } from "react";

const RedesSociales = ({socialMedias}) => {

  if(socialMedias==null){
    socialMedias = [
      { value: "Facebook", icon: FaFacebook, link: "/PanaderiaNTQJ" },
      { value: "Instagram", icon: FaInstagram, link: "@PanaderiaNTQJ" },
      { value: "TikTok", icon: FaTiktok, link: "@PanaderiaNTQJ" },
      { value: "Web", icon: FaGlobe, link: "www.PanaderiaNTQJ.com" },
    ];
  }

  

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
      {socialMedias.map((red) => (
        <div key={red.value} className={styles.carouselItem}>
          <Flex borderRadius="md" textAlign="center" justifyContent="center">
            <Flex alignItems="center" fontSize="2xl" verticalAlign="middle">
              <Icon as={red.icon} boxSize={6} mr={3} />
              <Text>{red.link}</Text>
            </Flex>
          </Flex>
        </div>
      ))}
    </Carousel>
  );
};

export default RedesSociales;
