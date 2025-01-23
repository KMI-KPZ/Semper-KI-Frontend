import { Container, Heading, Search, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin from "../../../hooks/useAdmin";
import { Button } from "@component-library/index";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Table/Pagination";
import useAdminDeleteOrganization from "@/api/Admin/Mutations/useAdminDeleteOrganization";
import { useNavigate } from "react-router-dom";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface AdminOrganization {}

const AdminOrganization: React.FC<AdminOrganization> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizations } = useAdmin();
  const deleteOrganization = useAdminDeleteOrganization();
  const navigate = useNavigate();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<Organization>();
  const { getSortIcon, handleSort, sortItems } = useSort<Organization>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<Organization>({
      items: organizations
        .filter((orga) => filterDataBySearchInput(orga))
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.Organization.confirm", { name: name })))
      deleteOrganization.mutate({ hashedID, name });
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
        <Heading variant="h1">{t("Admin.Organization.heading")}</Heading>
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
                title={t("Admin.Organization.ServiceType")}
                objectKey="supportedServices"
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
              paginatedItems.map((orga: Organization, index: number) => (
                <tr key={index}>
                  <td>{orga.name}</td>
                  <td>
                    <Container width="full" direction="col">
                      {orga.supportedServices.map((serviceType, index) => (
                        <Text key={index} variant="body">
                          {t(
                            `enum.ServiceType.${
                              ServiceType[
                                serviceType
                              ] as keyof typeof ServiceType
                            }`
                          )}
                        </Text>
                      ))}
                    </Container>
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
                    <Container direction="col" width="full">
                      <Button
                        title={t("general.button.details")}
                        onClick={() =>
                          handleOnClickButtonDetails(orga.hashedID)
                        }
                        variant="text"
                      />
                      <Button
                        title={t("general.button.edit")}
                        onClick={() => handleOnClickButtonEdit(orga.hashedID)}
                        variant="text"
                      />
                      <Button
                        title={t("general.button.delete")}
                        onClick={() =>
                          handleOnClickButtonDelete(orga.hashedID, orga.name)
                        }
                        variant="text"
                      />
                    </Container>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Text variant="body">{t("Admin.Organization.empty")}</Text>
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

export default AdminOrganization;
