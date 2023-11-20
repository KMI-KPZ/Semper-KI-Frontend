import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";
import logger from "@/hooks/useLogger";
import useCRSFToken from "./useCSRFToken";
import { customAxios } from "@/api/customAxios";

interface ReturnProps {
  isMagazineUp(): boolean;
}

const usePing = (): ReturnProps => {
  // const sliceURLs = (urls: string[]): string[] => {
  //   return urls.map((url) => url.slice(8, -1));
  // };
  const { CSRFTokenIsLoaded } = useCRSFToken();

  const pingQuery = useQuery<{ up: boolean }, Error>({
    queryKey: ["ping"],
    queryFn: async () =>
      customAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/isMagazineUp/`, {
          urls: [URL_Impressum, URL_Datenschutz, URL_Contact],
        })
        .then((res) => {
          logger("usePing | isMagazineUp ✅ |", res.data);
          return res.data;
        }),
    enabled: CSRFTokenIsLoaded() === true,
  });

  const isMagazineUp = (): boolean => {
    return (
      pingQuery.isFetched &&
      pingQuery.data !== undefined &&
      pingQuery.data.up === true
    );
  };

  return { isMagazineUp };
};

export default usePing;
