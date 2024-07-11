import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoPrinterFlat } from "@/pages/Resources/types/types";

const useGetFlatOntologyPrinters = () => {
  const queryClient = useQueryClient();
  const getFlatOntoPrinters = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinters/`)
      .then((response) => {
        const responseData = response.data;
        const printers: OntoPrinterFlat[] = responseData.printers;

        logger("useGetOntologyPrinters | getOntoPrinters ✅ |", response);
        return printers;
      });

  return useQuery<OntoPrinterFlat[], Error>({
    queryKey: ["onto", "printers"],
    queryFn: getFlatOntoPrinters,
  });
};

export default useGetFlatOntologyPrinters;
