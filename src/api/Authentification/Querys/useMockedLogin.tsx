import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import { LoginUserType } from "./useLogin";

const useMockedLogin = () => {
  const mockedLogin = async (userType: LoginUserType) =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/auth/login/`, {
        headers: {
          userType,
        },
      })
      .then((response) => {
        logger("useMockedLogin | mockedLogin ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useMockedLogin | mockedLogin ❌ |", error);
      });

  return useMutation<string, Error, LoginUserType>({
    mutationFn: mockedLogin,
    onSuccess: (data) => {
      window.location.href = data;
    },
  });
};

export default useMockedLogin;
