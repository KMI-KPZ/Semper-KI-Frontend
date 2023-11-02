import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin, { OrganizationProps } from "../hooks/useAdmin";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@component-library/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import useSearch from "@/hooks/useSearch";
import Search from "@component-library/Search";

interface AdminOrganizationProps {
  organizations: OrganizationProps[] | undefined;
}

const AdminOrganization: React.FC<AdminOrganizationProps> = (props) => {
  const { organizations } = props;
  const { t } = useTranslation();
  const { deleteOrganization } = useAdmin();
  const { filterDataBySearchInput, handleSearchInputChange } = useSearch();

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.Organization.confirm")))
      deleteOrganization.mutate({ hashedID, name });
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.Organization.title")}</Heading>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.Organization.name")}</TableCell>
              <TableCell>{t("Admin.Organization.canManufacturer")}</TableCell>
              <TableCell>{t("Admin.Organization.created")}</TableCell>
              <TableCell>{t("Admin.Organization.accessed")}</TableCell>
              <TableCell>{t("Admin.Organization.updated")}</TableCell>
              <TableCell>{t("Admin.Organization.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations !== undefined && organizations.length > 0 ? (
              organizations
                .filter((orga) => filterDataBySearchInput(orga))
                .map((orga: OrganizationProps, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {orga.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {orga.canManufacture === true ? (
                        <CheckIcon />
                      ) : (
                        <ClearIcon />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(orga.created).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(orga.accessed).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(orga.updated).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <div className="flex w-full flex-row items-center justify-center gap-3 p-2">
                        <Button
                          title={t("Admin.Organization.button.delete")}
                          onClick={() =>
                            handleOnClickButtonDelete(orga.hashedID, orga.name)
                          }
                          children={<DeleteIcon />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell rowSpan={6}>
                  <Text variant="body">{t("Admin.Organization.empty")}</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrganization;
