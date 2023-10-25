import React from "react";
import PasosOnboard from "./Pasos";
import { Container } from "@chakra-ui/react";

function OnBoarding() {
  return (
    <Container maxW="80vw" p={2} mt={4} mb={4}>
      <PasosOnboard />
    </Container>
  );
}

export default OnBoarding;
