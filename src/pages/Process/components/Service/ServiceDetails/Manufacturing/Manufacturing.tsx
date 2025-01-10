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
      {process.serviceDetails.groups.length > 0 ? (
        <ServiceManufacturingDetails
          process={process}
          service={process.serviceDetails.groups[activeGroup]}
          activeGroup={activeGroup}
        />
      ) : null}
    </Container>
  );
};

export default ServiceManufacturingView;
