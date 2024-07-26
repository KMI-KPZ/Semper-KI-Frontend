import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAddressProps } from "@/hooks/useUser";
import { NewUserAddressProps } from "@/api/User/Mutations/useUpdateUser";

export interface UpdateOrgaProps {
  changes?: UpdateOrgaChanges;
  deletions?: UpdateOrgaDeletions;
}

export interface UpdateOrgaChanges {
  displayName?: string;
  email?: string;
  address?: UserAddressProps | NewUserAddressProps;
  locale?: string;
  notifications?: {
    organization?: {
      [key: string]: {
        event?: boolean;
        email?: boolean;
      };
    };
  };
  supportedServices?: number[];
  branding?: {
    logo_url: string;
    colors: {
      primary: string;
      page_background: string;
    };
  };
  taxID?: string;
  priorities?: {
    [key: string]: {
      value: number;
    };
  };
}

export interface UpdateOrgaDeletions {
  address?: string;
  services?: string[];
}

const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  const updateOrgaInfo = async (props: UpdateOrgaProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/update/`,
        props
      )
      .then((response) => {
        logger("useUpdateOrganization | updateOrga ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateOrganization | updateOrga ❌ |", error);
      });

  return useMutation<void, Error, UpdateOrgaProps>({
    mutationFn: updateOrgaInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "info"]);
    },
  });
};

export default useUpdateOrganization;
