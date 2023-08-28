import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import { Heading } from "@component-library/Typography";
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
      <Heading variant="h1">{t("Admin.AdminModelView.header")}</Heading>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.AdminModelView.name")}</TableCell>
              <TableCell>{t("Admin.AdminModelView.date")}</TableCell>
              <TableCell>{t("Admin.AdminModelView.license")}</TableCell>
              <TableCell>{t("Admin.AdminModelView.tags")}</TableCell>
              <TableCell>{t("Admin.AdminModelView.certificates")}</TableCell>
              <TableCell>{t("Admin.AdminModelView.URI")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((model: ModelProps, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {model.title}
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

export default AdminModels;
