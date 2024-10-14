import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color";

export const isOntoNodeType = (type: string): type is OntoNodeType => {
  return [
    "organization",
    "printer",
    "material",
    "additionalRequirement",
    "color",
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
  | "foodSafe"
  | "heatResistant"
  | "flexible"
  | "smooth"
  | "eModul"
  | "poissonRatio"
  | "color"
  | "buildVolume"
  | "technology"
  | "nozzleDiameter";
export interface OntoNodePropertyGeneral {
  name: string;
  value: any;
  type: OntoNodePropertyType;
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
    active: node.active === "True" ? true : false,
  };
};

export const isOntoNodePropertyName = (
  name: string
): name is OntoNodePropertyName => {
  return [
    "imgPath",
    "foodSafe",
    "heatResistant",
    "flexible",
    "smooth",
    "eModul",
    "poissonRatio",
    "color",
    "buildVolume",
    "technology",
    "nozzleDiameter",
  ].includes(name as OntoNodePropertyName);
};

const useGetOrgaNodes = (nodeType: OntoNodeType) => {
  const { user } = useUser();
  const getOrgaNodes = async () =>
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
    queryFn: getOrgaNodes,
  });
};

export default useGetOrgaNodes;
