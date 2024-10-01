import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  Search,
  Text,
} from "@component-library/index";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import Table from "@/components/Table/Table";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";
import { OntoNode } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import Pagination from "@/components/Table/Pagination";
import useAdmin from "../hooks/useAdmin";

interface AdminResourcesProps {}

const AdminResources: React.FC<AdminResourcesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const {} = useAdmin();

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<OntoNode>({
      items: [].filter((orga) => filterDataBySearchInput(orga)).sort(sortItems),
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    console.log("Delete", hashedID, name);
  };

  const handleOnChangeActive = (hashedID: string) => {
    console.log("Active", hashedID);
  };

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Resources.title")}</Heading>
      </BackButtonContainer>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer>
        <Table type="fixed_last_row">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.name")}
                objectKey="name"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.nodeType")}
                objectKey="nodeType"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.active")}
                objectKey="active"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.createdBy")}
                objectKey="createdBy"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.createdWhen")}
                objectKey="createdWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.nodeID")}
                objectKey="nodeID"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.properties")}
                objectKey="properties"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.context")}
                objectKey="context"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.accessedWhen")}
                objectKey="accessedWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Resources.updatedWhen")}
                objectKey="updatedWhen"
              />

              <th>{t("Admin.Resources.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((node: OntoNode, index: number) => (
                <tr key={index}>
                  <td>{node.name}</td>
                  <td className="whitespace-nowrap">{node.nodeType}</td>
                  <td className="whitespace-nowrap">{node.createdBy}</td>
                  <td className="whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={node.active}
                      onChange={() => handleOnChangeActive(node.nodeID)}
                    />
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(node.createdWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">{node.nodeID}</td>
                  <td className="whitespace-nowrap">
                    {node.properties.join(", ")}
                  </td>
                  <td className="whitespace-nowrap">{node.context}</td>
                  <td className="whitespace-nowrap">
                    {new Date(node.accessedWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(node.updatedWhen).toLocaleString()}
                  </td>
                  <td>
                    <div className="flex w-full flex-row items-center justify-center gap-3 p-2">
                      <Button
                        title={t("Admin.Resources.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(node.nodeID, node.name)
                        }
                        variant="text"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>
                  <Text variant="body">{t("Admin.Resources.empty")}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
    </Container>
  );
};

export default AdminResources;
