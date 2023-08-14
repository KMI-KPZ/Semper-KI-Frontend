import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { User } from "@/hooks/useUser/types";
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
}

interface DeleteUserProps {
  hashedID: string;
  name: string;
}

interface AdminProps {
  user: User[];
  organisations: OrganizationProps[];
}

export interface OrganizationProps {
  hashedID: string;
  name: string;
  canManufacturer: boolean;
  details: any;
  created: Date;
  updated: Date;
  accessed: Date;
}

const useAdmin = (): ReturnProps => {
  const queryClient = useQueryClient();

  const adminQuery = useQuery<AdminProps, Error>({
    queryKey: ["admin"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/admin/getAll/`)
        .then((res) => {
          logger("useAdmin | adminQuery ✅ |", res.data);
          return res.data;
        }),
  });

  const deleteUser = useMutation<any, Error, DeleteUserProps>({
    mutationFn: async ({ hashedID, name }) => {
      const url = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/admin/deleteUser/`;
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
      const url = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/admin/deleteOrganization/`;
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

  return { adminQuery, deleteUser, deleteOrganization };
};

export default useAdmin;
