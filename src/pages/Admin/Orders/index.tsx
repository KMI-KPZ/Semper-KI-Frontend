import { SubOrder, OrderState } from "@/pages/Order/hooks/useOrders";
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

const AdminOrders: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  return (
    <div className="admin-view">
      <Heading variant="h1">{t("Admin.AdminOrderView.header")}</Heading>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.AdminOrderView.order-id")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.date")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.status")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.cart")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.bill")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((order: SubOrder, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* {order.orderId} */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {order.date.toLocaleDateString()} */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {OrderState[order.state]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {order.processList.length} */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {/* {order.bills.name} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrders;
