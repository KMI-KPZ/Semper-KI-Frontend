import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";
import {
  ExistingOntoPrinter,
  OntoPrinter,
  OntoPrinterFlat,
  OntoPrinterProperty,
} from "../../pages/Resources/types/types";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  printersQuery: UseQueryResult<OntoPrinterFlat[], Error>;
  printerQuery: UseQueryResult<OntoPrinter, Error>;
  printerMutation: UseMutationResult<
    OntoPrinterProperty[],
    Error,
    string,
    unknown
  >;
}

type UseOntoProps = {
  printerID?: string;
};

const useOntologyPrinterQuerys = (props: UseOntoProps): ReturnProps => {
  const { printerID = "" } = props;

  const printersQuery = useQuery<OntoPrinterFlat[], Error>({
    queryKey: ["onto", "printers"],
    queryFn: async () =>
      authorizedCustomAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinters/`)
        .then((res) => {
          logger("useOnto| getPrinters ✅ |", res.data);
          return res.data.printers;
        }),
  });

  const printerQuery = useQuery<ExistingOntoPrinter, Error>({
    queryKey: ["onto", "printer", printerID],
    queryFn: async () =>
      authorizedCustomAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
          printerID,
        })
        .then((res) => {
          logger("useOnto| getPrinter ✅ |", printerID, res.data);
          return res.data.map(
            (printer: any): ExistingOntoPrinter => ({
              ...printer,
              type: "existing",
            })
          );
        }),
    enabled: printerID !== "",
  });

  const printerMutation = useMutation<OntoPrinterProperty[], Error, string>({
    mutationFn: async (printerID: string) =>
      authorizedCustomAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
          printer: printerID,
        })
        .then((res) => {
          // logger("useOnto| getPrinter ✅ |", printerID, res.data);
          return res.data.properties.flatMap((object: Object) => {
            if (typeof object === "string") return { name: object };
            // logger("object", Object.keys(object), Object.values(object));
            return {
              name: "Eigneschnaft",
              values: ["nischt", "good"],
            };
          });
        }),
  });

  return { printersQuery, printerQuery, printerMutation };
};

export default useOntologyPrinterQuerys;
