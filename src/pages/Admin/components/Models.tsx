import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
import { Heading } from "@component-library/index";
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

const AdminModels: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  return (
    <div className="admin-view">
      <Heading variant="h1">{t("Admin.components.Models.header")}</Heading>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.components.Models.name")}</TableCell>
              <TableCell>{t("Admin.components.Models.date")}</TableCell>
              <TableCell>{t("Admin.components.Models.license")}</TableCell>
              <TableCell>{t("Admin.components.Models.tags")}</TableCell>
              <TableCell>{t("Admin.components.Models.certificates")}</TableCell>
              <TableCell>{t("Admin.components.Models.URI")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((model: ProcessModel, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {model.fileName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.date.toLocaleString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.licenses}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.certificates.join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {model.tags.join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* <img src={model.URI} /> */}
                  {model.imgPath}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminModels;
