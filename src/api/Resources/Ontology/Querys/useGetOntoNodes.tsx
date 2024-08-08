import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color";

export type GeneralOntoNode = {
  nodeName: string;
  context: string;
};

export type OntoNode = (
  | OrganizationOntoNode
  | PrinterOntoNode
  | MaterialOntoNode
  | AdditionalRequirementOntoNode
  | ColorOntoNode
) &
  GeneralOntoNode;

export type ExistingOntoNode = {
  nodeID: string;
} & OntoNode;

export type OrganizationOntoNode = {
  nodetype: "organization";
  properties: {};
};

export type PrinterOntoNode = {
  nodetype: "printer";
  properties: {
    imgPath: string;
    buildVolume: string;
    technology: string;
  };
};

export type MaterialOntoNode = {
  nodetype: "material";
  properties: {
    imgPath: string;
    foodSafe: string;
    heatResistant: string;
    flexible: string;
    smooth: string;
    eModul: string;
    poissonRatio: string;
  };
};

export type AdditionalRequirementOntoNode = {
  nodetype: "additionalRequirement";
  properties: {
    imgPath: string;
    heatResistant: string;
    smooth: string;
  };
};

export type ColorOntoNode = {
  nodetype: "color";
  properties: {
    imgPath: string;
    foodSafe: string;
    color: string;
  };
};

const useGetOntoNodes = (nodeType: OntoNodeType) => {
  const queryClient = useQueryClient();
  const getOntoNodes = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/nodes/get/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data;
        logger("useGetOntoNodes | getOntoNodes ✅ |", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "onto", "nodes", nodeType],
    queryFn: getOntoNodes,
  });
};

export default useGetOntoNodes;
