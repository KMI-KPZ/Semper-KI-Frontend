import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OntoNodeType =
  | "organization"
  | "printer"
  | "material"
  | "additionalRequirement"
  | "color";

export interface OntoNodeNew {
  nodeName: string;
  context: string;
  nodeType: OntoNodeType;
  properties: OntoNodeProperty[];
}

export interface OntoNode extends OntoNodeNew {
  createdBy: string;
  nodeID: string;
}

export type OntoNodeProperty = OntoNodePropertyText | OntoNodePropertyNumber;
export type OntoNodePropertyType = "text" | "number" | "date" | "boolean";
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
