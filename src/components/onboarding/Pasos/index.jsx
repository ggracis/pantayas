import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

// Importa tus componentes de React para cada paso
import ModPreferencias from "../../Users/ModPreferencias";
import TvsLocal from "../TvsLocal";
import CrearCustomView from "../CrearCustomView";

const steps = [
  {
    // Preferencias generales del usuario
    title: "Preferencias",
    description: "Datos del local",
    component: <ModPreferencias />,
  },
  {
    // Crea pantallas personalizadas y le asigna productos
    title: "Pantallas",
    description: "Diseñar pantallas",
    component: <CrearCustomView />,
  },
  {
    // Carga TVs del local y le asigna pantallas por horario
    title: "TVs",
    description: "Cargar televisores",
    component: <TvsLocal />,
  },
];

function PasosOnboard() {
  const [activeStep, setActiveStep] = useState(0);

  // Agrega un estado local para rastrear el componente actual a mostrar
  const [currentComponent, setCurrentComponent] = useState(steps[0].component);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setCurrentComponent(steps[activeStep + 1].component);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setCurrentComponent(steps[activeStep - 1].component);
  };

  return (
    <div>
      {/* Muestra los pasos */}
      <Stepper index={activeStep}>
        {steps.map((stepInfo, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{stepInfo.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box>{currentComponent}</Box>
      <Stack direction="row">
        {activeStep > 0 && (
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="gray"
            border="2px"
            size="lg"
            width="50%"
            borderColor="green.500"
            onClick={handlePrev}
          >
            Anterior
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="gray"
            border="2px"
            size="lg"
            width="50%"
            borderColor="green.500"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default PasosOnboard;
