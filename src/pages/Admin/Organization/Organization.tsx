import { Heading, Search, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin, { OrganizationProps } from "../hooks/useAdmin";
import { Button } from "@component-library/index";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Table/Pagination";

interface AdminOrganizationProps {}

const AdminOrganization: React.FC<AdminOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { deleteOrganization, organizations } = useAdmin();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OrganizationProps>();
  const { getSortIcon, handleSort, sortItems } = useSort<OrganizationProps>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<OrganizationProps>({
      items: organizations
        .filter((orga) => filterDataBySearchInput(orga))
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.Organization.confirm")))
      deleteOrganization.mutate({ hashedID, name });
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Organization.title")}</Heading>
      </BackButtonContainer>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer>
        <Table type="fixed_last_row">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Organization.name")}
                objectKey="name"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Organization.canManufacturer")}
                objectKey="canManufacture"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Organization.created")}
                objectKey="createdWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Organization.accessed")}
                objectKey="accessedWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Organization.updated")}
                objectKey="updatedWhen"
              />
              <th>{t("Admin.Organization.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((orga: OrganizationProps, index: number) => (
                <tr key={index}>
                  <td>{orga.name}</td>
                  <td>
                    {orga.canManufacture === true ? (
                      <CheckIcon />
                    ) : (
                      <ClearIcon />
                    )}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(orga.createdWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(orga.accessedWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(orga.updatedWhen).toLocaleString()}
                  </td>
                  <td>
                    <div className="flex w-full flex-row items-center justify-center gap-3 p-2">
                      <Button
                        title={t("Admin.Organization.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(orga.hashedID, orga.name)
                        }
                        variant="text"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td rowSpan={6}>
                  <Text variant="body">{t("Admin.Organization.empty")}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
};

export default AdminOrganization;
