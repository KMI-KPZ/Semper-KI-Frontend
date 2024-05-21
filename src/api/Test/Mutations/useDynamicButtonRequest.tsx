import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestDynamicProps } from "../Querys/useGetDynamicTestButtons";

const useDynamicButtonRequest = () => {
  const queryClient = useQueryClient();
  const dynamicButtonRequest = async ({ action, payload }: TestDynamicProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/${action}`, { payload })
      .then((response) => {
        logger("useDynamicButtonRequest | dynamicButtonRequest ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDynamicButtonRequest | dynamicButtonRequest ❌ |", error);
      });

  return useMutation<string, Error, TestDynamicProps>({
    mutationFn: dynamicButtonRequest,
    onSuccess: (data, { action, icon, payload, title }, context) => {
      queryClient.invalidateQueries(["testDynamicQuery"]);
    },
  });
};

export default useDynamicButtonRequest;
