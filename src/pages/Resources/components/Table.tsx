import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Search, Text } from "@component-library/index";
import {
  OntoNode,
  OntoNodeType,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import useCreateOrgaEdge from "@/api/Resources/Organization/Mutations/useCreateOrgaEdge";
import useDeleteOrgaEdge from "@/api/Resources/Organization/Mutations/useDeleteOrgaEdge";
import { useNavigate } from "react-router-dom";
import useOrganization from "@/hooks/useOrganization";
import useDeleteOrgaNode from "@/api/Resources/Organization/Mutations/useDeleteOrgaNode";

interface ResourceTableProps<T extends OntoNode> {
  nodes: T[] | undefined;
  nodeType: OntoNodeType;
  actionType?: "own" | "all";
}

const ResourceTable = <T extends OntoNode>(props: ResourceTableProps<T>) => {
  const { nodes = [], nodeType, actionType = "own" } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organization } = useOrganization();

  const createOrgaEdge = useCreateOrgaEdge();
  const deleteOrgaEdge = useDeleteOrgaEdge();
  const deleteOrgaNode = useDeleteOrgaNode();

  const { filterDataBySearchInput, handleSearchInputChange } = useSearch<T>();
  const { getSortIcon, handleSort, sortItems } = useSort<T>();

  const handleOnClickButtonAdd = (node: T) => {
    if (node.nodeID === undefined) return;
    createOrgaEdge.mutate({
      entityIDs: [node.nodeID],
    });
  };

  const handleOnClickButtonDeleteEdge = (node: T) => {
    if (node.nodeID === undefined) return;
    if (
      window.confirm(
        t("Resources.components.Table.confirmDelete", {
          name: node.name,
        })
      )
    ) {
      deleteOrgaEdge.mutate({
        entityID: node.nodeID,
      });
    }
  };
  const handleOnClickButtonDeleteNode = (node: T) => {
    if (node.nodeID === undefined) return;
    if (
      window.confirm(
        t("Resources.components.Table.confirmDelete", {
          name: node.name,
        })
      )
    ) {
      deleteOrgaNode.mutate({
        nodeID: node.nodeID,
      });
    }
  };

  return (
    <Container width="full" direction="col">
      {nodes.length > 0 ? (
        <>
          <Search handleSearchInputChange={handleSearchInputChange} />
          <table className="w-full table-auto border-separate border-spacing-x-5 border-spacing-y-3">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="text"
                      title={t(`Resources.components.Table.name`)}
                      onClick={() => handleSort("name")}
                    >
                      <div className="ml-6 flex flex-row items-center justify-center">
                        {t(`Resources.components.Table.name`)}
                        {getSortIcon("name")}
                      </div>
                    </Button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="text"
                      title={t(`Resources.components.Table.createdBy`)}
                      onClick={() => handleSort("createdBy")}
                    >
                      <div className="ml-6 flex flex-row items-center justify-center">
                        {t(`Resources.components.Table.createdBy`)}
                        {getSortIcon("createdBy")}
                      </div>
                    </Button>
                  </div>
                </th>
                <th>{t("Resources.components.Table.action")}</th>
              </tr>
            </thead>
            <tbody>
              {nodes.filter((node) => filterDataBySearchInput(node)).length >
              0 ? (
                nodes
                  .filter((node) => filterDataBySearchInput(node))
                  .sort(sortItems)
                  .map((node, index) => (
                    <tr key={index}>
                      <td className="text-center">{node.name}</td>
                      <td className="text-center">
                        {node.createdBy === organization.hashedID
                          ? organization.name
                          : "Sermper-KI"}
                      </td>
                      <td>
                        <Container width="full" direction="row">
                          {actionType === "all" ? (
                            <>
                              <Button
                                variant="text"
                                title={t(
                                  "Resources.components.Table.buttons.add"
                                )}
                                onClick={() => handleOnClickButtonAdd(node)}
                              />
                              <Button
                                variant="text"
                                title={t(
                                  "Resources.components.Table.buttons.variant"
                                )}
                                to={`variant/${node.nodeID}`}
                              />

                              {node.createdBy === organization.hashedID ? (
                                <Button
                                  variant="text"
                                  title={t(
                                    "Resources.components.Table.buttons.delete"
                                  )}
                                  onClick={() =>
                                    handleOnClickButtonDeleteNode(node)
                                  }
                                />
                              ) : null}
                            </>
                          ) : (
                            <>
                              {node.createdBy === organization.hashedID ? (
                                <Button
                                  variant="text"
                                  title={t(
                                    "Resources.components.Table.buttons.edit"
                                  )}
                                  to={`edit/${node.nodeID}`}
                                />
                              ) : null}
                              <Button
                                variant="text"
                                title={t(
                                  "Resources.components.Table.buttons.variant"
                                )}
                                to={`variant/${node.nodeID}`}
                              />
                              <Button
                                variant="text"
                                title={t(
                                  "Resources.components.Table.buttons.delete"
                                )}
                                onClick={() =>
                                  handleOnClickButtonDeleteEdge(node)
                                }
                              />
                            </>
                          )}
                        </Container>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    <Text>{t("Resources.components.Table.noItems")}</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <Text>{t("Resources.components.Table.noItems")}</Text>
      )}
    </Container>
  );
};

export default ResourceTable;
