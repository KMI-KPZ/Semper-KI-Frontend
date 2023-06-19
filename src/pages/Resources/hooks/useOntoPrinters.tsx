import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";
import {
  OntoPrinter,
  OntoPrinterFlat,
  OntoPrinterProperty,
} from "../types/types";

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

  const printerMutation = useMutation<OntoPrinterProperty[], Error, string>({
    mutationFn: async (printerID: string) =>
      axiosCustom
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
          printer: printerID,
        })
        .then((res) => {
          // console.log("useOnto| getPrinter ✅ |", printerID, res.data);
          return res.data.properties.flatMap((object: Object) => {
            if (typeof object === "string") return { name: object };
            console.log("object", Object.keys(object), Object.values(object));
            return {
              name: "Eigneschnaft",
              values: ["nischt", "good"],
            };
          });
        }),
  });

  return { printersQuery, printerQuery, printerMutation };
};

export default useOntoPrinters;
