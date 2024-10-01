import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface AdminDashboard {
  totalProjects: number;
  newProjects: number;
  totalUsers: number;
  newUsers: number;
  totalOrganizations: number;
  newOrganizations: number;
  totalResources: number;
  newResources: number;
}

const useGetAdminDashboard = () => {
  const getAdminDashboard = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getAdminDashboard/`)
      .then((response) => {
        const data: AdminDashboard = {
          ...response.data,
        };

        logger("useGetAdminDashboard | getAdminDashboard ✅ |", response);
        return data;
      });

  return useQuery<AdminDashboard, Error>({
    queryKey: ["admin", "dashboard"],
    queryFn: getAdminDashboard,
  });
};

export default useGetAdminDashboard;
