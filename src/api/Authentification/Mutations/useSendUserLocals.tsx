import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface SerializableNavigator {
  [key: string]: any;
}

const serializeNavigator = (navigator: Navigator): SerializableNavigator => {
  const serialized: SerializableNavigator = {};
  for (const key in navigator) {
    const value = (navigator as any)[key];
    if (typeof value === "object" && value !== null) {
      // Skip objects to avoid circular references
      continue;
    }
    if (typeof value === "function") {
      // Skip functions
      continue;
    }
    serialized[key] = value;
  }
  return serialized;
};

const useSendUserLocals = () => {
  const queryClient = useQueryClient();

  const navigatorData = serializeNavigator(navigator);

  const sendUserLocals = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/localeOfUser/set/`, {
        ...navigatorData,
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
