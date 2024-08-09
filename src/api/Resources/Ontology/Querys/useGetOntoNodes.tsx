import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color";

export type OntoNodeGeneral = {
  nodeName: string;
  context: string;
  nodeID?: string;
};

export type OntoNode =
  | OntoNodeOrganization
  | OntoNodePrinter
  | OntoNodeMaterial
  | OntoNodeAdditionalRequirement
  | OntoNodeColor;

export type OntoNodeOrganization = {
  nodetype: "organization";
  properties: {};
} & OntoNodeGeneral;

export type OntoNodePrinter = {
  nodetype: "printer";
  properties: {
    imgPath: string;
    buildVolume: string;
    technology: string;
  };
} & OntoNodeGeneral;

export type OntoNodeMaterial = {
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
} & OntoNodeGeneral;

export type OntoNodeAdditionalRequirement = {
  nodetype: "additionalRequirement";
  properties: {
    imgPath: string;
    heatResistant: string;
    smooth: string;
  };
} & OntoNodeGeneral;

export type OntoNodeColor = {
  nodetype: "color";
  properties: {
    imgPath: string;
    foodSafe: string;
    color: string;
  };
} & OntoNodeGeneral;

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
