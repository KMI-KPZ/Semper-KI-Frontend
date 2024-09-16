import { OntoNode } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useOrganization from "./useOrganization";

interface useRessourcesTableItemReturnProps {
  createRersourcesTableItem: (
    ownNodes: OntoNode[] | undefined,
    allNodes: OntoNode[] | undefined
  ) => ResourcesTableItem[];
}

export interface ResourcesTableItem extends OntoNode {
  active: boolean;
}

const useRessourcesTableItem = (): useRessourcesTableItemReturnProps => {
  const { organization } = useOrganization();

  const createRersourcesTableItem = (
    ownNodes: OntoNode[] | undefined,
    allNodes: OntoNode[] | undefined
  ): ResourcesTableItem[] => {
    if (ownNodes === undefined || allNodes === undefined) return [];
    return allNodes
      .filter((node) => node.createdBy === organization.hashedID)
      .map((node) => ({
        ...node,
        active: ownNodes.some((ownNode) => ownNode.nodeID === node.nodeID),
      }));
  };

  return { createRersourcesTableItem };
};

export default useRessourcesTableItem;
