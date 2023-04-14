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
import { EOrderState } from "../../interface/enums";
import { IOrder } from "../../interface/Interface";

interface Props {
  orderList: IOrder[];
}

const AdminOrderView: React.FC<Props> = (props) => {
  const { orderList } = props;
  return (
    <div className="admin-view">
      <h1>Benutzer</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>OrderId</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>OrderState</TableCell>
              <TableCell>ProcessList</TableCell>
              <TableCell>Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order: IOrder, index: number) => (
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
                  {EOrderState[order.orderState]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {order.processList.length}
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

export default AdminOrderView;
