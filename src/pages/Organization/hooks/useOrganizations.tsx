import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface useOrganizationsReturnProps {
  organizationUserQuery: UseQueryResult<string, Error>;
  inviteLinkQuery: UseQueryResult<string, Error>;
  inviteUserMutation: UseMutationResult<any, Error, string, unknown>;
}

type OrganizationsIntent =
  | "getUsers"
  | "inviteUser"
  | "editUser"
  | "assignRole"
  | "deleteUser"
  | "getInviteLink"
  | "createRole"
  | "editRole";

const useOrganizations = (loadUser?: boolean): useOrganizationsReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();
  const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/organizations/`;

  const organizationUserQuery = useQuery<string, Error>({
    queryKey: ["organizations", "user"],
    queryFn: async () =>
      axiosCustom.post(apiUrl, { data: { intent: "getUsers" } }).then((res) => {
        console.log("useOrganizations | loadOrganizations ✅ |", res.data);
        return res.data;
      }),
    enabled: loadUser === true,
  });

  const inviteLinkQuery = useQuery<string, Error>({
    queryKey: ["organizations", "invitationLink"],
    queryFn: async () =>
      axiosCustom
        .post(apiUrl, { data: { intent: "getInviteLink" } })
        .then((res) => {
          console.log("useOrganizations | loadInviteLink ✅ |", res.data);
          return res.data;
        }),
  });

  const inviteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: { intent: "inviteUser", content: { email: email } },
        })
        .then((response) => {
          console.log("useOrganizations | inviteUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations"]);
    },
  });

  return { organizationUserQuery, inviteLinkQuery, inviteUserMutation };
};

export default useOrganizations;
