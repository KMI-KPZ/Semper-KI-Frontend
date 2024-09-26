import { AuthorizedUserProps } from "@/hooks/useUser";
import { Heading, Search, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin from "../hooks/useAdmin";
import { Button } from "@component-library/index";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Table/Pagination";

interface Props {}

const AdminUser: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { deleteUser, users } = useAdmin();
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

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
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
                    <div className="flex w-full flex-row items-center justify-center gap-3 p-2">
                      <Button
                        title={t("Admin.User.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(user.hashedID, user.name)
                        }
                        variant="text"
                      />
                    </div>
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
    </div>
  );
};

export default AdminUser;
