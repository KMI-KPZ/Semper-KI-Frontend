import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type RegisterOrganizationFormData = {
  email: string;
  display_name: string;
};

const useRegisterOrganization = () => {
  const queryClient = useQueryClient();
  const registerOrganization = async (props: RegisterOrganizationFormData) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/createNew/`,
        {
          data: { content: props },
        }
      )
      .then((response) => {
        logger("useRegisterOrganization | registerOrganization ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useRegisterOrganization | registerOrganization ❌ |", error);
      });

  return useMutation<void, Error, RegisterOrganizationFormData>({
    mutationFn: registerOrganization,
    onSuccess: () => {
      //   queryClient.invalidateQueries([key]);
    },
  });
};

export default useRegisterOrganization;
