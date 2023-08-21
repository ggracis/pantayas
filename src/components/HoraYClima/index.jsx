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
    <Flex align="center">
      <Box p={4} borderRadius="md">
        <Text fontSize="2xl">
          <Icon as={FaClock} mr={2} />
          {horaActual.toLocaleTimeString()}
        </Text>
      </Box>
      <Box p={4} borderRadius="md" ml={2}>
        {renderIconoClima()}
      </Box>
      <Box p={4} borderRadius="md" ml={2}>
        <Text fontSize="2xl">
          <Icon as={FaThermometerHalf} mr={1} /> 25°C{" "}
          {/* Cambiar esto con la temperatura real */}
        </Text>
      </Box>
    </Flex>
  );
};

export default HoraYClima;
