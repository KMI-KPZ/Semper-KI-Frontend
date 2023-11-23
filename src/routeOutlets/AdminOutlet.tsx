import { UserContext } from "@/contexts/UserContextProvider";
import { UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { AuthorizedUserContext } from "./AuthorizedUserOutlet";

interface Props {}

export const AdminRouteOutlet: React.FC<Props> = (props) => {
  const { user } = useContext(AuthorizedUserContext);
  const { t } = useTranslation();
  return user.usertype === UserType.ADMIN ? <Outlet /> : <Error />;
};
