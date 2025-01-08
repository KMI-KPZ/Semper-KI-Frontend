import { UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingAnimation } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetAdminData from "@/api/Admin/Querys/useGetAdminData";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { AdminDataUser } from "@/hooks/useAdmin";
import useGetAdminDashboardProject from "@/api/Admin/Querys/useGetAdminFlatProjects";

interface Props {}

export type AdminContext = {
  users: AdminDataUser[];
  organizations: Organization[];
  dashboardProject: FlatDashboardProject[];
};

export const AdminContext = createContext<AdminContext>({
  users: [],
  organizations: [],
  dashboardProject: [],
});

export const AdminOutlet: React.FC<Props> = (props) => {
  const {} = props;
  const { user } = useAuthorizedUser();
  const adminDashboardProjectQuery = useGetAdminDashboardProject();
  const adminQuery = useGetAdminData();

  if (user.usertype !== UserType.ADMIN) return <Error />;

  if (adminQuery.isLoading || adminDashboardProjectQuery.isLoading)
    return <LoadingAnimation />;

  if (
    adminQuery.isFetched &&
    adminQuery.data !== undefined &&
    adminDashboardProjectQuery.isFetched &&
    adminDashboardProjectQuery.data !== undefined
  )
    return (
      <AdminContext.Provider
        value={{
          dashboardProject: adminDashboardProjectQuery.data,
          organizations: adminQuery.data.organizations,
          users: adminQuery.data.user,
        }}
      >
        <Outlet />
      </AdminContext.Provider>
    );

  return <Navigate to="/" />;
};
