import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

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
    <div className="realtive flex w-full flex-col items-center gap-5 p-5">
      <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
        <Text variant="body">
          {`${t(`Organization.Info.accessed`)}: `}
          {organization.accessedWhen.toLocaleDateString()}
        </Text>
        <Text variant="body">
          s{`${t(`Organization.Info.created`)}: `}
          {organization.createdWhen.toLocaleDateString()}
        </Text>
        <Text variant="body">
          {`${t(`Organization.Info.updated`)}: `}
          {organization.updatedWhen.toLocaleDateString()}
        </Text>
        <Text variant="body">
          {`${t(`Organization.Info.name`)}: `}
          {organization.name}
        </Text>
        <Text variant="body" className="break-all">
          {`${t(`Organization.Info.id`)}: `}
          {organization.hashedID}
        </Text>
      </div>
      <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
        <Text variant="body">
          {`${t(`Organization.Info.email`)}: `}
          {organization.details.email}
        </Text>
        <Text variant="body">
          {`${t(`Organization.Info.taxID`)}: `}
          {organization.details.taxID}
        </Text>
      </div>
      <Container width="full" justify="start" align="start">
        <Text variant="body">{`${t(`Organization.Info.services`)}: `}</Text>
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
            <Text>{t("Organization.Info.noService")}</Text>
          )}
        </Container>
      </Container>
      <PermissionGate element="OrganizationButtonEditOrga">
        <Button title={t(`Organization.Info.button.edit`)} onClick={openEdit} />
      </PermissionGate>
    </div>
  );
};

export default OrganizationInfoPreView;
