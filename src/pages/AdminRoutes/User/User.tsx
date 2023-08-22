import { User, UserType } from "@/hooks/useUser/types";
import { Heading, Text } from "@component-library/Typography";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserSwitch } from "@/components/UserSwitch";
import useAdmin from "../hooks/useAdmin";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@component-library/Button";
import { useForm } from "react-hook-form";

interface Props {
  users: User[] | undefined;
}

const AdminUser: React.FC<Props> = (props) => {
  const { users } = props;
  const { t } = useTranslation();
  const { deleteUser } = useAdmin();

  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    if (window.confirm(t("Admin.User.confirm")))
      deleteUser.mutate({ hashedID, name });
  };

  const { register, watch } = useForm<{
    search: string;
  }>();

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const filterUserBySearchInput = (users: User): boolean => {
    const searchInput = watch("search");
    if (searchInput === undefined || searchInput === "") return true;
    const searchInputLowerCase = searchInput.toLowerCase();
    const name = users.name.toLowerCase();
    const email = users.email.toLowerCase();
    const organizations = users.organizations
      .map((organization) => organization.toLowerCase())
      .join(", ");
    return (
      name.includes(searchInputLowerCase) ||
      email.includes(searchInputLowerCase) ||
      organizations.includes(searchInputLowerCase)
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.User.title")}</Heading>
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
              <TableCell>{t("Admin.User.name")}</TableCell>
              <TableCell>{t("Admin.User.email")}</TableCell>
              <TableCell>{t("Admin.User.orga")}</TableCell>
              <TableCell>{t("Admin.User.created")}</TableCell>
              <TableCell>{t("Admin.User.accessed")}</TableCell>
              <TableCell>{t("Admin.User.updated")}</TableCell>
              <TableCell>{t("Admin.User.lastSeen")}</TableCell>
              <TableCell>{t("Admin.User.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users !== undefined && UserSwitch.length > 0 ? (
              users
                .filter((user) => filterUserBySearchInput(user))
                .map((user: User, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.organizations.map((title) => title).join(", ")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.created).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.accessed).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.updated).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.lastSeen).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <div className="flex w-full flex-row items-center justify-center gap-3 p-2">
                        <Button
                          title={t("Admin.User.button.delete")}
                          onClick={() =>
                            handleOnClickButtonDelete(user.hashedID, user.name)
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
                  <Text variant="body">{t("Admin.User.empty")}</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminUser;
