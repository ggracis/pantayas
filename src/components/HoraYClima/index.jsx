import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
  FaClock,
} from "react-icons/fa";

const HoraYClima = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [climaData, setClimaData] = useState({});
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=6d5578c057b44fd3bf8232853232208&q=${location.lat},${location.lon}&aqi=no`
        );
        const data = await response.json();
        console.log("API response:", data);
        setClimaData(data.current);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.error("Error obtaining user location:", error);
            // Si no se puede obtener la ubicación del usuario, usar la ubicación de Buenos Aires
            setLocation({ lat: -34.72, lon: -58.41 });
            fetchWeatherData(); // Llamar a fetchWeatherData aquí para usar la ubicación predeterminada
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    fetchUserLocation();
    fetchWeatherData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderIconoClima = () => {
    if (climaData.condition) {
      switch (climaData.condition.text) {
        case "Sunny":
          return <Icon as={FaSun} boxSize={8} />;
        case "Partly cloudy":
          return <Icon as={FaCloudSun} boxSize={8} />;
        case "Rain":
          return <Icon as={FaCloudRain} boxSize={8} />;
        case "Snow":
          return <Icon as={FaSnowflake} boxSize={8} />;
        default:
          return null;
      }
    }
    return null;
  };
  return (
    <Flex align="center" justifyContent="center" flexWrap="wrap">
      <Box p={2} borderRadius="md" mb={2}>
        <Text fontSize="1.5em">
          <Icon as={FaClock} mr={2} />
          {horaActual.toLocaleTimeString('it-IT').slice(0,horaActual.toLocaleTimeString('it-IT').length-3)}
        </Text>
      </Box>
      <Box p={2} borderRadius="md" mb={2}>
        <Text fontSize="1.5em">{climaData.temp_c}°C</Text>
      </Box>
      <Box p={2} borderRadius="md" mb={2}>
        {renderIconoClima()}
      </Box>
    </Flex>
  );
};

export default HoraYClima;
