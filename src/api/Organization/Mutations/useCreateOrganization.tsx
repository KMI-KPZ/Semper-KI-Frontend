import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateOrganizationFormData = {
  email: string;
  display_name: string;
};

const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  const createOrganization = async (props: CreateOrganizationFormData) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/organizations/create/`, {
        data: { content: props },
      })
      .then((response) => {
        logger("useCreateOrganization | createOrganization ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateOrganization | createOrganization ❌ |", error);
      });

  return useMutation<void, Error, CreateOrganizationFormData>({
    mutationFn: createOrganization,
    onSuccess: () => {
      //   queryClient.invalidateQueries([key]);
    },
  });
};

export default useCreateOrganization;
