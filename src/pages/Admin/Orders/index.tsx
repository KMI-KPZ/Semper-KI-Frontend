import { OrderState } from "@/pages/Order/hooks/useOrder";
import { SubOrderProps } from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { FlatOrderProps } from "@/pages/Orders/hooks/useFlatOrders";
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

interface Props {
  orders?: AdminFlatOrderProps[];
}

const AdminOrders: React.FC<Props> = (props) => {
  const { orders } = props;
  const { t } = useTranslation();
  const handleOnClickButtonDelete = (hashedID: string, name: string) => {
    // if (window.confirm(t("Admin.Orga.confirm")))
    // deleteOrganization.mutate({ hashedID, name });
  };

  const { register, watch } = useForm<{
    search: string;
  }>();

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const filterOrdersBySearchInput = (order: AdminFlatOrderProps): boolean => {
    const searchInput = watch("search");
    if (searchInput === undefined || searchInput === "") return true;
    const searchInputLowerCase = searchInput.toLowerCase();
    const orderID = order.orderCollectionID;
    const client = order.client.toLocaleLowerCase();
    const created = order.created.toLocaleDateString();
    const updated = order.updated.toLocaleDateString();
    const title =
      order.details.title === undefined
        ? ""
        : order.details.title.toLocaleLowerCase();
    return (
      orderID.includes(searchInputLowerCase) ||
      client.includes(searchInputLowerCase) ||
      created.includes(searchInputLowerCase) ||
      updated.includes(searchInputLowerCase) ||
      title.includes(searchInputLowerCase)
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.AdminOrderView.header")}</Heading>
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
                  .filter(filterOrdersBySearchInput)
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
                        {order.accessed.toLocaleDateString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.created.toLocaleDateString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.updated.toLocaleDateString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Container>
                          <Button
                            title={t("Admin.AdminOrderView.buttons.show")}
                            children={<VisibilityIcon />}
                          />
                          <Button
                            title={t("Admin.AdminOrderView.buttons.delete")}
                            children={<DeleteIcon />}
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
