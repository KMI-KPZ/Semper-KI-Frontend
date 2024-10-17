import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useParams } from "react-router-dom";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface AdminOrganizationDetailsProps {}

const AdminOrganizationDetails: React.FC<AdminOrganizationDetailsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  const { organizationID } = useParams();
  const { organizations } = useAdmin();

  const organization = organizations.find(
    (org: Organization) => org.hashedID === organizationID
  );

  if (organization === undefined) return <Navigate to=".." />;

  const getContrastColor = (hex: string): "black" | "white" => {
    // Remove the '#' if it's there
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }

    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }

    // Convert hex to RGB values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Calculate the relative luminance (formula from W3C)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If luminance is greater than 0.5, it's a light color, return 'black', otherwise 'white'
    return luminance > 0.5 ? "black" : "white";
  };

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Organization.details.title")}</Heading>
      </BackButtonContainer>
      <table className="w-fit table-auto border-collapse border-spacing-x-4  border-spacing-y-1 rounded-md border-2">
        <tbody>
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.general")}
            </th>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.name")}
            </td>
            <td className="border-b-2 border-l-2 px-5 py-2">
              {organization.name}
            </td>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.email")}
            </td>
            <td className="border-b-2 border-l-2 px-5 py-2">
              {organization.details.email ?? "---"}
            </td>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.locale")}
            </td>
            <td className="border-b-2 border-l-2 px-5 py-2">
              {organization.details.locale ?? "---"}
            </td>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.taxID")}
            </td>
            <td className="border-b-2 border-l-2 px-5 py-2">
              {organization.details.taxID ?? "---"}
            </td>
          </tr>
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.branding")}
            </th>
          </tr>
          {organization.details.branding === undefined ? (
            <tr>
              <td className="border-b-2 px-5 py-2 text-center" colSpan={2}>
                ---
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <td className="border-b-2 border-l-2 px-5 py-2" colSpan={2}>
                  {organization.details.branding.logo_url !== "" ? (
                    <img
                      className="h-40 w-full object-contain"
                      src={organization.details.branding.logo_url}
                    />
                  ) : (
                    "---"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 px-5 py-2">
                  {t("Admin.Organization.details.primaryColor")}
                </td>
                <td
                  className={`border-b-2 border-l-2 px-5 py-2 `}
                  style={{
                    backgroundColor:
                      organization.details.branding.colors.primary,
                    color: getContrastColor(
                      organization.details.branding.colors.primary
                    ),
                  }}
                >
                  {organization.details.branding.colors.primary}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 px-5 py-2">
                  {t("Admin.Organization.details.pageBackground")}
                </td>
                <td
                  className={`border-b-2 border-l-2 px-5 py-2 `}
                  style={{
                    backgroundColor:
                      organization.details.branding.colors.page_background,
                    color: getContrastColor(
                      organization.details.branding.colors.page_background
                    ),
                  }}
                >
                  {organization.details.branding.colors.page_background}
                </td>
              </tr>
            </>
          )}
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.services")}
            </th>
          </tr>
          {organization.supportedServices.length === 0 ? (
            <tr>
              <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
                ---
              </td>
            </tr>
          ) : (
            organization.supportedServices.map((service) => (
              <tr>
                <td colSpan={2} className="border-b-2 px-5 py-2">
                  {t(
                    `enum.ServiceType.${
                      ServiceType[service] as keyof typeof ServiceType
                    }`
                  )}
                </td>
              </tr>
            ))
          )}
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.priorities")}
            </th>
          </tr>
          {organization.details.priorities === undefined ||
          organization.details.priorities.length === 0 ? (
            <tr>
              <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
                ---
              </td>
            </tr>
          ) : (
            organization.details.priorities.map((priority) => (
              <tr>
                <td className="border-b-2 px-5 py-2">
                  {t(`types.OrganizationPriorityType.${priority.type}`)}
                </td>
                <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
                  <Container width="full" direction="row">
                    <Text>{priority.value}</Text>
                    <Container width="full" direction="row" className="gap-2">
                      {Array(7)
                        .fill(null)
                        .map((_, index) => (
                          <span
                            key={index}
                            className={`inline-block  h-4 w-4 ${
                              index < priority.value
                                ? "bg-ultramarinblau"
                                : "bg-gray-200"
                            } rounded-full
                      `}
                          ></span>
                        ))}
                    </Container>
                  </Container>
                </td>
              </tr>
            ))
          )}

          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.notificationSettings")}
            </th>
          </tr>
          {organization.details.notificationSettings === undefined ||
          organization.details.notificationSettings.organization ===
            undefined ||
          organization.details.notificationSettings.organization.length ===
            0 ? (
            <tr>
              <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
                ---
              </td>
            </tr>
          ) : (
            organization.details.notificationSettings.organization.map(
              (notification) => (
                <tr>
                  <td className="border-b-2 px-5 py-2">
                    {t(`types.NotificationSettingsType.${notification.type}`)}
                  </td>
                  <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2 text-center">
                    {notification.event
                      ? t("Admin.Organization.details.event")
                      : null}
                    {notification.event && notification.email ? ", " : null}
                    {notification.email
                      ? t("Admin.Organization.details.email")
                      : null}
                  </td>
                </tr>
              )
            )
          )}
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.adresses")}
            </th>
          </tr>
          <tr>
            <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
              ---
            </td>
          </tr>
          <tr>
            <th colSpan={2} className="border-2">
              {t("Admin.Organization.details.dates")}
            </th>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.created")}
            </td>
            <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
              {new Date(organization.createdWhen).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2 ">
              {t("Admin.Organization.details.accessed")}
            </td>
            <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
              {new Date(organization.accessedWhen).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border-b-2 px-5 py-2">
              {t("Admin.Organization.details.updated")}
            </td>
            <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
              {new Date(organization.updatedWhen).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        size="sm"
        variant="primary"
        title={t("Admin.Organization.details.button.edit")}
        to={"edit"}
      />
    </Container>
  );
};

export default AdminOrganizationDetails;
