import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

interface useLoginMutationsReturnProps {
  mockedLoginMutation: UseMutationResult<
    string,
    Error,
    MockedUserType,
    unknown
  >;
}

export type MockedUserType = "user" | "organization" | "admin";

const useLoginMutations = (): useLoginMutationsReturnProps => {
  const queryClient = useQueryClient();

  const mockedLoginMutation = useMutation<string, Error, MockedUserType>({
    mutationFn: async (usertype) => {
      return customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/private/mockLogin/`, {
          headers: {
            Usertype: usertype,
          },
        })
        .then((response) => {
          logger("useDevMode | mockedLoginMutation |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["user"]);
      // window.location.href = `${data}${getReplacedSearchParam()}`;
    },
  });

  return { mockedLoginMutation };
};

export default useLoginMutations;
