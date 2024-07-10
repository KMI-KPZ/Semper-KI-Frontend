import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
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

const AdminMaterials: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  return (
    <div className="admin-view">
      <Heading variant="h1">{t("Admin.Materials.Materials.header")}</Heading>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {t("Admin.Materials.Materials.material-id")}
              </TableCell>
              <TableCell>{t("Admin.Materials.Materials.name")}</TableCell>
              <TableCell>{t("Admin.Materials.Materials.propList")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((material: MaterialProps, index: number) => (
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

export default AdminMaterials;
