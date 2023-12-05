import { customAxios } from "@/api/customAxios";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { RegisterOrganizationFormData } from "../RegisterOrganization";
import logger from "@/hooks/useLogger";

interface useRegisterOrganisationReturnProps {
  registerOrganizationMutation: UseMutationResult<
    string,
    Error,
    RegisterOrganizationFormData,
    unknown
  >;
}

const useRegisterOrganisation = (): useRegisterOrganisationReturnProps => {
  const registerOrganizationMutation = useMutation<
    string,
    Error,
    RegisterOrganizationFormData
  >({
    mutationFn: async (props) => {
      const {} = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/createNew`;
      return customAxios
        .post(apiUrl, { data: { content: {} } })
        .then((response) => {
          logger(
            "useRegisterOrganisation | registerOrganizationMutation ✅ |",
            response.data
          );
          return response.data.processID;
        });
    },
  });

  return { registerOrganizationMutation };
};

export default useRegisterOrganisation;
