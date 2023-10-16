import React from "react";
import PasosOnboard from "./Pasos";
import { Container } from "@chakra-ui/react";

function OnBoarding() {
  return (
    <Container maxW="75vw" p={2} mt={4} mb={4} color="white">
      <PasosOnboard />
    </Container>
  );
}

export default OnBoarding;
