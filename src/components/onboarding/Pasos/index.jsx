import React from "react";
import { TabList, Tab, TabPanel, TabPanels, Tabs, Box } from "@chakra-ui/react";
import ModPreferencias from "../../Users/ModPreferencias";
import TvsLocal from "../TvsLocal";
import CrearCustomView from "../CrearCustomView";

const pasos = [
  {
    title: "Preferencias",
    content: <ModPreferencias />,
  },
  {
    title: "Diseños",
    content: <CrearCustomView />,
  },
  {
    title: "TVs",
    content: <TvsLocal />,
  },
];

function PasosOnboard() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box>
      <Tabs index={activeStep} isLazy>
        <TabList>
          {pasos.map((step, index) => (
            <Tab
              key={index}
              onClick={() => setActiveStep(index)} // Cambiar el paso al hacer clic en la pestaña
            >
              {step.title}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {pasos.map((step, index) => (
            <TabPanel key={index}>{step.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default PasosOnboard;
