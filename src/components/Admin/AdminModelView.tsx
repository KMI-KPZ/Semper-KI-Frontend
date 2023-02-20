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
import { IModel } from "../../interface/Interface";

interface Props {
  modelList: IModel[];
}

const AdminModelView: React.FC<Props> = (props) => {
  const { modelList } = props;
  console.log(modelList);

  return (
    <div className="admin-view">
      <h1>Modelle</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Lizens</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Zertifikat</TableCell>
              <TableCell>URI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modelList.map((model: IModel, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {model.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.license}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.certificate.join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.tags.join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* <img src={model.URI} /> */}
                  {model.URI}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminModelView;
