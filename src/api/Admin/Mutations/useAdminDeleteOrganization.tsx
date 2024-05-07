import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface AdminDeleteOrgaProps {}

const useAdminDeleteOrganization = () => {
  const queryClient = useQueryClient();
  const deleteOrganization = async (data: AdminDeleteOrgaProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/deleteOrganization/`, {
        data,
      })
      .then((response) => {
        logger(
          "useAdminDeleteOrganization | deleteOrganization ✅ |",
          response
        );
        return response.data;
      })
      .catch((error) => {
        logger("useAdminDeleteOrganization | deleteOrganization ❌ |", error);
      });

  return useMutation<void, Error, AdminDeleteOrgaProps>({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin"]);
    },
  });
};

export default useAdminDeleteOrganization;
