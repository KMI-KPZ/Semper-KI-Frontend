import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAddressProps } from "@/hooks/useUser";
import { NewUserAddressProps } from "@/api/User/Mutations/useUpdateUser";
import { OrganizationService } from "../Querys/useGetOrganization";

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
  priorities?: UpdatePriorities;
  services?: OrganizationService;
  todos?: {
    show: boolean;
  };
}

export interface UpdatePriorities {
  cost?: {
    value: number;
  };
  time?: {
    value: number;
  };
  quality?: {
    value: number;
  };
  quantity?: {
    value: number;
  };
  resilience?: {
    value: number;
  };
  sustainability?: {
    value: number;
  };
}

export interface UpdateOrgaDeletions {
  address?: string;
  services?: string[];
  supportedServices?: number[];
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
