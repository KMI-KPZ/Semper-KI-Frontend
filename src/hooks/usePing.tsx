import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";

interface ReturnProps {
  pingQuery: UseQueryResult<{ up: boolean }, Error>;
}

const usePing = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();

  const sliceURLs = (urls: string[]): string[] => {
    return urls.map((url) => url.slice(8, -1));
  };

  const pingQuery = useQuery<{ up: boolean }, Error>({
    queryKey: ["ping"],
    queryFn: async () =>
      axiosCustom
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/isMagazineUp/`, {
          urls: sliceURLs([URL_Impressum, URL_Datenschutz, URL_Contact]),
        })
        .then((res) => {
          console.log("usePing | isMagazineUp ✅ |", res.data);
          return res.data;
        }),
  });

  return { pingQuery };
};

export default usePing;
