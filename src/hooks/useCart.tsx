import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

export interface ICartHook {
  cartQuery: DefinedUseQueryResult<IProcessItem[], Error>;
  updateCart: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IProcessItem[],
    unknown
  >;
}

export interface ICartResponse {
  cart: IProcessItem[];
}

const useCart = (): ICartHook => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();

  const cartQuery = useQuery<IProcessItem[], Error>({
    queryKey: ["cart", "load"],
    queryFn: async () =>
      axiosCustom
        .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getCart/`)
        .then((res) => {
          console.log("useCart | getCart ✅ |", res.data);
          return res.data.cart !== undefined ? res.data.cart : [];
        }),
    initialData: [],
  });

  const updateCart = useMutation<AxiosResponse, Error, IProcessItem[]>({
    mutationFn: async (cart: IProcessItem[]) =>
      axiosCustom
        .post(`${process.env.REACT_APP_HTTP_API_URL}/public/updateCart/`, {
          cart,
        })
        .then((res) => {
          console.log("useCart | updateCart ✅ |", res.data, cart);
          return res;
        }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return { cartQuery, updateCart };
};

export default useCart;
