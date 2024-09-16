import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

export interface OrganizationInvite {
  id: string;
  inviter: {
    name: string;
  };
  invitee: {
    email: string;
  };
  invitation_url: string;
  created_at: string;
  expires_at: string;
  roles: string[];
}

const useGetOrganizationInvites = () => {
  const getOrganizationInvites = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/invites/get/`)
      .then((response) => {
        const data: OrganizationInvite[] = response.data;
        logger(
          "useGetOrganizationInvites | getOrganizationInvites ✅ |",
          response
        );
        return data;
      });

  return useQuery<OrganizationInvite[], Error>({
    queryKey: ["organization", "invites"],
    queryFn: getOrganizationInvites,
  });
};

export default useGetOrganizationInvites;
