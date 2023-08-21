import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HoraYClima from "../HoraYClima";
import LogoEmpresa from "../LogoEmpresa";
import RedesSociales from "../RedesSociales";

const ScHeader = () => {
  return (
    <Box bg="#000" color="#fff" p={2}>
      <Flex justify="space-between" align="center" maxHeight={"8vh"}>
        {/* Columna Izquierda */}
        <Box flex="1" maxWidth={"30vw"}>
          <RedesSociales />
        </Box>

        {/* Columna del Medio */}
        <Box flex="1" textAlign="center" maxWidth={"30vw"}>
          <LogoEmpresa />
        </Box>

        {/* Columna Derecha */}
        <Box flex="1" maxWidth={"30vw"}>
          <HoraYClima />
        </Box>
      </Flex>
    </Box>
  );
};

export default ScHeader;
