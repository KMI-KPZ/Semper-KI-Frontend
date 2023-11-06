import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { UserProps } from "@/hooks/useUser";
import { FlatProjectProps } from "@/pages/Projects/hooks/useFlatProjects";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { ProjectDetailsProps } from "@/pages/Projects/hooks/useProject";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

interface ReturnProps {
  adminQuery: UseQueryResult<AdminProps, Error>;
  deleteUser: UseMutationResult<any, Error, DeleteUserProps, unknown>;
  deleteOrganization: UseMutationResult<any, Error, DeleteUserProps, unknown>;
  adminProjectsQuery: UseQueryResult<AdminFlatProjectProps[], Error>;
}

interface DeleteUserProps {
  hashedID: string;
  name: string;
}

interface AdminProps {
  user: UserProps[];
  organizations: OrganizationProps[];
}

export interface OrganizationProps {
  hashedID: string;
  name: string;
  canManufacture: boolean;
  details: any;
  created: Date;
  updated: Date;
  accessed: Date;
}

export interface AdminFlatProjectProps {
  accessed: Date;
  client: string;
  clientName: string;
  created: Date;
  details: ProjectDetailsProps;
  projectCollectionID: string;
  status: ProcessStatus;
  processCount: number;
  updated: Date;
}

const useAdmin = (): ReturnProps => {
  const queryClient = useQueryClient();

  const adminQuery = useQuery<AdminProps, Error>({
    queryKey: ["admin"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getAll/`)
        .then((res) => {
          logger("useAdmin | adminQuery ✅ |", res.data);
          return res.data;
        }),
  });

  const adminProjectsQuery = useQuery<AdminFlatProjectProps[], Error>({
    queryKey: ["admin, flatProjects"],
    queryFn: async () =>
      getCustomAxios()
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

  const deleteUser = useMutation<any, Error, DeleteUserProps>({
    mutationFn: async ({ hashedID, name }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/admin/deleteUser/`;
      return getCustomAxios()
        .delete(url, {
          data: {
            hashedID,
            name,
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["admin"]);
    },
  });

  const deleteOrganization = useMutation<any, Error, DeleteUserProps>({
    mutationFn: async ({ hashedID, name }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/admin/deleteOrganization/`;
      return getCustomAxios()
        .delete(url, {
          data: {
            hashedID,
            name,
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteOrganization ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["admin"]);
    },
  });

  return { adminQuery, deleteUser, deleteOrganization, adminProjectsQuery };
};

export default useAdmin;
