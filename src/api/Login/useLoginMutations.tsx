import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { LoginMutationProps, LoginUserType } from "@/hooks/useLogin";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { redirect, useLocation } from "react-router-dom";

interface useLoginMutationsReturnProps {
  loginMutation: UseMutationResult<string, Error, LoginMutationProps, unknown>;
  logoutMutation: UseMutationResult<string, Error, void, unknown>;
  mockedLoginMutation: UseMutationResult<string, Error, LoginUserType, unknown>;
}

const useLoginMutations = (): useLoginMutationsReturnProps => {
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };

  const loginMutation = useMutation<string, Error, LoginMutationProps>({
    mutationFn: async (props) => {
      const { register, path, userType, redirect } = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return authorizedCustomAxios
        .get(apiUrl, {
          headers: {
            Usertype: userType,
            Path: path === undefined ? "/" : path,
            Register: register,
          },
        })
        .then((response) => {
          logger("useLoginMutations | loginMutation |", response.data);
          return response.data;
        });
    },
    onSuccess(data) {
      window.location.href = `${data}${getReplacedSearchParam()}${
        redirect !== undefined ? `&${redirect}` : ""
      }`;
    },
  });

  const mockedLoginMutation = useMutation<string, Error, LoginUserType>({
    mutationFn: async (UserType) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return authorizedCustomAxios
        .get(apiUrl, {
          headers: {
            UserType,
          },
        })
        .then((response) => {
          logger("useLoginMutations | mockedLoginMutation |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      window.location.href = data;
    },
  });

  const logoutMutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/logout/`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        logger("useLoginMutations | logoutMutation |", response);
        return response.data;
      });
    },
    onSuccess(data) {
      window.location.href = data;
    },
  });

  return { loginMutation, logoutMutation, mockedLoginMutation };
};

export default useLoginMutations;
