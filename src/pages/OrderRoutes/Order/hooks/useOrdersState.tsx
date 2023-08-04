import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { OrderProps } from "../../hooks/useOrder";

interface ReturnProps {}

const useOrdersState = (
  ordersQuery: UseQueryResult<OrderProps[], Error>,
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
