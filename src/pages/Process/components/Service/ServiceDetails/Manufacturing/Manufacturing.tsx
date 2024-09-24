import {
  ManufactoringProcessProps,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import { Button, Container, Heading, Text } from "@component-library/index";
import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useGetMaterials, { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import ProcessServiceModelCard from "./components/ModellCard";
import ProcessServiceMaterialCard from "./components/MaterialCard";
import ProcessSericePostProcessingCard from "./components/PostProcessingCard";
import ProcessStatusGate from "../../../StatusGate";
import {useTopics}  from "@/contexts/ChatbotContextProvider";
import useSetMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useSetMaterial";
import {useProject} from "@/hooks/Project/useProject";


interface ServiceManufacturingDetailsProps {
  process: ManufactoringProcessProps;
}

interface MaterialInfo {
    title: string;
    props: string;

}

function extractMaterialProps(materials: MaterialProps[]): MaterialInfo[] {
    return materials.map((material) => {
      return {title: material.title , props : material.propList.reduce((acc, prop) => {
        acc += prop.name + ": " + prop.value + ";\n";
        return acc;
      }, "")};
    });
}

const ServiceManufacturingDetails: React.FC<
  ServiceManufacturingDetailsProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const models: ModelProps[] =
    process.serviceDetails.models !== undefined
      ? process.serviceDetails.models
      : [];
  const postProcessings: PostProcessingProps[] =
    process.serviceDetails.postProcessings !== undefined
      ? process.serviceDetails.postProcessings
      : [];
  const materials: MaterialProps[] = process.serviceDetails.materials
    ? process.serviceDetails.materials
    : [];
  const setMaterial = useSetMaterial();
  const { project } = useProject();

  const materialsQuery = useGetMaterials()
  const {topics, maintopic, response: string, choices, userChoice, setTopics, setUserChoice, closeChatbot} = useTopics();

  const saveMaterial = (selectedMaterial : MaterialProps) => {
    setMaterial.mutate(
        {
          projectID: project.projectID,
          processID: process.processID,
          materials: [selectedMaterial],
        },
    );
  };


  useEffect(() => {
    if(process || materialsQuery.data){
      let currentToDo = "choose-postprocessing";
      let materialProps: MaterialInfo[] = [];
      let materialChoices: any = {};
      let addToDetailedHelp: Map<string,string> =  new Map<string, string>([["manufacturing-details", "Details für den 3D-Druck-Prozess, hier wird/werden das/die digitale/n 3D-Modell/e, welche(s) gedruckt werden soll(en) hochgeladen unter der Abteilung Modelle." +
      "des Weiteren werden die Materialien bei Material ausgewählt und die Druckparameter festgelegt. Ebenso können hier die Nachbearbeitungsschritte festgelegt werden."],
        ["upload-model", "Hier kann ein digitales 3D Modell hochgeladen werden, welches gedruckt werden soll. Dieses sollte als STL-Datei vorliegen."],
        ["choose-material", "Hier können die Materialien ausgewählt werden, welche für den Druck verwendet werden sollen. Es können mehrere Materialien ausgewählt werden. Je nach Anwendungsfall können unterschiedliche Materialien verwendet werden. Z.B. falls es sich um lebensmittelechte Teile handelt, sollten lebensmittelechte Materialien verwendet werden."],
        ["choose-postprocessing", "Hier können Nachbearbeitungsschritte festgelegt werden, die nach dem Druck durchgeführt werden sollen. Welche Nachbearbeitungsschritte sinnvoll sind, hängt vom Anwendungsfall ab. Z.B. können Teile lackiert, geschliffen oder poliert werden."]
      ]);

      if (process.serviceDetails.materials === undefined || process.serviceDetails.materials?.length === 0) {
        currentToDo = "choose-material";

        if(materialsQuery.data !== undefined && materialsQuery.isFetched){
            console.log ("materialsQuery.data: ", materialsQuery.data);
            materialProps = extractMaterialProps(materialsQuery.data);

            // loop over materialProps and add them to detailedHelp with key help_material_[Index]
            materialProps.forEach((materialProp, index) => {
              addToDetailedHelp.set("material_" + index, materialProp.props);
              topics.set("material_" + (index +1 ), "Material \""+ materialProp.title + "\" Eigenschaften" +  materialProp.props);
              materialChoices[index + 1] = "material_" + (index + 1);
            });
        }
      }
      if (process.serviceDetails.models?.length === 0) {
        currentToDo = "upload-model";
      }

      console.log("currentToDo: ", currentToDo);
      setTopics(new Map<string, string>([["manufacturing-details", "Details für den 3D-Druck-Prozess festlegen und einsehen"],
            ["upload-model","ein digitales 3D Modell hochladen um drucken zu lassen"],
            ["choose-material","Materialien für den Druck auswählen"],
            ["choose-postprocessing", "Nachbearbeitungsschritte festlegen"]]),
          currentToDo, "",materialChoices,addToDetailedHelp
         );

      if(userChoice){
        alert("User choice: " + userChoice);
        const material = materialsQuery.data && materialsQuery.data[(parseInt(userChoice) - 1)] ? materialsQuery.data[(parseInt(userChoice) - 1)] : [];
        saveMaterial(material);
        setUserChoice(null);
      }
    }
  }, [process, materialsQuery.data, userChoice]);



  const handleOnButtonClickMaterial = () => {
    navigate("service/manufacturing/material");
  };
  const handleOnButtonClickPostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };
  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
  };

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className="p-2 md:p-5"
    >
      <Container justify="between" width="full" gap={5}>
        <Container direction="row" width="full" justify="start" wrap="wrap">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.heading"
            )}
          </Heading>
          <Text>
            {models.length > 0
              ? models.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.model.noModels"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {models.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickModel}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {models.length > 0
          ? models.map((model, index) => (
              <ProcessServiceModelCard model={model} key={index} />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {models.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickModel}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>

      <Container justify="between" width="full">
        <Container direction="row" width="full" justify="start" wrap="wrap">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.material.heading"
            )}
          </Heading>
          <Text>
            {materials.length > 0
              ? materials.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.noMaterial"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {materials.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickMaterial}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {materials.length > 0
          ? materials.map((material, index) => (
              <ProcessServiceMaterialCard material={material} key={index} />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {materials.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickMaterial}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>

      <Container justify="between" width="full">
        <Container direction="row" width="full" justify="start" wrap="wrap">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.heading"
            )}
          </Heading>
          <Text>
            {postProcessings.length > 0
              ? postProcessings.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.postProcessing.noPostProcessings"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {postProcessings.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickPostProcessing}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {postProcessings.length > 0
          ? postProcessings.map((postProcessing, index) => (
              <ProcessSericePostProcessingCard
                postProcessing={postProcessing}
                key={index}
              />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {postProcessings.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickPostProcessing}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
    </Container>
  );
};

export default ServiceManufacturingDetails;
