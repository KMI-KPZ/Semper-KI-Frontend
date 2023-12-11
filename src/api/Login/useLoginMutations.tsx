import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { LoginMutationProps, MockedUserType } from "@/hooks/useLogin";
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
  loginMutation: UseMutationResult<string, Error, LoginMutationProps, unknown>;
  logoutMutation: UseMutationResult<string, Error, void, unknown>;
}

const useLoginMutations = (): useLoginMutationsReturnProps => {
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };

  const mockedLoginMutation = useMutation<string, Error, MockedUserType>({
    mutationFn: async (usertype) => {
      return customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/private/mockLogin/`, {
          headers: {
            Usertype: usertype,
          },
        })
        .then((response) => {
          logger("useLoginMutations | mockedLoginMutation |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const loginMutation = useMutation<string, Error, LoginMutationProps>({
    mutationFn: async (props) => {
      const { register, path, userType } = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return customAxios
        .get(apiUrl, {
          headers: {
            Usertype: userType,
            Path: path === undefined ? "/" : path,
            Register: register,
          },
        })
        .then((response) => {
          logger("useLoginMutations | loginMutation |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      window.location.href = `${data}${getReplacedSearchParam()}`;
    },
  });

  const logoutMutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/logout/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useLoginMutations | logoutMutation |", response);
        return response.data;
      });
    },
    onSuccess(data) {
      window.location.href = data;
    },
  });

  return { mockedLoginMutation, loginMutation, logoutMutation };
};

export default useLoginMutations;
