import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import {
  OrgaNotificationSetting,
  OrgaNotificationSettingsType,
  UserAddressProps,
} from "@/hooks/useUser";

export interface Organization {
  hashedID: string;
  name: string;
  details: OrganizationDetails;
  accessedWhen: Date;
  createdWhen: Date;
  updatedWhen: Date;
  supportedServices: ServiceType[];
}

export interface OrganizationBranding {
  logo_url: string;
  colors: {
    primary: string;
    page_background: string;
  };
}

export interface OrganizationDetails {
  taxID: string;
  email: string;
  addresses?: UserAddressProps[];
  locale?: string;
  notificationSettings?: { organization?: OrgaNotificationSetting[] };
  priorities?: OrganizationPriority[];
  branding?: OrganizationBranding;
}

export interface OrganizationPriority {
  type: OrganizationPriorityType;
  value: number;
}
export type OrganizationPriorityType =
  | "cost"
  | "time"
  | "quality"
  | "quantity"
  | "resilience"
  | "sustainability";

const useGetOrganization = () => {
  const getOrganization = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/get/`)
      .then((response) => {
        const responseData = response.data;

        const orgaNotificationSettings: OrgaNotificationSetting[] =
          responseData.details.notificationSettings !== undefined &&
          responseData.details.notificationSettings.organization !== undefined
            ? Object.keys(
                responseData.details.notificationSettings.organization
              ).map((key: string) => {
                return {
                  type: key as OrgaNotificationSettingsType,
                  event:
                    responseData.details.notificationSettings.organization[key]
                      .event,
                  email:
                    responseData.details.notificationSettings.organization[key]
                      .email,
                };
              })
            : [];
        const priorities: OrganizationPriority[] =
          responseData.details.priorities !== undefined
            ? Object.keys(responseData.details.priorities).map(
                (key: string) => {
                  return {
                    type: key as OrganizationPriorityType,
                    value: responseData.details.priorities[key].value,
                  };
                }
              )
            : [];

        const organization: Organization = {
          ...responseData,
          accessedWhen: new Date(responseData.accessedWhen),
          createdWhen: new Date(responseData.createdWhen),
          updatedWhen: new Date(responseData.updatedWhen),
          details: {
            ...responseData.details,
            notificationSettings: { organization: orgaNotificationSettings },
            priorities,
          },
          supportedServices: responseData.supportedServices.filter(
            (serviceType: ServiceType) => serviceType !== 0
          ),
        };

        logger("useGetOrganization | getOrganization ✅ |", response);
        return organization;
      });

  return useQuery<Organization, Error>({
    queryKey: ["organization", "info"],
    queryFn: getOrganization,
    staleTime: 300000, // 5 minutes
  });
};

export default useGetOrganization;
