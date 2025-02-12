import { useTranslation } from "react-i18next";
import { Button, Container, Search, Text } from "@component-library/index";
import {
  OntoNode,
  OntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import ResourceTableRow from "./TableRow";

interface ResourceTableProps {
  nodes: OntoNode[] | undefined;
  nodeType: OntoNodeType;
}

const ResourceTable = (props: ResourceTableProps) => {
  const { nodes = [] } = props;
  const { t } = useTranslation();

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();

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
                      <ResourceTableRow key={index} index={index} node={node} />
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
