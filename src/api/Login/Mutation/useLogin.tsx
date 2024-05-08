import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useLocation } from "react-router-dom";

interface useLoginReturnProps {
  login: (data: LoginMutationProps) => void;
  mockedLogin: (userType: LoginUserType) => void;
  logout: () => void;
}

export interface LoginMutationProps {
  userType: LoginUserType;
  register: boolean;
  path?: string;
  redirect?: string;
}

export type LoginUserType =
  | "user"
  | "organization"
  | "admin"
  | "fakeUser"
  | "fakeOrganization"
  | "fakeAdmin";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };

  const login = async (data: LoginMutationProps) =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/login/`, {
        headers: {
          Usertype: data.userType,
          Path: data.path === undefined ? "/" : data.path,
          Register: data.register,
        },
      })
      .then((response) => {
        logger("useLogin | login ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useLogin | login ❌ |", error);
      });

  return useMutation<string, Error, LoginMutationProps>({
    mutationFn: login,
    onSuccess(data) {
      window.location.href = `${data}${getReplacedSearchParam()}${
        redirect !== undefined ? `&${redirect}` : ""
      }`;
    },
  });
};

export default useLogin;
