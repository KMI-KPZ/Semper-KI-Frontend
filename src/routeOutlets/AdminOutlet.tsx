import { AuthorizedUserProps, UserProps, UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { OrganizationProps } from "@/pages/Admin/hooks/useAdmin";
import { LoadingAnimation } from "@component-library/index";
import { FlatProjectProps } from "@/api/Project/useFlatProjectQuerys";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetAdminFlatProjects from "@/api/Admin/Querys/useGetAdminFlatProjects";
import useGetAdminData from "@/api/Admin/Querys/useGetAdminData";

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
  const adminFlatProjectsQuery = useGetAdminFlatProjects();
  const adminQuery = useGetAdminData();

  if (user.usertype !== UserType.ADMIN) return <Error />;

  if (adminQuery.isLoading || adminFlatProjectsQuery.isLoading)
    return <LoadingAnimation />;

  if (
    adminQuery.isFetched &&
    adminQuery.data !== undefined &&
    adminFlatProjectsQuery.isFetched &&
    adminFlatProjectsQuery.data !== undefined
  )
    return (
      <AdminContext.Provider
        value={{
          flatProjects: adminFlatProjectsQuery.data,
          organizations: adminQuery.data.organizations,
          users: adminQuery.data.user,
        }}
      >
        <Outlet />
      </AdminContext.Provider>
    );

  return <Navigate to="/" />;
};
