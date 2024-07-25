import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";
import { getAuthorizedUserType } from "@/services/utils";
import {
  AuthorizedUserProps,
  OrgaNotificationSetting,
  OrgaNotificationSettingsType,
  UserAddressProps,
  UserNotificationSetting,
  UserNotificationSettingsType,
} from "@/hooks/useUser";
import { useTranslation } from "react-i18next";

const useGetUser = (useUserIsLoggedInQuery: UseQueryResult<boolean, Error>) => {
  const { i18n } = useTranslation();

  const fetchUser = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/profile/user/get/`)
      .then((response) => {
        const userData = response.data;
        const addresses: UserAddressProps[] =
          userData.details.addresses !== undefined
            ? userData.details.addresses
            : userData.details.address
            ? [userData.details.address]
            : [];
        const userNotificationSettings: UserNotificationSetting[] =
          userData.details.notificationSettings !== undefined &&
          userData.details.notificationSettings.user !== undefined
            ? Object.keys(userData.details.notificationSettings.user).map(
                (key: string) => {
                  return {
                    type: key as UserNotificationSettingsType,
                    event:
                      userData.details.notificationSettings.user[key].event,
                    email:
                      userData.details.notificationSettings.user[key].email,
                  };
                }
              )
            : [];

        const orgaNotificationSettings: OrgaNotificationSetting[] =
          userData.details.notificationSettings !== undefined &&
          userData.details.notificationSettings.organization !== undefined
            ? Object.keys(
                userData.details.notificationSettings.organization
              ).map((key: string) => {
                return {
                  type: key as OrgaNotificationSettingsType,
                  event:
                    userData.details.notificationSettings.organization[key]
                      .event,
                  email:
                    userData.details.notificationSettings.organization[key]
                      .email,
                };
              })
            : [];

        const newUser: AuthorizedUserProps = {
          hashedID: userData.hashedID,
          name: userData.name,
          organization: userData.organization,
          details: {
            ...userData.details,
            addresses,
            notificationSettings: {
              user: userNotificationSettings,
              organization: orgaNotificationSettings,
            },
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
