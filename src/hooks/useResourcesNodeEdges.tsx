import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import { ResourcesNodeFormEdge } from "@/pages/Resources/components/NodeForm";
import { OntoNodeType } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";
import logger from "./useLogger";

interface useResourcesNodeEdgesProps {
  nodeID: string;
  types: OntoNodeType[];
}

interface useResourcesNodeEdgesReturnProps {
  isLoading: boolean;
  edges: ResourcesNodeFormEdge[];
}

const useResourcesNodeEdges = (
  props: useResourcesNodeEdgesProps
): useResourcesNodeEdgesReturnProps => {
  const { types, nodeID = "" } = props;

  const allAPICalls = types.map((type) =>
    useGetOrgaNodeNeighbors({ nodeID, nodeType: type })
  );

  const isLoading =
    nodeID === "" ? false : allAPICalls.some((call) => call.isLoading);
  const edges: ResourcesNodeFormEdge[] =
    nodeID === ""
      ? []
      : allAPICalls
          .map((call): ResourcesNodeFormEdge[] =>
            call.data === undefined
              ? []
              : call.data.map(
                  (node): ResourcesNodeFormEdge => ({
                    nodeID: node.nodeID,
                    nodeType: node.nodeType,
                    nodeName: node.name,
                    createdBy: node.createdBy,
                  })
                )
          )
          .flat();

  return { isLoading, edges };
};

export default useResourcesNodeEdges;
