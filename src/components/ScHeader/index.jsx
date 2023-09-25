import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import HoraYClima from "../HoraYClima";
import LogoEmpresa from "../LogoEmpresa";
import RedesSociales from "../RedesSociales";

const ScHeader = ({ ScBg, color, socialMedias, title, image }) => {
  const numColumns = useBreakpointValue({ base: 1, md: 3 });

  return (
    <Box bg={ScBg} color={color}>
      <Grid
        templateColumns={`repeat(${numColumns}, 1fr)`}
        gap={numColumns === 1 ? 2 : 4}
        alignItems="center"
        justifyContent="center"
      >
        {/* Columna Izquierda */}
        <GridItem>
          <RedesSociales socialMedias={socialMedias} />
        </GridItem>

        {/* Columna del Medio */}
        <GridItem>
          <LogoEmpresa title={title} image={image} />
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
