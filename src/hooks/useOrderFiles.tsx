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
  const { fileName, orderID } = props;

  const orderFileQuery = useQuery<File, Error>({
    queryKey: ["order", "file", orderID, fileName],
    queryFn: async () =>
      axiosCustom
        .post(
          `${process.env.REACT_APP_HTTP_API_URL}/public/getFileFromOrder/`,
          { id: orderID, filename: fileName }
        )
        .then((res) => {
          console.log("useOrderFiles | orderFileQuery ✅ |", res.data);
          return res.data;
        }),
    enabled: false,
  });

  return { orderFileQuery };
};

export default useOrderFile;
