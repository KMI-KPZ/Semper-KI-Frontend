import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
  Search,
  Text,
} from "@component-library/index";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import useOrganization from "@/hooks/useOrganization";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import useGetOrgaNodesByType from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import Collapsible from "@/components/Collapsible/Collapsible";
import { ResourcesNodeFormEdges } from "./NodeForm";

interface ResourcesEdgeFormProps {
  nodeType: OntoNodeType;
  useEdgeArray: UseFieldArrayReturn<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
    "edges",
    "id"
  >;
  register: UseFormRegister<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>;
}

interface ResourcesEdgeFormItem
  extends FieldArrayWithId<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
    "edges",
    "id"
  > {
  index: number;
}

const ResourcesEdgeForm: React.FC<ResourcesEdgeFormProps> = (props) => {
  const { nodeType, useEdgeArray } = props;
  const { t } = useTranslation();
  const nodes = useGetOrgaNodesByType(nodeType);
  const { organization } = useOrganization();
  const {
    getSortIcon: getSortIconAll,
    handleSort: handleSortAll,
    sortItems: sortItemsAll,
  } = useSort<OntoNode>();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const [paginationAll, setPaginationAll] = React.useState<number>(5);

  const {
    getSortIcon: getSortIconOwn,
    handleSort: handleSortOwn,
    sortItems: sortItemsOwn,
  } = useSort<
    FieldArrayWithId<
      (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
      "edges",
      "id"
    >
  >();
  const {
    filterDataBySearchInput: filterDataBySearchInputOwn,
    handleSearchInputChange: handleSearchInputChangeOwn,
  } =
    useSearch<
      FieldArrayWithId<
        (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
        "edges",
        "id"
      >
    >();

  const { fields, append, remove } = useEdgeArray;

  const filteredEdges: ResourcesEdgeFormItem[] = fields
    .map((edge, index) => ({ ...edge, index }))
    .filter((edge) => edge.nodeType === nodeType)
    .filter((node) => filterDataBySearchInputOwn(node))
    .sort(sortItemsOwn);

  const allEdges =
    nodes.data === undefined
      ? []
      : nodes.data
          .filter(
            (node) =>
              filteredEdges.find((edge) => edge.nodeID === node.nodeID) ===
              undefined
          )
          .filter((node) => filterDataBySearchInput(node))
          .sort(sortItemsAll);

  return (
    <Container width="full" direction="col" className="card gap-0 bg-white">
      <Heading variant="h3">
        {t("components.Resources.EdgeForm.heading")}
        {t(`types.OntoNodeType.${nodeType}`)}
      </Heading>
      <Collapsible initialOpen showButton className="mt-5">
        <Container width="full" direction="col">
          <Search handleSearchInputChange={handleSearchInputChange} />
          <Container
            width="full"
            direction="col"
            className="overflow-auto"
            justify="start"
            items="start"
          >
            <table className="card-container w-full table-auto border-separate border-spacing-x-0 p-0">
              <caption className=" pb-2 pl-5 text-left">
                <Heading variant="h4">
                  {t("components.Resources.EdgeForm.table.caption")}
                </Heading>
              </caption>
              <thead className="">
                <tr>
                  <th className="rounded-tl-xl bg-gray-50">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant="text"
                        title={t("components.Resources.EdgeForm.table.name")}
                        onClick={() => handleSortAll("name")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t("components.Resources.EdgeForm.table.name")}
                          {getSortIconAll("name")}
                        </div>
                      </Button>
                    </div>
                  </th>
                  <th className="bg-gray-50">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant="text"
                        title={t(
                          "components.Resources.EdgeForm.table.createdBy"
                        )}
                        onClick={() => handleSortAll("createdBy")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t("components.Resources.EdgeForm.table.createdBy")}
                          {getSortIconAll("createdBy")}
                        </div>
                      </Button>
                    </div>
                  </th>

                  <th className="rounded-tr-xl bg-gray-50 p-3 text-left">
                    {t("components.Resources.EdgeForm.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {nodes.isLoading ? (
                  <tr>
                    <td colSpan={3}>
                      <Container width="full">
                        <LoadingAnimation />
                      </Container>
                    </td>
                  </tr>
                ) : allEdges.length > 0 ? (
                  <>
                    {allEdges
                      .filter(
                        (node) => node.createdBy === organization.hashedID
                      )
                      .slice(0, paginationAll)
                      .map((node, index) => (
                        <tr key={index}>
                          <td
                            className={`border-t-2 p-3 text-left ${
                              index % 2 === 1 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            {node.name}
                          </td>
                          <td
                            className={`border-t-2 p-3 text-left ${
                              index % 2 === 1 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            {node.createdBy === organization.hashedID
                              ? organization.name
                              : "Semper-KI"}
                          </td>
                          <td
                            className={`border-t-2 p-3 text-left ${
                              index % 2 === 1 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <Container
                              width="full"
                              direction="row"
                              justify="start"
                            >
                              <Button
                                title={t("general.button.add")}
                                onClick={() => {
                                  append({
                                    nodeID: node.nodeID,
                                    nodeType: nodeType,
                                    nodeName: node.name,
                                    createdBy: node.createdBy,
                                  });
                                }}
                                className="w-full"
                                size="sm"
                                variant="text"
                              />
                            </Container>
                          </td>
                        </tr>
                      ))}
                    {allEdges.length > paginationAll || allEdges.length > 0 ? (
                      <tr key="more">
                        <td colSpan={3} className="border-t-2 p-3">
                          <Container width="full">
                            {allEdges.length > paginationAll ? (
                              <Button
                                onClick={() =>
                                  setPaginationAll((prevState) => prevState + 5)
                                }
                                title={t("general.button.showMore")}
                                size="sm"
                                variant="text"
                              />
                            ) : null}
                            {paginationAll > 0 ? (
                              <Button
                                onClick={() =>
                                  setPaginationAll((prevState) => prevState - 5)
                                }
                                title={t("general.button.showLess")}
                                size="sm"
                                variant="text"
                              />
                            ) : null}
                          </Container>
                        </td>
                      </tr>
                    ) : null}
                  </>
                ) : (
                  <tr>
                    <td colSpan={3} className="border-t-2 p-3 text-center">
                      <Text>
                        {t("components.Resources.EdgeForm.table.noItems")}
                      </Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
          <Search handleSearchInputChange={handleSearchInputChangeOwn} />
          <Container
            width="full"
            direction="col"
            className="overflow-auto"
            justify="start"
            items="start"
          >
            <table className="card-container w-full table-auto border-separate border-spacing-x-0 p-0">
              <caption className=" pb-2 pl-5 text-left">
                <Heading variant="h4">
                  {t("components.Resources.EdgeForm.table.selected")}
                </Heading>
              </caption>
              <thead className="">
                <tr>
                  <th className="rounded-tl-xl bg-gray-50">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant="text"
                        title={t("components.Resources.EdgeForm.table.name")}
                        onClick={() => handleSortOwn("nodeName")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t("components.Resources.EdgeForm.table.name")}
                          {getSortIconOwn("nodeName")}
                        </div>
                      </Button>
                    </div>
                  </th>
                  <th className="bg-gray-50">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant="text"
                        title={t(
                          "components.Resources.EdgeForm.table.createdBy"
                        )}
                        onClick={() => handleSortOwn("createdBy")}
                        className="whitespace-nowrap"
                      >
                        <div className="ml-6 flex flex-row items-center justify-center">
                          {t("components.Resources.EdgeForm.table.createdBy")}
                          {getSortIconOwn("createdBy")}
                        </div>
                      </Button>
                    </div>
                  </th>

                  <th className="rounded-tr-xl bg-gray-50 p-3 text-left">
                    {t("components.Resources.EdgeForm.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEdges.length > 0 ? (
                  filteredEdges.map((node, index) => (
                    <tr key={node.index}>
                      <td
                        className={`border-t-2 p-3 text-center ${
                          index % 2 === 1 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        {node.nodeName}
                      </td>
                      <td
                        className={`border-t-2 p-3 text-center ${
                          index % 2 === 1 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        {node.createdBy === organization.hashedID
                          ? organization.name
                          : "Semper-KI"}
                      </td>
                      <td
                        className={`border-t-2 p-3 text-center ${
                          index % 2 === 1 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <Button
                          title={t("general.button.delete")}
                          onClick={() => remove(node.index)}
                          size="sm"
                          variant="text"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border-t-2 p-3 text-center">
                      <Text>
                        {t("components.Resources.EdgeForm.table.noItems")}
                      </Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ResourcesEdgeForm;
