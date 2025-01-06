import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import ProcessFilter from "../../Filter/Filter";
import ServiceManufacturingGroupOverview from "./components/GroupOverview";
import ServiceManufacturingDetails from "./components/ManufacturingDetails";

interface ServiceManufacturingViewProps {
  process: ManufactoringProcessProps;
}

// interface MaterialInfo {
//   title: string;
//   props: string;
// }

// function extractMaterialProps(materials: MaterialProps[]): MaterialInfo[] {
//   return materials.map((material) => {
//     return {
//       title: material.title,
//       props: material.propList.reduce((acc, prop) => {
//         acc += prop.name + ": " + prop.value + ";\n";
//         return acc;
//       }, ""),
//     };
//   });
// }

const ServiceManufacturingView: React.FC<ServiceManufacturingViewProps> = (
  props
) => {
  const { process } = props;
  const [activeGroup, setActiveGroup] = React.useState(0);

  // const { topics, userChoice, setTopics, setUserChoice } = useTopics();
  // const saveMaterial = (selectedMaterial: MaterialProps) => {
  //   setMaterial.mutate({
  //     projectID: project.projectID,
  //     processID: process.processID,
  //     materials: [selectedMaterial],
  //   });
  // };
  // useEffect(() => {
  //   if (process || materialsQuery.data) {
  //     let currentToDo = "choose-postprocessing";
  //     let materialProps: MaterialInfo[] = [];
  //     let materialChoices: any = {};
  //     let addToDetailedHelp: Map<string, string> = new Map<string, string>([
  //       [
  //         "manufacturing-details",
  //         "Details für den 3D-Druck-Prozess, hier wird/werden das/die digitale/n 3D-Modell/e, welche(s) gedruckt werden soll(en) hochgeladen unter der Abteilung Modelle." +
  //           "des Weiteren werden die Materialien bei Material ausgewählt und die Druckparameter festgelegt. Ebenso können hier die Nachbearbeitungsschritte festgelegt werden.",
  //       ],
  //       [
  //         "upload-model",
  //         "Hier kann ein digitales 3D Modell hochgeladen werden, welches gedruckt werden soll. Dieses sollte als STL-Datei vorliegen.",
  //       ],
  //       [
  //         "choose-material",
  //         "Hier können die Materialien ausgewählt werden, welche für den Druck verwendet werden sollen. Es können mehrere Materialien ausgewählt werden. Je nach Anwendungsfall können unterschiedliche Materialien verwendet werden. Z.B. falls es sich um lebensmittelechte Teile handelt, sollten lebensmittelechte Materialien verwendet werden.",
  //       ],
  //       [
  //         "choose-postprocessing",
  //         "Hier können Nachbearbeitungsschritte festgelegt werden, die nach dem Druck durchgeführt werden sollen. Welche Nachbearbeitungsschritte sinnvoll sind, hängt vom Anwendungsfall ab. Z.B. können Teile lackiert, geschliffen oder poliert werden.",
  //       ],
  //     ]);

  //     if (
  //       process.serviceDetails.materials === undefined ||
  //       process.serviceDetails.materials?.length === 0
  //     ) {
  //       currentToDo = "choose-material";

  //       if (materialsQuery.data !== undefined && materialsQuery.isFetched) {
  //         materialProps = extractMaterialProps(materialsQuery.data);

  //         // loop over materialProps and add them to detailedHelp with key help_material_[Index]
  //         materialProps.forEach((materialProp, index) => {
  //           addToDetailedHelp.set("material_" + index, materialProp.props);
  //           topics.set(
  //             "material_" + (index + 1),
  //             'Material "' +
  //               materialProp.title +
  //               '" Eigenschaften' +
  //               materialProp.props
  //           );
  //           materialChoices[index + 1] = "material_" + (index + 1);
  //         });
  //       }
  //     }
  //     if (process.serviceDetails.models?.length === 0) {
  //       currentToDo = "upload-model";
  //     }

  //     setTopics(
  //       new Map<string, string>([
  //         [
  //           "manufacturing-details",
  //           "Details für den 3D-Druck-Prozess festlegen und einsehen",
  //         ],
  //         [
  //           "upload-model",
  //           "ein digitales 3D Modell hochladen um drucken zu lassen",
  //         ],
  //         ["choose-material", "Materialien für den Druck auswählen"],
  //         ["choose-postprocessing", "Nachbearbeitungsschritte festlegen"],
  //       ]),
  //       currentToDo,
  //       "",
  //       materialChoices,
  //       addToDetailedHelp
  //     );

  //     if (userChoice) {
  //       alert("User choice: " + userChoice);
  //       const material: MaterialProps | undefined =
  //         materialsQuery.data !== undefined &&
  //         materialsQuery.data[parseInt(userChoice) - 1] !== undefined
  //           ? materialsQuery.data[parseInt(userChoice) - 1]
  //           : undefined;
  //       if (material !== undefined) saveMaterial(material);
  //       setUserChoice(null);
  //     }
  //   }
  // }, [process, materialsQuery.data, userChoice]);

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className=" p-0"
    >
      <ServiceManufacturingGroupOverview
        process={process}
        activeGroup={activeGroup}
        changeActiveGroup={setActiveGroup}
      />
      <ProcessFilter />
      <ServiceManufacturingDetails
        process={process}
        service={process.serviceDetails.groups[activeGroup]}
      />
    </Container>
  );
};

export default ServiceManufacturingView;
