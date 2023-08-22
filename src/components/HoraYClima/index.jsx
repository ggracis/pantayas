import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
  FaThermometerHalf,
  FaClock,
} from "react-icons/fa";

const HoraYClima = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [clima, setClima] = useState("soleado"); // Cambiar esto según la información real del clima

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderIconoClima = () => {
    switch (clima) {
      case "soleado":
        return <Icon as={FaSun} boxSize={8} />;
      case "parcialmente_nublado":
        return <Icon as={FaCloudSun} boxSize={8} />;
      case "lluvia":
        return <Icon as={FaCloudRain} boxSize={8} />;
      case "nieve":
        return <Icon as={FaSnowflake} boxSize={8} />;
      default:
        return null;
    }
  };
  return (
    <Flex align="center" justifyContent="center" flexWrap="wrap">
      <Box p={2} borderRadius="md" mb={2}>
        <Text fontSize="1.5em">
          <Icon as={FaClock} mr={2} />
          {horaActual.toLocaleTimeString()}
        </Text>
      </Box>
      <Box p={2} borderRadius="md" mb={2}>
        {renderIconoClima()}
      </Box>
      <Box p={2} borderRadius="md" mb={2}>
        <Text fontSize="1.5em">
          25°C
          <Icon as={FaThermometerHalf} ml={1} />
          {/* Cambiar esto con la temperatura real */}
        </Text>
      </Box>
    </Flex>
  );
};

export default HoraYClima;
