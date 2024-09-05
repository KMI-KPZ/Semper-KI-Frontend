import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const useSetUserLocal = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  const setUserLocal = async (lngCode: string) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/localeOfUser/set/`, {
        locale: lngCode,
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
    onSuccess: (_, props) => {
      i18n.changeLanguage(props);
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useSetUserLocal;
