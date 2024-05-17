import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";

const useGetAdminFlatProjects = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const getAdminFlatProjects = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/admin/getAllProjectsFlatAsAdmin/`
      )
      .then((response) => {
        const responseData = response.data;
        const data: FlatProject[] = responseData.map((project: any) => ({
          ...project,
          accessedWhen: new Date(project.accessedWhen),
          createdWhen: new Date(project.createdWhen),
          updatedWhen: new Date(project.updatedWhen),
        }));

        logger("useGetAdminFlatProjects | getAdminFlatProjects ✅ |", response);
        return data;
      });

  return useQuery<FlatProject[], Error>({
    queryKey: ["admin", "flatProjects"],
    queryFn: getAdminFlatProjects,
    enabled: user.usertype === UserType.ADMIN,
  });
};

export default useGetAdminFlatProjects;
