import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface useOrganizationsProps {
  loadInviteLink: boolean;
}

interface useOrganizationsReturnProps {
  organizationsQuery: UseQueryResult<string, Error>;
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

const useOrganizations = (
  props: useOrganizationsProps
): useOrganizationsReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { loadInviteLink } = props;
  const queryClient = useQueryClient();
  const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/Organizations/`;

  const organizationsQuery = useQuery<string, Error>({
    queryKey: ["organizations"],
    queryFn: async () =>
      axiosCustom.post(apiUrl, { data: { intent: "getUsers" } }).then((res) => {
        console.log("useOrganizations | loadOrganizations ✅ |", res.data);
        return res.data;
      }),
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
    enabled: loadInviteLink === true,
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

  return { organizationsQuery };
};

export default useOrganizations;
