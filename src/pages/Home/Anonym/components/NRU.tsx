import React from "react";
import { Button, Container, Heading, Text } from "@component-library/index";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";

interface NRUProps {}
const NRU: React.FC<NRUProps> = (props) => {
  const {} = props;
  const createProject = useCreateProject();

  const handleOnClick = () => {
    createProject.mutate("TestProject");
  };

  return (
    <Container
      width="full"
      className="relative gap-20 bg-white bg-opacity-70 p-10"
      align="center"
      direction="col"
    >
      <Heading variant="h1">3D-Druck (Additive Fertigung)</Heading>
      <Text className="text-center text-black">
        Unsere interne Fertigung bietet eine breite Palette von über 20
        Materialvarianten im Bereich 3D-Druck. Sie profitieren von einer
        schnellen Lieferzeit ab 2 Werktagen sowie einer Fertigung ab Stückzahl
        eins. Allem voran steht auf Wunsch eine persönliche Beratung zu den
        einzelnen Verfahren, Werkstoffen und Oberflächenfinishs. Zusätzlich
        ermöglicht es unser Fertigungsnetzwerk fast jede Anforderung zu
        erfüllen.
      </Text>
      <Button title="Loslegen" variant="primary" onClick={handleOnClick} />
    </Container>
  );
};
export default NRU;
