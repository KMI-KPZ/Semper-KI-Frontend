import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";
import { getAuthorizedUserType } from "@/services/utils";
import { AuthorizedUserProps, UserAddressProps } from "@/hooks/useUser";

const useGetUser = (useUserIsLoggedInQuery: UseQueryResult<boolean, Error>) => {
  const fetchUser = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getUser/`)
      .then((response) => {
        const userData = response.data;
        const addresses: UserAddressProps[] =
          userData.details.addresses !== undefined
            ? userData.details.addresses
            : userData.details.address
            ? [userData.details.address]
            : [];
        const newUser: AuthorizedUserProps = {
          hashedID: userData.hashedID,
          name: userData.name,
          organization: userData.organization,
          details: {
            email: userData.details.email,
            addresses,
          },
          accessedWhen: new Date(userData.accessedWhen),
          createdWhen: new Date(userData.createdWhen),
          updatedWhen: new Date(userData.updatedWhen),
          lastSeen: new Date(userData.lastSeen),
          usertype: getAuthorizedUserType(userData.usertype),
        };
        logger("useUser | getUser ✅ |", newUser);
        return newUser;
      });

  return useQuery<AuthorizedUserProps, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled:
      useUserIsLoggedInQuery.isFetched &&
      useUserIsLoggedInQuery.data !== undefined &&
      useUserIsLoggedInQuery.data === true,
  });
};

export default useGetUser;
