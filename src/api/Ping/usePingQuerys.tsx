import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";

interface usePingQuerysReturnProps {
  pingQuery: UseQueryResult<boolean, Error>;
}

const usePingQuerys = (): usePingQuerysReturnProps => {
  const pingQuery = useQuery<boolean, Error>({
    queryKey: ["ping"],
    queryFn: async (urls) => {
      return customAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/isMagazineUp/`, {
          urls: [URL_Contact, URL_Datenschutz, URL_Impressum],
        })
        .then((res) => {
          logger("usePingQuerys | pingQuery ✅ |", res.data);
          return res.data.up;
        });
    },
  });

  return { pingQuery };
};

export default usePingQuerys;
