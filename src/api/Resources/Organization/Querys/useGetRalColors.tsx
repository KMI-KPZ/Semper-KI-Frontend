import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

interface RalColor {
  RAL: string;
  Hex: string;
  RALName: string;
}

const useGetRalColors = (load: boolean) => {
  const getRalColors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/colors/getRALList/`
      )
      .then((response) => {
        const data: RalColor[] = response.data;

        logger("useGetRalColors | getRalColors ✅ |", response);
        return data;
      });

  return useQuery<RalColor[], Error>({
    queryKey: ["RalColors"],
    queryFn: getRalColors,
    staleTime: 1000 * 60, // 1 minute
    enabled: load,
  });
};

export default useGetRalColors;
