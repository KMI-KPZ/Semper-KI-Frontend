import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import { DashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";

const useGetAdminDashboardProject = () => {
  const { user } = useUser();
  const getAdminDashboardProject = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/admin/getAllProjectsFlatAsAdmin/`
      )
      .then((response) => {
        const responseData = response.data;
        const data: DashboardProject[] = responseData.map((project: any) => ({
          ...project,
          accessedWhen: new Date(project.accessedWhen),
          createdWhen: new Date(project.createdWhen),
          updatedWhen: new Date(project.updatedWhen),
        }));

        logger(
          "useGetAdminDashboardProject | getAdminDashboardProject ✅ |",
          response
        );
        return data;
      });

  return useQuery<DashboardProject[], Error>({
    queryKey: ["admin", "dashboardProject"],
    queryFn: getAdminDashboardProject,
    enabled: user.usertype === UserType.ADMIN,
  });
};

export default useGetAdminDashboardProject;
