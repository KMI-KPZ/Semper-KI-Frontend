import { AuthorizedUserProps } from "@/hooks/useUser";
import {
  Container,
  Heading,
  Modal,
  Search,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useAdmin, { AdminUserProps } from "../hooks/useAdmin";
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
import AdminUserDetails from "./UserDetails";

interface Props {}

const AdminUser: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { users } = useAdmin();
  const deleteUser = useAdminDeleteUser();

  const [detailedUser, setDetailedUserID] = useState<
    AdminUserProps | undefined
  >(undefined);
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<AuthorizedUserProps>();
  const {
    getSortIcon,
    handleSort,
    sortItems,
    getNestedSortIcon,
    handleNestedSort,
  } = useSort<AuthorizedUserProps>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<AuthorizedUserProps>({
      items: users
        .filter((user) => filterDataBySearchInput(user))
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.User.confirm")))
      deleteUser.mutate({ hashedID, name });
  };

  const handleOnClickButtonDetails = (hashedID: string) => {
    setDetailedUserID(users.find((user) => user.hashedID === hashedID));
  };

  const handleOnClickButtonEdit = (hashedID: string) => {
    console.log("Edit User", hashedID);
  };

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.User.title")}</Heading>
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
                objectKey="organization"
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
              paginatedItems.map((user: AuthorizedUserProps, index: number) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.details.email}</td>
                  <td>
                    {user.organization !== undefined
                      ? user.organization.toString().split(",").join(", ")
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
                    <Container direction="col">
                      <Button
                        title={t("Admin.Resources.button.details")}
                        onClick={() =>
                          handleOnClickButtonDetails(user.hashedID)
                        }
                        variant="text"
                      />
                      <Button
                        title={t("Admin.Resources.button.edit")}
                        onClick={() => handleOnClickButtonEdit(user.hashedID)}
                        variant="text"
                      />
                      <Button
                        title={t("Admin.Resources.button.delete")}
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
      <Modal
        open={detailedUser !== undefined}
        closeModal={() => setDetailedUserID(undefined)}
        modalKey="adminUserDetails"
      >
        {detailedUser !== undefined ? (
          <AdminUserDetails user={detailedUser} />
        ) : null}
      </Modal>
    </Container>
  );
};

export default AdminUser;
