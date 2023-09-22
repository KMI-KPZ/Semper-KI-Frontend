import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { UserProps } from "@/hooks/useUser/types";
import { SubOrderProps } from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { OrderDetailsProps, OrderState } from "@/pages/Order/hooks/useOrder";
import { FlatOrderProps } from "@/pages/Orders/hooks/useFlatOrders";
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
  adminOrdersQuery: UseQueryResult<AdminFlatOrderProps[], Error>;
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

export interface AdminFlatOrderProps {
  accessed: Date;
  client: string;
  clientName: string;
  created: Date;
  details: OrderDetailsProps;
  orderCollectionID: string;
  status: OrderState;
  subOrderCount: number;
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

  const adminOrdersQuery = useQuery<AdminFlatOrderProps[], Error>({
    queryKey: ["admin, flatOrders"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getOrdersFlat/`)
        .then((res) => {
          logger("useAdmin | adminOrdersQuery ✅ |", res.data);
          return res.data.map((order: any) => ({
            ...order,
            accessed: new Date(order.accessed),
            created: new Date(order.created),
            updated: new Date(order.updated),
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

  return { adminQuery, deleteUser, deleteOrganization, adminOrdersQuery };
};

export default useAdmin;
