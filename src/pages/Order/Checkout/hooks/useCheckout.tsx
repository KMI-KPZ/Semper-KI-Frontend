import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

interface ReturnProps {
  sendOrder: UseMutationResult<any, Error, CheckoutProps, unknown>;
}

export interface CheckoutProps {
  orderID: string;
  suborderIDs: string[];
}

const useCheckout = (): ReturnProps => {
  const queryClient = useQueryClient();

  const sendOrder = useMutation<any, Error, CheckoutProps>({
    mutationFn: async ({ orderID, suborderIDs }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/sendOrder/`;
      return getCustomAxios()
        .patch(url, {
          data: {
            orderID,
            suborderIDs,
          },
        })
        .then((response) => {
          logger("useCheckout | sendOrder ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["order", variables.orderID]);
    },
  });

  return { sendOrder };
};

export default useCheckout;
