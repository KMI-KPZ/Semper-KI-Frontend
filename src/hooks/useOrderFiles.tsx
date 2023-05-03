import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IOrder } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface Props {
  orderID: string;
  fileName: string;
}
interface State {
  orderID: string;
  fileName: string;
  load: boolean;
}

interface ReturnProps {
  orderFileQuery: UseQueryResult<File, Error>;
}

const useOrderFile = (props: Props): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [state, setState] = useState<State>({ ...props, load: true });
  const { fileName, orderID, load } = state;
  useEffect(() => {
    if (state.orderID !== orderID && state.fileName !== fileName) {
      setState((prevState) => ({
        ...prevState,
        fileName,
        orderID,
        load: fileName !== "" && orderID !== "" ? true : false,
      }));
    }
  }, [orderID, fileName]);

  const orderFileQuery = useQuery<File, Error>({
    queryKey: ["order", "file"],
    queryFn: async () =>
      axiosCustom
        .post(
          `${process.env.REACT_APP_HTTP_API_URL}/public/getFileFromOrder/`,
          { id: orderID, filename: fileName }
        )
        .then((res) => {
          console.log("useOrderFiles | orderFileQuery ✅ |", res.data);
          setState((prevState) => ({ ...prevState, load: false }));
          return res.data;
        }),
    enabled: load,
  });

  return { orderFileQuery };
};

export default useOrderFile;
