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
import DatosLocal from "../DatosLocal";

const steps = [
  { title: "Local", description: "Datos del local", component: <DatosLocal /> },
  {
    title: "TVs",
    description: "Cargar televisores",
    component: <DatosLocal />,
  },
  {
    title: "Horarios",
    description: "Rangos horarios de pantallas",
    component: <DatosLocal />,
  },
  {
    title: "Pantallas",
    description: "Diseñar pantallas",
    component: <DatosLocal />,
  },
  {
    title: "Productos",
    description: "Elegir productos/categorías",
    component: <DatosLocal />,
  },
  {
    title: "Asignar TVs",
    description: "Asignar pantallas a TVs",
    component: <DatosLocal />,
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

      <Box p={4} m={4}>
        {currentComponent}
      </Box>
      <Stack p={4} m={4} direction="row" spacing={4}>
        {activeStep > 0 && (
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={handlePrev}
          >
            Anterior
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
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
