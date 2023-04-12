import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  cart: IProcessItem[];
  status: "error" | "success" | "loading";
  error: Error | null;
  uploadCart: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IProcessItem[],
    unknown
  >;
}

export interface ICartResponse {
  cart: IProcessItem[];
}

const useCart = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();

  const {
    data: cart,
    status,
    error,
  } = useQuery<IProcessItem[], Error>({
    queryKey: ["cart", "load"],
    queryFn: async () =>
      axiosCustom
        .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getCart/`)
        .then((res) => {
          console.log("useCart | loadCart ✅ |", res.data);
          return res.data.cart !== undefined ? res.data.cart : res.data;
        }),
    initialData: [],
  });

  const uploadCart = useMutation<AxiosResponse, Error, IProcessItem[]>({
    mutationFn: async (cart: IProcessItem[]) =>
      axiosCustom
        .post(`${process.env.REACT_APP_HTTP_API_URL}/public/updateCart/`, {
          cart,
        })
        .then((res) => {
          console.log("useCart | updateCart ✅ |", res.data, cart);
          return res;
        }),
  });

  return { cart, status, error, uploadCart };
};

export default useCart;
