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
  services?: OrganizationService;
  todos: { show: boolean };
}

export type OrganizationService = {
  [key in keyof typeof ServiceType]?: OrganizationServiceCostingItem[];
};

export interface OrganizationServiceCostingItem {
  key: string;
  name: string;
  unit: OrganizationServiceCostingItemUnit;
  value: number;
}

export type OrganizationServiceCostingItemUnit =
  | "€/kWh"
  | "€/h"
  | "%"
  | "€/kg"
  | "€"
  | "cm³/h"
  | "mm"
  | "cm³"
  | "g/cm³"
  | "€/(h*m²)";

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

export const parseOrganizationPrioritise = (
  priorities?: any
): OrganizationPriority[] => {
  return priorities !== undefined
    ? Object.keys(priorities).map((key: string) => {
        return {
          type: key as OrganizationPriorityType,
          value: priorities[key].value,
        };
      })
    : [];
};

export const parseOrganization = (responseData: any): Organization => {
  const orgaNotificationSettings: OrgaNotificationSetting[] =
    responseData.details.notificationSettings !== undefined &&
    responseData.details.notificationSettings.organization !== undefined
      ? Object.keys(responseData.details.notificationSettings.organization).map(
          (key: string) => {
            return {
              type: key as OrgaNotificationSettingsType,
              event:
                responseData.details.notificationSettings.organization[key]
                  .event,
              email:
                responseData.details.notificationSettings.organization[key]
                  .email,
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
      priorities: parseOrganizationPrioritise(responseData.details.priorities),
      services:
        responseData.details.services === undefined
          ? {
              ADDITIVE_MANUFACTURING: [
                {
                  key: "Test",
                  name: "Test",
                  unit: "mm",
                  value: 1,
                },
                {
                  key: "Test2",
                  name: "Test2",
                  unit: "€",
                  value: 2,
                },
              ],
              AFTER_SALES: [
                {
                  key: "Test",
                  name: "Test",
                  unit: "cm³/h",
                  value: 1,
                },
                {
                  key: "Test2",
                  name: "Test2",
                  unit: "€/h",
                  value: 2,
                },
              ],
            }
          : responseData.details.services,
    },
    supportedServices: responseData.supportedServices.filter(
      (serviceType: ServiceType) => serviceType !== 0
    ),
  };
  return organization;
};

const useGetOrganization = (loading: boolean) => {
  const getOrganization = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/get/`)
      .then((response) => {
        const responseData = response.data;

        logger("useGetOrganization | getOrganization ✅ |", response);

        return parseOrganization(responseData);
      });

  return useQuery<Organization, Error>({
    queryKey: ["organization", "info"],
    queryFn: getOrganization,
    enabled: loading,
    staleTime: 300000, // 5 minutes
  });
};

export default useGetOrganization;
