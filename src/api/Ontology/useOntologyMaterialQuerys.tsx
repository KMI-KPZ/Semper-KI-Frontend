import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";
import { OntoMaterialFlat } from "../../pages/Resources/types/types";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  materialsQuery: UseQueryResult<OntoMaterialFlat[], Error>;
  materialQuery: UseQueryResult<OntoMaterialFlat, Error>;
}

type UseOntoProps = {
  materialID?: string;
};

const useOntologyMaterialQuerys = (props: UseOntoProps): ReturnProps => {
  const { materialID = "" } = props;

  const materialsQuery = useQuery<OntoMaterialFlat[], Error>({
    queryKey: ["onto", "materials"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/onto/getMaterials/`)
        .then((res) => {
          logger("useOnto| getMaterials ✅ |", res.data);
          return res.data.materials;
        }),
  });

  const materialQuery = useQuery<OntoMaterialFlat, Error>({
    queryKey: ["onto", "material", materialID],
    queryFn: async () =>
      customAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getMaterial/`, {
          materialID,
        })
        .then((res) => {
          logger("useOnto| getMaterial ✅ |", materialID, res.data);
          return res.data;
        }),
    enabled: materialID !== "",
  });

  return { materialsQuery, materialQuery };
};

export default useOntologyMaterialQuerys;
