import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Heading } from "@component-library/index";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ContractorCard from "@/components/Process/ContractorCard";

interface OrganizationInfoPreViewProps {
  organization: Organization;
  openEdit: () => void;
}

const OrganizationInfoPreView: React.FC<OrganizationInfoPreViewProps> = (
  props
) => {
  const { organization, openEdit } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col" className="p-5">
      <Heading variant="h2">{t("Organization.View.Info.header")}</Heading>
      <Divider />
      <table className=" w-full table-auto border-separate border-spacing-3 ">
        <tbody>
          <tr>
            <td>{t(`Organization.View.Info.name`)}</td>
            <td>{organization.name}</td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.email`)}</td>
            <td>{organization.details.email}</td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.taxID`)}</td>
            <td>{organization.details.taxID}</td>
          </tr>

          <tr>
            <td className="align-text-top">{t(`Organization.View.Info.id`)}</td>
            <td className="break-all">{organization.hashedID}</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap align-text-top">
              {t(`Organization.View.Info.services`)}
            </td>
            <td>
              <ul>
                {organization.supportedServices.length > 0 ? (
                  organization.supportedServices.map((service, index) => (
                    <li key={index}>
                      {"• "}
                      {t(
                        `enum.ServiceType.${
                          ServiceType[service] as keyof typeof ServiceType
                        }`
                      )}
                    </li>
                  ))
                ) : (
                  <li>{t("Organization.View.Info.noService")}</li>
                )}
              </ul>
            </td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.accessed`)}</td>
            <td>{organization.accessedWhen.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.created`)}</td>
            <td>{organization.createdWhen.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.updated`)}</td>
            <td>{organization.updatedWhen.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.img`)}</td>
            <td>
              <img
                src={organization.details.branding?.logo_url}
                className="h-40 w-fit rounded-lg border-2 object-contain p-2 "
              />
            </td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.primary-color`)}</td>
            <td>
              <div
                className={`h-10 w-40 rounded-md border-2 `}
                style={{
                  backgroundColor:
                    organization.details.branding?.colors.primary,
                }}
              />
            </td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.background-color`)}</td>
            <td>
              <div
                className={`h-10 w-40 rounded-md border-2`}
                style={{
                  backgroundColor:
                    organization.details.branding?.colors.page_background,
                }}
              />
            </td>
          </tr>
          <tr>
            <td>{t(`Organization.View.Info.contractorCard`)}</td>
            <td>
              <ContractorCard
                className="w-fit"
                contractor={{
                  branding: organization.details.branding ?? {
                    colors: { page_background: "white", primary: "black" },
                    logo_url: "",
                  },
                  hashedID: organization.hashedID,
                  name: organization.name,
                  prices: { groupCosts: [[333, 666]] },
                  contractorCoordinates: [0, 0],
                  distance: 0,
                  verified: true,
                  groups: [],
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Text variant="body">
        {`${t(`Organization.View.Info.accessed`)}: `}
        {organization.accessedWhen.toLocaleDateString()}
      </Text>
      <Text variant="body">
        {`${t(`Organization.View.Info.created`)}: `}
        {organization.createdWhen.toLocaleDateString()}
      </Text>
      <Text variant="body">
        {`${t(`Organization.View.Info.updated`)}: `}
        {organization.updatedWhen.toLocaleDateString()}
      </Text>
      <Text variant="body">
        {`${t(`Organization.View.Info.name`)}: `}
        {organization.name}
      </Text>
      <Text variant="body" className="break-all">
        {`${t(`Organization.View.Info.id`)}: `}
        {organization.hashedID}
      </Text>
      <Text variant="body">
        {`${t(`Organization.View.Info.email`)}: `}
        {organization.details.email}
      </Text>
      <Text variant="body">
        {`${t(`Organization.View.Info.taxID`)}: `}
        {organization.details.taxID}
      </Text>
      <Container width="full" justify="start" align="start">
        <Text variant="body">{`${t(`Organization.View.Info.services`)}: `}</Text>
        <Container>
          {organization.supportedServices.length > 0 ? (
            organization.supportedServices.map((service, index) => (
              <Text key={index}>
                {t(
                  `enum.ServiceType.${
                    ServiceType[service] as keyof typeof ServiceType
                  }`
                )}
              </Text>
            ))
          ) : (
            <Text>{t("Organization.View.Info.noService")}</Text>
          )}
        </Container>
      </Container> */}
      <PermissionGate element="OrganizationButtonEditOrga">
        <Button title={t(`general.button.edit`)} onClick={openEdit} />
      </PermissionGate>
    </Container>
  );
};

export default OrganizationInfoPreView;
