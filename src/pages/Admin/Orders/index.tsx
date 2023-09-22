import { OrderState, useOrder } from "@/pages/Order/hooks/useOrder";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AdminFlatOrderProps } from "../hooks/useAdmin";
import { Button } from "@component-library/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@component-library/Container";
import logger from "@/hooks/useLogger";
import Search from "@component-library/Search";
import useSearch from "@/hooks/useSearch";

interface Props {
  orders?: AdminFlatOrderProps[];
}

const AdminOrders: React.FC<Props> = (props) => {
  const { orders } = props;
  const { t } = useTranslation();
  const { deleteOrder } = useOrder();
  const { filterDataBySearchInput, handleSearchInputChange } = useSearch();
  const handleOnClickButtonDelete = (orderID: string) => {
    if (window.confirm(t("Admin.AdminOrderView.confirm")))
      deleteOrder.mutate(orderID);
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.AdminOrderView.header")}</Heading>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.AdminOrderView.orderID")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.clientName")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.orderTitle")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.subOrderCount")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.status")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.accessed")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.created")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.updated")}</TableCell>
              <TableCell>{t("Admin.AdminOrderView.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders !== undefined && orders.length > 0
              ? orders
                  .filter((order: AdminFlatOrderProps) =>
                    filterDataBySearchInput(order)
                  )
                  .map((order: AdminFlatOrderProps, index: number) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.orderCollectionID}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.clientName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.details.title === undefined
                          ? "---"
                          : order.details.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.subOrderCount}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {t(
                          `Orders.OrderCollection.state.${
                            OrderState[order.status]
                          }`
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.accessed.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.created.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.updated.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Container>
                          <Button
                            title={t("Admin.AdminOrderView.buttons.show")}
                            children={<VisibilityIcon />}
                            to={`/admin/orders/${order.orderCollectionID}`}
                          />
                          <Button
                            title={t("Admin.AdminOrderView.buttons.delete")}
                            children={<DeleteIcon />}
                            onClick={() =>
                              handleOnClickButtonDelete(order.orderCollectionID)
                            }
                          />
                        </Container>
                      </TableCell>
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrders;
