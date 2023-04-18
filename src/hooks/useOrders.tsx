import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../components/App/App";
import { EOrderState } from "../interface/enums";
import { IOrderCollection } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IOrderCollection[] | undefined;
  status: "error" | "success" | "loading";
  error: Error | null;
}

export const useOrders = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { data, status, error } = useQuery<IOrderCollection[], Error>(
    ["orders"],
    async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getOrders/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useOrders | ✅ |", response.data);
        return response.data;
      });
    }
  );

  return { data, status, error };
};
