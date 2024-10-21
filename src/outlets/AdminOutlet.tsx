import { UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminUserProps } from "@/pages/Admin/hooks/useAdmin";
import { LoadingAnimation } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetAdminFlatProjects from "@/api/Admin/Querys/useGetAdminFlatProjects";
import useGetAdminData from "@/api/Admin/Querys/useGetAdminData";
import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";

interface Props {}

export type AdminContext = {
  users: AdminUserProps[];
  organizations: Organization[];
  flatProjects: FlatProject[];
};

export const AdminContext = createContext<AdminContext>({
  users: [],
  organizations: [],
  flatProjects: [],
});

export const AdminOutlet: React.FC<Props> = (props) => {
  const {} = props;
  const { user } = useAuthorizedUser();
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
