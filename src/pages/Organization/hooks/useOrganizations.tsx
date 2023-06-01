import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface useOrganizationsReturnProps {
  organizationUserQuery: UseQueryResult<OrganizationsUser[], Error>;
  organizationRolesQuery: UseQueryResult<OrganizationRoleProps[], Error>;
  inviteLinkMutation: UseMutationResult<any, Error, string, unknown>;
  inviteUserMutation: UseMutationResult<any, Error, string, unknown>;
}

export type OrganizationsUser = {
  email: string;
  name: string;
  picture: string;
};

export type OrganizationRoleProps = {
  name: string;
};

const useOrganizations = (): useOrganizationsReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();
  const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/organizations/`;

  const organizationUserQuery = useQuery<OrganizationsUser[], Error>({
    queryKey: ["organizations", "users"],
    queryFn: async () =>
      axiosCustom
        .post(apiUrl, { data: { intent: "fetchUsers" } })
        .then((res) => {
          console.log("useOrganizations | fetchUsers ✅ |", res.data);
          return res.data;
        }),
  });

  const organizationRolesQuery = useQuery<OrganizationRoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: async () =>
      axiosCustom.post(apiUrl, { data: { intent: "getRoles" } }).then((res) => {
        console.log("useOrganizations | getRoles ✅ |", res.data);
        return res.data;
      }),
  });

  const inviteLinkMutation = useMutation<any, Error, string>({
    mutationFn: async (email: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: { intent: "getInviteLink", content: { email: email } },
        })
        .then((response) => {
          console.log("useOrganizations | getInviteLink ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations"]);
    },
  });

  const inviteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: { intent: "addUser", content: { email: email } },
        })
        .then((response) => {
          console.log("useOrganizations | addUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations"]);
    },
  });

  return {
    organizationRolesQuery,
    organizationUserQuery,
    inviteLinkMutation,
    inviteUserMutation,
  };
};

export default useOrganizations;
