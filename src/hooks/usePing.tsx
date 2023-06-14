import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface ReturnProps {
  pingQuery: UseQueryResult<{ up: boolean }, Error>;
}

const usePing = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();

  const pingQuery = useQuery<{ up: boolean }, Error>({
    queryKey: ["ping"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/isMagazineUp/`)
        .then((res) => {
          console.log("usePing | isMagazineUp ✅ |", res.data);
          return res.data;
        }),
  });

  return { pingQuery };
};

export default usePing;
