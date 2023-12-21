import { UserContext } from "@/contexts/UserContextProvider";
import { UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

interface Props {}

export const OrganizationRouteOutlet: React.FC<Props> = (props) => {
  const { user } = useAuthorizedUser();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return user.usertype === UserType.ORGANIZATION ? (
    <Outlet />
  ) : (
    <Error text={t("Outlets.UserOutlets.error.organization")} />
  );
};
