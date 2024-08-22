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
import useUpdateOrgaNode from "@/api/Resources/Organization/Mutations/useUpdateOrgaNode";
import logger from "@/hooks/useLogger";

interface ResourceTableProps {
  nodes: OntoNode[] | undefined;
  nodeType: OntoNodeType;
}

const ResourceTable = (props: ResourceTableProps) => {
  const { nodes = [], nodeType } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organization } = useOrganization();

  const updateOrgaNode = useUpdateOrgaNode();
  const deleteOrgaNode = useDeleteOrgaNode();

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();

  const handleOnClickButtonDeleteNode = (node: OntoNode) => {
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

  const handleOnChangeInputActive = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: OntoNode
  ) => {
    if (item.nodeID === undefined) return;
    logger(
      "ResourceTable | handleOnChangeInputActive |",
      item,
      e.target.checked
    );
    updateOrgaNode.mutate({
      nodeID: item.nodeID,
      active: e.target.checked,
    });
  };

  return (
    <Container width="full" direction="col">
      {nodes.length > 0 ? (
        <>
          <Search handleSearchInputChange={handleSearchInputChange} />
          <Container
            width="full"
            direction="row"
            justify="start"
            className="overflow-auto md:overflow-auto"
          >
            <table className="card-container w-full  table-auto border-separate border-spacing-x-0 p-0">
              <thead>
                <tr>
                  <th className="bg-gray-50">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant="text"
                        title={t(`Resources.components.Table.name`)}
                        onClick={() => handleSort("name")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t(`Resources.components.Table.name`)}
                          {getSortIcon("name")}
                        </div>
                      </Button>
                    </div>
                  </th>
                  <th className="bg-gray-50">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="text"
                        title={t(`Resources.components.Table.active`)}
                        onClick={() => handleSort("active")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t(`Resources.components.Table.active`)}
                          {getSortIcon("active")}
                        </div>
                      </Button>
                    </div>
                  </th>
                  <th className="bg-gray-50">
                    {t("Resources.components.Table.action")}
                  </th>
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
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          {node.name}
                        </td>
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="h-6 w-6"
                            checked={node.active}
                            onChange={(e) => handleOnChangeInputActive(e, node)}
                          />
                        </td>
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <Container width="full" direction="row">
                            <Button
                              variant="text"
                              title={t(
                                "Resources.components.Table.buttons.details"
                              )}
                              to={`details/${node.nodeID}`}
                              className="whitespace-nowrap"
                            />
                            <Button
                              variant="text"
                              title={t(
                                "Resources.components.Table.buttons.edit"
                              )}
                              to={`edit/${node.nodeID}`}
                              className="whitespace-nowrap"
                            />
                            <Button
                              variant="text"
                              title={t(
                                "Resources.components.Table.buttons.variant"
                              )}
                              to={`variant/${node.nodeID}`}
                              className="whitespace-nowrap"
                            />
                            <Button
                              variant="text"
                              title={t(
                                "Resources.components.Table.buttons.delete"
                              )}
                              onClick={() =>
                                handleOnClickButtonDeleteNode(node)
                              }
                              className="whitespace-nowrap"
                            />
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
          </Container>
        </>
      ) : (
        <Text>{t("Resources.components.Table.noItems")}</Text>
      )}
    </Container>
  );
};

export default ResourceTable;
