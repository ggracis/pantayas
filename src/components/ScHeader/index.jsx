import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import HoraYClima from "../HoraYClima";
import LogoEmpresa from "../LogoEmpresa";
import RedesSociales from "../RedesSociales";

const ScHeader = ({bg, color}) => {
  const numColumns = useBreakpointValue({ base: 1, md: 3 });

  return (
    <Box bg={bg} color={color}>
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
