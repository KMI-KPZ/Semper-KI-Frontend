import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { Order } from "./useOrders";

interface ReturnProps {}

const useOrdersState = (
  ordersQuery: UseQueryResult<Order[], Error>,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>
): ReturnProps => {
  useEffect(() => {
    if (ordersQuery.data !== undefined && state.length === 0)
      setState(
        ordersQuery.data.map((open, index) => (index === 0 ? true : false))
      );
  }, [ordersQuery.data]);

  return {};
};

export default useOrdersState;
