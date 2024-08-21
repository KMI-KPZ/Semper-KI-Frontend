import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ResourcesNodeFormEdge } from "@/pages/Resources/components/NodeForm";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color";

export const allOntoNodeTypes: OntoNodeType[] = [
  "printer",
  "material",
  "additionalRequirement",
];
export const parseOntoNodesToEdges = (
  nodes: OntoNode[]
): ResourcesNodeFormEdge[] => {
  return nodes.map(
    (node): ResourcesNodeFormEdge => ({
      nodeID: node.nodeID,
      nodeType: node.nodeType,
      nodeName: node.name,
      createdBy: node.createdBy,
    })
  );
};

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

const useGetOntoNodes = (nodeType: OntoNodeType) => {
  const queryClient = useQueryClient();
  const getOntoNodes = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/nodes/get/by-type/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetOntoNodes | getOntoNodes ✅|", response, data);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "onto", "nodes", nodeType],
    queryFn: getOntoNodes,
  });
};

export default useGetOntoNodes;
