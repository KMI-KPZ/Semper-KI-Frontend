import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";

const useIsMagazinUp = () => {
  const queryClient = useQueryClient();
  const isMagazinUp = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/isMagazinUp/`, {
        urls: [URL_Contact, URL_Datenschutz, URL_Impressum],
      })
      .then((response) => {
        const responseData = response.data;
        const isUp: boolean = responseData.up;

        logger("useIsMagazinUp | isMagazinUp ✅ |", response);
        return isUp;
      });

  return useQuery<boolean, Error>({
    queryKey: ["ping"],
    queryFn: isMagazinUp,
    enabled: false,
  });
};

export default useIsMagazinUp;
