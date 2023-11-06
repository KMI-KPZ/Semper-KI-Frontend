import { UserContext } from "@/contexts/UserContextProvider";
import { UserType } from "@/hooks/UseUser";
import { Error } from "@/pages/Error/Error";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthorizedUserContext } from "./AuthorizedUserOutlet";

interface Props {}

export const OrganizationOutlet: React.FC<Props> = (props) => {
  const { user } = useContext(AuthorizedUserContext);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return user.usertype === UserType.ORGANIZATION ? (
    <Outlet />
  ) : (
    <Error text={t("Outlets.UserOutlets.error.organization")} />
  );
};
