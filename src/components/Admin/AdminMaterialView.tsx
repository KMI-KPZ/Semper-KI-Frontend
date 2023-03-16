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
import { IMaterial } from "../../interface/Interface";

interface Props {
  materialList: IMaterial[];
}

const AdminMaterialView: React.FC<Props> = (props) => {
  const { materialList } = props;
  return (
    <div className="admin-view">
      <h1>Benutzer</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>MaterialId</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>PropList</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materialList.map((material: IMaterial, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {material.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {material.propList?.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminMaterialView;
