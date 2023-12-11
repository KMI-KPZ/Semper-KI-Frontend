import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  AdminFlatProjectProps,
  AdminProps,
} from "@/pages/Admin/hooks/useAdmin";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface useAdminQuerysReturnProps {
  adminQuery: UseQueryResult<AdminProps, Error>;
  adminProjectsQuery: UseQueryResult<AdminFlatProjectProps[], Error>;
}

const useAdminQuerys = (): useAdminQuerysReturnProps => {
  const adminQuery = useQuery<AdminProps, Error>({
    queryKey: ["admin"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getAll/`)
        .then((res) => {
          logger("useAdmin | adminQuery ✅ |", res.data);
          return res.data;
        }),
  });

  const adminProjectsQuery = useQuery<AdminFlatProjectProps[], Error>({
    queryKey: ["admin, flatProjects"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getProjectsFlat/`)
        .then((res) => {
          logger("useAdmin | adminProjectsQuery ✅ |", res.data);
          return res.data.map((project: any) => ({
            ...project,
            accessed: new Date(project.accessed),
            created: new Date(project.created),
            updated: new Date(project.updated),
          }));
        }),
  });

  return { adminProjectsQuery, adminQuery };
};

export default useAdminQuerys;
