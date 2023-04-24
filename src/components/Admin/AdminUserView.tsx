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
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";

interface Props {}

const AdminUserView: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="admin-view">
      <h1>Benutzer</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Erstellt</TableCell>
              <TableCell>Zugegriffen</TableCell>
              <TableCell>Aktualisiert</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((user: IUser, index: number) => (
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
                  {EUserType[user.type]}
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

export default AdminUserView;
