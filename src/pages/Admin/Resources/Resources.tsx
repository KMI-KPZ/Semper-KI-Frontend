import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Search, Text } from "@component-library/index";
import TableContainer from "@/components/Table/TableContainer";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import Table from "@/components/Table/Table";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";
import {
  OntoNode,
  isOntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import Pagination from "@/components/Table/Pagination";
import useAdmin from "../hooks/useAdmin";
import useGetAdminNodes from "@/api/Resources/Admin/Querys/useGetAdminNodes";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteAdminNode from "@/api/Resources/Admin/Mutations/useDeleteAdminNode";
import AdminResourcesOverView from "./OverView";

interface AdminResourcesProps {}

const AdminResources: React.FC<AdminResourcesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const {} = useAdmin();
  const navigate = useNavigate();
  const { nodeType: unsafeNodeType } = useParams();
  const nodeType =
    unsafeNodeType !== undefined && isOntoNodeType(unsafeNodeType)
      ? unsafeNodeType
      : "printer";

  const adminNodes = useGetAdminNodes(nodeType);
  const deleteAdminNode = useDeleteAdminNode();

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<OntoNode>({
      items:
        adminNodes.data !== undefined
          ? adminNodes.data
              .filter((orga) => filterDataBySearchInput(orga))
              .sort(sortItems)
          : [],
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.Resources.confirmDelete", { name: name }))) {
      deleteAdminNode.mutate({ nodeID: hashedID });
    }
  };

  const handleOnClickButtonEdit = (hashedID: string) => {
    navigate(`${hashedID}/edit`);
  };
  const handleOnClickButtonDetails = (hashedID: string) => {
    navigate(`${hashedID}`);
  };

  const handleOnChangeActive = (hashedID: string) => {
    console.log("Active", hashedID);
  };

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <AdminResourcesOverView />
      <Search handleSearchInputChange={handleSearchInputChange} />
      <Container width="full" justify="end">
        <Button title={t("Admin.Resources.button.add")} size="sm" to="create" />
      </Container>
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
                title={t("Admin.Resources.active")}
                objectKey="active"
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
                title={t("Admin.Resources.createdBy")}
                objectKey="createdBy"
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
                title={t("Admin.Resources.nodeID")}
                objectKey="nodeID"
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
                title={t("Admin.Resources.createdWhen")}
                objectKey="createdWhen"
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
            {adminNodes.isLoading ? (
              <tr>
                <td colSpan={11}>
                  <Text variant="body">{t("Admin.Resources.loading")}</Text>
                </td>
              </tr>
            ) : paginatedItems.length > 0 ? (
              paginatedItems.map((node: OntoNode, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap">{node.name}</td>

                  <td className="whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={node.active}
                      onChange={() => handleOnChangeActive(node.nodeID)}
                    />
                  </td>
                  <td className="whitespace-nowrap">{node.context}</td>
                  <td className="whitespace-nowrap">{node.createdBy}</td>

                  <td className="">
                    <Container
                      direction="col"
                      width="fit"
                      align="start"
                      className="p-3"
                    >
                      {node.properties.map((prop, index) => (
                        <Text
                          key={index}
                          className="whitespace-nowrap"
                        >{`${prop.name}: ${prop.value}`}</Text>
                      ))}
                    </Container>
                  </td>
                  <td className="whitespace-nowrap">{node.nodeID}</td>
                  <td className="whitespace-nowrap">{node.nodeType}</td>
                  <td className="whitespace-nowrap">
                    {new Date(node.createdWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(node.accessedWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(node.updatedWhen).toLocaleString()}
                  </td>

                  <td>
                    <Container direction="col">
                      <Button
                        title={t("Admin.Resources.button.details")}
                        onClick={() => handleOnClickButtonDetails(node.nodeID)}
                        variant="text"
                      />
                      <Button
                        title={t("Admin.Resources.button.edit")}
                        onClick={() => handleOnClickButtonEdit(node.nodeID)}
                        variant="text"
                      />
                      <Button
                        title={t("Admin.Resources.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(node.nodeID, node.name)
                        }
                        variant="text"
                      />
                    </Container>
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
