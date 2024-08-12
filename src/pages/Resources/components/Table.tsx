import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Search, Text } from "@component-library/index";
import {
  OntoNode,
  OntoNodeType,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";

interface ResourceTableProps<T extends OntoNode> {
  nodes: T[] | undefined;
  nodeType: OntoNodeType;
}

const ResourceTable = <T extends OntoNode>(props: ResourceTableProps<T>) => {
  const { nodes = [], nodeType } = props;
  const { t } = useTranslation();

  const { filterDataBySearchInput, handleSearchInputChange } = useSearch<T>();
  const { getSortIcon, handleSort, sortItems } = useSort<T>();

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
                      onClick={() => handleSort("nodeName")}
                    >
                      <div className="ml-6 flex flex-row items-center justify-center">
                        {t(`Resources.components.Table.name`)}
                        {getSortIcon("nodeName")}
                      </div>
                    </Button>
                  </div>
                </th>
                <th>{t("Resources.components.Table.action")}</th>
              </tr>
            </thead>
            <tbody>
              {nodes
                .filter((node) => filterDataBySearchInput(node))
                .sort(sortItems)
                .map((node, index) => (
                  <tr key={index}>
                    <td className="text-center">{node.nodeName}</td>
                    <td>
                      <Container width="full">
                        <Button
                          variant="text"
                          title={t("Resources.components.Table.buttons.edit")}
                        />
                        <Button
                          variant="text"
                          title={t("Resources.components.Table.buttons.delete")}
                        />
                      </Container>
                    </td>
                  </tr>
                ))}
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
