import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

interface ReturnProps {
  verifyOrder: UseMutationResult<any, Error, VerificationProps, unknown>;
}

export interface VerificationProps {
  orderID: string;
  subOrderIDs: string[];
  send: boolean;
}

const useVerification = (): ReturnProps => {
  const queryClient = useQueryClient();

  const verifyOrder = useMutation<any, Error, VerificationProps>({
    mutationFn: async (props) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/verifyOrder/`;
      return getCustomAxios()
        .patch(url, {
          ...props,
        })
        .then((response) => {
          logger("useVerification | verifyOrder ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["order", variables.orderID]);
    },
  });

  return { verifyOrder };
};

export default useVerification;
