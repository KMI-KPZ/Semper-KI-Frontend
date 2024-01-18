import { AuthorizedUserProps, UserProps, UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { OrganizationProps } from "@/pages/Admin/hooks/useAdmin";
import useAdminQuerys from "@/api/Admin/useAdminQuerys";
import { LoadingAnimation } from "@component-library/index";
import { FlatProjectProps } from "@/api/Project/useFlatProjectQuerys";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

interface Props {}

export type AdminContext = {
  users: AuthorizedUserProps[];
  organizations: OrganizationProps[];
  flatProjects: FlatProjectProps[];
};

export const AdminContext = createContext<AdminContext>({
  users: [],
  organizations: [],
  flatProjects: [],
});

export const AdminRouteOutlet: React.FC<Props> = (props) => {
  const { user } = useAuthorizedUser();
  const { t } = useTranslation();
  const { adminQuery, adminFlatProjectsQuery: adminProjectsQuery } =
    useAdminQuerys();

  if (user.usertype !== UserType.ADMIN) return <Error />;

  if (adminQuery.isLoading || adminProjectsQuery.isLoading)
    return <LoadingAnimation />;

  if (
    adminQuery.isFetched &&
    adminQuery.data !== undefined &&
    adminProjectsQuery.isFetched &&
    adminProjectsQuery.data !== undefined
  )
    return (
      <AdminContext.Provider
        value={{
          flatProjects: adminProjectsQuery.data,
          organizations: adminQuery.data.organizations,
          users: adminQuery.data.user,
        }}
      >
        <Outlet />
      </AdminContext.Provider>
    );

  return <Navigate to="/" />;
};
