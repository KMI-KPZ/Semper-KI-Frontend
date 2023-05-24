import { User, UserType } from "@/hooks/useUser";
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
interface Props {}

const AdminUsers: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  return (
    <div className="admin-view">
      <h1>{t("Admin.AdminUserView.header")}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.AdminUserView.name")}</TableCell>
              <TableCell>{t("Admin.AdminUserView.email")}</TableCell>
              <TableCell>{t("Admin.AdminUserView.type")}</TableCell>
              <TableCell>{t("Admin.AdminUserView.created")}</TableCell>
              <TableCell>{t("Admin.AdminUserView.accessed")}</TableCell>
              <TableCell>{t("Admin.AdminUserView.updated")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((user: User, index: number) => (
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
                  {UserType[user.type]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {user.created} */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {user.accessed} */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {user.updated} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminUsers;
