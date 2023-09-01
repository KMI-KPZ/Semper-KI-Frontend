import React, { useState } from "react";
import { OrderProps } from "./useOrder";

interface useCheckedSubOrdersReturnProps {
  checkedSubOrders: string[];
  handleOnChangeCheckboxSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    subOrderID: string
  ) => void;
  handleOnChangeCheckboxSelectAll: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const useCheckedSubOrders = (
  order: OrderProps | undefined
): useCheckedSubOrdersReturnProps => {
  const [checkedSubOrders, setCheckedSubOrders] = useState<string[]>([]);

  const handleOnChangeCheckboxSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    subOrderID: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedSubOrders([...checkedSubOrders, subOrderID]);
    } else {
      setCheckedSubOrders(
        checkedSubOrders.filter(
          (checkedSubOrder) => checkedSubOrder !== subOrderID
        )
      );
    }
  };
  const handleOnChangeCheckboxSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    if (order === undefined) return;
    if (checked) {
      setCheckedSubOrders(
        order.subOrders.map((subOrder) => subOrder.subOrderID)
      );
    } else {
      setCheckedSubOrders([]);
    }
  };

  return {
    checkedSubOrders,
    handleOnChangeCheckboxSelect,
    handleOnChangeCheckboxSelectAll,
  };
};

export default useCheckedSubOrders;
