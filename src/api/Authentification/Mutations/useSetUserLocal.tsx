import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useSetUserLocal = () => {
  const queryClient = useQueryClient();

  const setUserLocal = async (local: string) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/localeOfUser/set/`, {
        local,
      })
      .then((response) => {
        logger("useSetUserLocal | setUserLocal ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSetUserLocal | setUserLocal ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: setUserLocal,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useSetUserLocal;
