import logger from "@/hooks/useLogger";
import { useQuery } from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";

const useGetIsLoggedIn = () => {
  const getIsLoggedIn = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/auth/isLoggedIn/`)
      .then((response) => {
        logger("useGetIsUserLoggedIn | isLoggedIn ✅ |", response.data);
        return response.data === "Success" ? true : false;
      });

  return useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: getIsLoggedIn,
  });
};

export default useGetIsLoggedIn;
