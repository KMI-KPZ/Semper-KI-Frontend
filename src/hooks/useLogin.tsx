import useLoginMutations from "@/api/Login/useLoginMutations";

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

const useLogin = (): useLoginReturnProps => {
  const { loginMutation, logoutMutation } = useLoginMutations();

  const login = (data: LoginMutationProps) => {
    loginMutation.mutate(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const mockedLogin = (userType: LoginUserType) => {
    loginMutation.mutate({ userType, register: false });
  };

  return { login, logout, mockedLogin };
};

export default useLogin;
