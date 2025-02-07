import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color"
  | "materialCategory"
  | "technology"
  | "materialType";

export const isOntoNodeType = (type: string): type is OntoNodeType => {
  return [
    "organization",
    "printer",
    "material",
    "additionalRequirement",
    "color",
    "materialCategory",
    "technology",
    "materialType",
  ].includes(type as OntoNodeType);
};

export const clientNodeTypes: OntoNodeType[] = [
  "printer",
  "material",
  "additionalRequirement",
];
export const adminNodeTypes: OntoNodeType[] = [
  "printer",
  "organization",
  "material",
  "additionalRequirement",
  "color",
];

export interface OntoNodeNew {
  name: string;
  context: string;
  nodeType: OntoNodeType;
  properties: OntoNodeProperty[];
}

export interface OntoNode extends OntoNodeNew {
  createdBy: string;
  nodeID: string;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
  active: boolean;
}

export type OntoNodeProperty =
  | OntoNodePropertyText
  | OntoNodePropertyNumber
  | OntoNodePropertyDate
  | OntoNodePropertyBoolean;

export type OntoNodePropertyType = "text" | "number" | "date" | "boolean";
export type OntoNodePropertyName =
  | "imgPath"
  | "nozzleDiameter"
  | "certificates"
  | "lossOfMaterial"
  | "fixedCosts"
  | "machineBatchDistance"
  | "fillRate"
  | "chamberBuildHeight"
  | "chamberBuildWidth"
  | "chamberBuildLength"
  | "buildRate"
  | "averagePowerConsumption"
  | "possibleLayerHeights"
  | "machineUsageCosts"
  | "machineSurfaceArea"
  | "simpleMachineSetUp"
  | "complexMachineSetUp"
  | "machineHourlyRate"
  | "costRatePersonalMachine"
  | "coatingTime"
  | "maxPrintingSpeed"
  | "foodSafe"
  | "heatResistant"
  | "flexible"
  | "smooth"
  | "eModul"
  | "poissonRatio"
  | "density"
  | "printingSpeed"
  | "acquisitionCosts"
  | "treatmentCosts"
  | "flexibility";

export interface OntoNodePropertyGeneral {
  name: string;
  value: any;
  unit: string;
  type: OntoNodePropertyType;
  key: string;
}
export interface OntoNodePropertyText extends OntoNodePropertyGeneral {
  type: "text";
  value: string;
}
export interface OntoNodePropertyNumber extends OntoNodePropertyGeneral {
  type: "number";
  value: number;
}
export interface OntoNodePropertyDate extends OntoNodePropertyGeneral {
  type: "date";
  value: Date;
}
export interface OntoNodePropertyBoolean extends OntoNodePropertyGeneral {
  type: "boolean";
  value: boolean;
}

export const parseOntoNode = (node: any): OntoNode => {
  return {
    ...node,
    name: node.nodeName,
    createdWhen: new Date(node.createdWhen),
    updatedWhen: new Date(node.updatedWhen),
    accessedWhen: new Date(node.accessedWhen),
    active: node.active,
  };
};

export const isOntoNodePropertyName = (
  name: string
): name is OntoNodePropertyName => {
  return [
    "buildVolume",
    "technology",
    "imgPath",
    "nozzleDiameter",
    "certificates",
    "lossOfMaterial",
    "fixedCosts",
    "machineBatchDistance",
    "fillRate",
    "chamberBuildHeight",
    "chamberBuildWidth",
    "chamberBuildLength",
    "buildRate",
    "averagePowerConsumption",
    "possibleLayerHeights",
    "machineUsageCosts",
    "machineSurfaceArea",
    "simpleMachineSetUp",
    "complexMachineSetUp",
    "machineHourlyRate",
    "costRatePersonalMachine",
    "coatingTime",
    "maxPrintingSpeed",
    "foodSafe",
    "heatResistant",
    "flexible",
    "smooth",
    "eModul",
    "poissonRatio",
    "density",
    "printingSpeed",
    "acquisitionCosts",
    "treatmentCosts",
    "flexibility",
  ].includes(name as OntoNodePropertyName);
};

const useGetOrgaNodesByType = (nodeType?: OntoNodeType) => {
  const { user } = useUser();
  const getOrgaNodesByType = async () =>
    authorizedCustomAxios
      .get(
        user.usertype === UserType.ADMIN
          ? `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/by-type/get/${nodeType}/`
          : `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/by-type/get/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetOrgaNodes | getOrgaNodes ✅|", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "orga", "nodes", nodeType],
    queryFn: getOrgaNodesByType,
    enabled: nodeType !== undefined,
  });
};

export default useGetOrgaNodesByType;
