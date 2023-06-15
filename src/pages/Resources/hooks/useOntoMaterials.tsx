import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";
import { OntoMaterialFlat } from "../types/types";

interface ReturnProps {
  materialsQuery: UseQueryResult<OntoMaterialFlat[], Error>;
  materialQuery: UseQueryResult<OntoMaterialFlat, Error>;
}

type UseOntoProps = {
  materialID?: string;
};

const useOntoMaterials = (props: UseOntoProps): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { materialID = "" } = props;

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

  return { materialsQuery, materialQuery };
};

export default useOntoMaterials;
