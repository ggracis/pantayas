import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import HoraYClima from "../HoraYClima";
import LogoEmpresa from "../LogoEmpresa";
import RedesSociales from "../RedesSociales";

const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));
const hexTexto = storedOpciones.hexTexto;
const hexHead = storedOpciones.hexHead;
/* 
fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
const hexBg = storedOpciones.hexBg;
hexBrand1: "#b369cfff"
hexBrand2: "#6172e2ff"
hexHead: "#807435ff"
hexTexto: "#5da763ff"
 */
const ScHeader = () => {
  const numColumns = useBreakpointValue({ base: 1, md: 3 });

  return (
    <Box bg={hexHead} color={hexTexto}>
      <Grid
        templateColumns={`repeat(${numColumns}, 1fr)`}
        gap={numColumns === 1 ? 2 : 4}
        alignItems="center"
        justifyContent="center"
      >
        {/* Columna Izquierda */}
        <GridItem>
          <RedesSociales />
        </GridItem>

        {/* Columna del Medio */}
        <GridItem>
          <LogoEmpresa />
        </GridItem>

        {/* Columna Derecha */}
        <GridItem>
          <HoraYClima />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ScHeader;
