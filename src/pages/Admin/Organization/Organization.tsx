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
import { useForm } from "react-hook-form";

interface AdminOrganizationProps {
  organizations: OrganizationProps[] | undefined;
}

const AdminOrganization: React.FC<AdminOrganizationProps> = (props) => {
  const { organizations } = props;
  const { t } = useTranslation();
  const { deleteOrganization } = useAdmin();

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.Orga.confirm")))
      deleteOrganization.mutate({ hashedID, name });
  };

  const { register, watch } = useForm<{
    search: string;
  }>();

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const filterOrganizationBySearchInput = (
    orga: OrganizationProps
  ): boolean => {
    const searchInput = watch("search");
    if (searchInput === undefined || searchInput === "") return true;
    const searchInputLowerCase = searchInput.toLowerCase();
    const name = orga.name.toLowerCase();
    return name.includes(searchInputLowerCase);
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.Orga.title")}</Heading>
      <form className="flex w-full flex-col gap-5 md:flex-row">
        <input
          onKeyDown={handelOnKeyDown}
          className="flex w-full bg-slate-100 p-3"
          type="search"
          {...register("search")}
          placeholder={t("Admin.User.search")}
        />
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.Orga.name")}</TableCell>
              <TableCell>{t("Admin.Orga.canManufacturer")}</TableCell>
              <TableCell>{t("Admin.Orga.created")}</TableCell>
              <TableCell>{t("Admin.Orga.accessed")}</TableCell>
              <TableCell>{t("Admin.Orga.updated")}</TableCell>
              <TableCell>{t("Admin.Orga.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations !== undefined && organizations.length > 0 ? (
              organizations
                .filter((orga) => filterOrganizationBySearchInput(orga))
                .map((orga: OrganizationProps, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {orga.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {orga.canManufacturer ? <CheckIcon /> : <ClearIcon />}
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
                          title={t("Admin.Orga.button.delete")}
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
                  <Text variant="body">{t("Admin.Orga.empty")}</Text>
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
