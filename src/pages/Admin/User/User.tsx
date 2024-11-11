import { Container, Heading, Search, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin, { AdminDataUser } from "../../../hooks/useAdmin";
import { Button } from "@component-library/index";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Table/Pagination";
import useAdminDeleteUser from "@/api/Admin/Mutations/useAdminDeleteUser";
import { useNavigate } from "react-router-dom";

interface Props {}

const AdminUser: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { users } = useAdmin();
  const deleteUser = useAdminDeleteUser();
  const navigate = useNavigate();

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<AdminDataUser>();
  const {
    getSortIcon,
    handleSort,
    sortItems,
    getNestedSortIcon,
    handleNestedSort,
  } = useSort<AdminDataUser>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<AdminDataUser>({
      items: users
        .filter((user) => filterDataBySearchInput(user))
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.User.confirm")))
      deleteUser.mutate({ hashedID, name });
  };

  const handleOnClickButtonDetails = (hashedID: string) => {
    navigate(hashedID);
  };

  const handleOnClickButtonEdit = (hashedID: string) => {
    navigate(hashedID + "/edit");
  };

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.User.heading")}</Heading>
      </BackButtonContainer>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer>
        <Table type="fixed_last_row">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.name")}
                objectKey="name"
              />
              <TableHeaderButton
                handleSort={handleNestedSort}
                getSortIcon={getNestedSortIcon}
                title={t("Admin.User.email")}
                objectKey="details.email"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.orga")}
                objectKey="organizationNames"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.created")}
                objectKey="createdWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.accessed")}
                objectKey="accessedWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.updated")}
                objectKey="updatedWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.User.lastSeen")}
                objectKey="lastSeen"
              />
              <th>{t("Admin.User.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((user: AdminDataUser, index: number) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.details.email}</td>
                  <td>
                    {user.organizationNames !== undefined
                      ? user.organizationNames.join(", ")
                      : "---"}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(user.createdWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(user.accessedWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(user.updatedWhen).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap">
                    {new Date(user.lastSeen).toLocaleString()}
                  </td>
                  <td>
                    <Container direction="col" width="full">
                      <Button
                        title={t("general.button.details")}
                        onClick={() =>
                          handleOnClickButtonDetails(user.hashedID)
                        }
                        variant="text"
                      />
                      <Button
                        title={t("general.button.edit")}
                        onClick={() => handleOnClickButtonEdit(user.hashedID)}
                        variant="text"
                      />
                      <Button
                        title={t("general.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(user.hashedID, user.name)
                        }
                        variant="text"
                      />
                    </Container>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <Text variant="body">{t("Admin.User.empty")}</Text>
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

export default AdminUser;
