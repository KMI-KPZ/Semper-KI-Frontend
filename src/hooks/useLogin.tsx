import useLoginMutations from "@/api/Login/useLoginMutations";

interface useLoginReturnProps {
  login: (data: LoginMutationProps) => void;
  mockedLogin: (userType: MockedUserType) => void;
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

export type MockedUserType = "user" | "organization" | "admin";

const useLogin = (): useLoginReturnProps => {
  const { loginMutation, logoutMutation, mockedLoginMutation } =
    useLoginMutations();

  const login = (data: LoginMutationProps) => {
    loginMutation.mutate(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const mockedLogin = (userType: MockedUserType) => {
    mockedLoginMutation.mutate(userType);
  };

  return { login, logout, mockedLogin };
};

export default useLogin;
