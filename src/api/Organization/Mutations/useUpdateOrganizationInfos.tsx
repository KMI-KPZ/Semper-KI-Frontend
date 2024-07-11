import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateOrgaInfoProps {
  email: string;
  address: string;
  taxID: string;
  name: string;
  supportedServices: number[];
}

const useUpdateOrganizationInfos = () => {
  const queryClient = useQueryClient();
  const updateOrgaInfo = async ({
    name,
    email,
    address: adress,
    taxID,
    supportedServices,
  }: UpdateOrgaInfoProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/organizations/update/`, {
        data: {
          content: {
            supportedServices,
            details: { email, adress, taxID },
          },
        },
      })
      .then((response) => {
        logger("useUpdateOrganizationInfos | updateOrgaInfo ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateOrganizationInfos | updateOrgaInfo ❌ |", error);
      });

  return useMutation<void, Error, UpdateOrgaInfoProps>({
    mutationFn: updateOrgaInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "info"]);
    },
  });
};

export default useUpdateOrganizationInfos;
