import logger from "@/hooks/useLogger";
import { useQuery } from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";

const useGetUserIsLoggedIn = () => {
  const fetchIsLoggedIn = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/isLoggedIn/`)
      .then((response) => {
        logger("useUser | isLoggedIn ✅ |", response.data);
        return response.data === "Success" ? true : false;
      });

  return useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: fetchIsLoggedIn,
  });
};

export default useGetUserIsLoggedIn;
