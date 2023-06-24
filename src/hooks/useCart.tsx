import { IProcessItem } from "@/pages/Process";
import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import customAxios from "./useCustomAxios";

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
  const queryClient = useQueryClient();

  const cartQuery = useQuery<IProcessItem[], Error>({
    queryKey: ["cart", "load"],
    queryFn: async () =>
      customAxios
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getCart/`)
        .then((res) => {
          console.log("useCart | getCart ✅ |", res.data);
          return res.data.cart !== undefined ? res.data.cart : [];
        }),
    initialData: [],
  });

  const updateCart = useMutation<AxiosResponse, Error, IProcessItem[]>({
    mutationFn: async (cart: IProcessItem[]) =>
      customAxios
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/updateCart/`, {
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
