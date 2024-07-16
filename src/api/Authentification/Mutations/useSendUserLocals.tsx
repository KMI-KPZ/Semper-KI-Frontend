import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useSendUserLocals = () => {
  const queryClient = useQueryClient();

  const sendUserLocals = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/localeOfUser/set/`, {
        navigator,
      })
      .then((response) => {
        logger("useSendUserLocals | setLocalOfUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSendUserLocals | setLocalOfUser ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: sendUserLocals,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useSendUserLocals;
