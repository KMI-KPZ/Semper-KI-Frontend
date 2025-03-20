import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
// import ProcessFilter from "../../Filter/Filter";
// import ProcessStatusGate from "../../../../../../components/Process/StatusGate";
import ServiceManufacturingGroupOverview from "./components/GroupOverview";
import ServiceManufacturingDetails from "./components/ManufacturingDetails";
import ServiceManufacturingFreeText from "./components/FreeText";
import useLoadGroupID from "@/hooks/useLoadGroupID";

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
  useLoadGroupID({ setActiveGroup });

  return (
    <Container direction="col" justify="center" items="start" width="full">
      <ServiceManufacturingGroupOverview
        process={process}
        activeGroup={activeGroup}
        changeActiveGroup={setActiveGroup}
      />
      {process.serviceDetails.groups.length > 0 ? (
        <ServiceManufacturingDetails
          process={process}
          service={process.serviceDetails.groups[activeGroup]}
          activeGroup={activeGroup}
        />
      ) : null}
      <ServiceManufacturingFreeText
        activeGroup={activeGroup}
        process={process}
      />
    </Container>
  );
};

export default ServiceManufacturingView;
