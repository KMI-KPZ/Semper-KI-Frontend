import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import useAdmin from "../../../hooks/useAdmin";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { getContrastColor } from "@/services/utils";

interface AdminOrganizationDetailsProps {}

const AdminOrganizationDetails: React.FC<AdminOrganizationDetailsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { organizationID } = useParams();
  const { organizations } = useAdmin();

  const organization = organizations.find(
    (org: Organization) => org.hashedID === organizationID
  );

  if (organization === undefined) return <Navigate to=".." />;

  return (
    <Modal
      modalKey="adminorgadetails"
      open={true}
      closeModal={() => navigate("..")}
    >
      <Container width="full" direction="col" className="bg-white p-5">
        <BackButtonContainer>
          <Heading variant="h1">
            {t("Admin.Organization.details.heading")}
          </Heading>
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
          title={t("general.button.edit")}
          to={"edit"}
        />
      </Container>
    </Modal>
  );
};

export default AdminOrganizationDetails;
