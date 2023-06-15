import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";
import { OntoPrinter, OntoPrinterFlat } from "../types/types";

interface ReturnProps {
  printersQuery: UseQueryResult<OntoPrinterFlat[], Error>;
  printerQuery: UseQueryResult<OntoPrinter, Error>;
}

type UseOntoProps = {
  printerID?: string;
};

const useOntoPrinters = (props: UseOntoProps): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { printerID = "" } = props;

  const printersQuery = useQuery<OntoPrinterFlat[], Error>({
    queryKey: ["onto", "printers"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getPrinters/`)
        .then((res) => {
          console.log("useOnto| getPrinters ✅ |", res.data);
          return res.data.printers;
        }),
  });

  const printerQuery = useQuery<OntoPrinter, Error>({
    queryKey: ["onto", "printer", printerID],
    queryFn: async () =>
      axiosCustom
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
          printerID,
        })
        .then((res) => {
          console.log("useOnto| getPrinter ✅ |", printerID, res.data);
          return res.data;
        }),
    enabled: printerID !== "",
  });

  return { printersQuery, printerQuery };
};

export default useOntoPrinters;
