import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";
import { OntoMaterialFlat, OntoPrinterFlat } from "../types/types";

interface ReturnProps {
  printersQuery: UseQueryResult<OntoPrinterFlat[], Error>;
  printerQuery: UseQueryResult<OntoPrinterFlat, Error>;
  materialsQuery: UseQueryResult<OntoMaterialFlat[], Error>;
  materialQuery: UseQueryResult<OntoMaterialFlat, Error>;
}

type UseOntoProps = {
  materialID?: string;
  printerID?: string;
};

const useOnto = (props: UseOntoProps): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { materialID = "", printerID = "" } = props;

  const printersQuery = useQuery<OntoPrinterFlat[], Error>({
    queryKey: ["onto", "printers"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getPrinters/`)
        .then((res) => {
          console.log("useOnto| getPrinters ✅ |", res.data);
          return res.data;
        }),
  });

  const printerQuery = useQuery<OntoPrinterFlat, Error>({
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

  const materialsQuery = useQuery<OntoMaterialFlat[], Error>({
    queryKey: ["onto", "materials"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getMaterials/`)
        .then((res) => {
          console.log("useOnto| getMaterials ✅ |", res.data);
          return res.data.materials;
        }),
  });

  const materialQuery = useQuery<OntoMaterialFlat, Error>({
    queryKey: ["onto", "material", materialID],
    queryFn: async () =>
      axiosCustom
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/onto/getMaterial/`, {
          materialID,
        })
        .then((res) => {
          console.log("useOnto| getMaterial ✅ |", materialID, res.data);
          return res.data;
        }),
    enabled: materialID !== "",
  });

  return { printersQuery, printerQuery, materialsQuery, materialQuery };
};

export default useOnto;
