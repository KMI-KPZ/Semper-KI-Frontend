import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { Button, LoadingSuspense, Text } from "@component-library/index";
import { Modal } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Container } from "@component-library/index";
import OrganizationForm from "@/components/Form/OrganizationForm";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface OrganizationInfoProps {}

const OrganizationInfo: React.FC<OrganizationInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationQuery: organizationInfoQuery } = useOrganizations();
  const [edit, setEdit] = useState<boolean>(false);

  const closeEdit = () => {
    setEdit(false);
  };

  const openEdit = () => {
    setEdit(true);
  };

  return (
    <LoadingSuspense query={organizationInfoQuery}>
      {organizationInfoQuery.data !== undefined ? (
        <div className="realtive flex w-full flex-col items-center gap-5 p-5 shadow-card">
          <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
            <Text variant="body">
              {`${t(`Organization.Info.accessed`)}: `}
              {organizationInfoQuery.data.accessedWhen.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.created`)}: `}
              {organizationInfoQuery.data.createdWhen.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.updated`)}: `}
              {organizationInfoQuery.data.updatedWhen.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.name`)}: `}
              {organizationInfoQuery.data.name}
            </Text>
            <Text variant="body" className="break-all">
              {`${t(`Organization.Info.id`)}: `}
              {organizationInfoQuery.data.hashedID}
            </Text>
          </div>
          <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
            <Text variant="body">
              {`${t(`Organization.Info.adress`)}: `}
              {organizationInfoQuery.data.details.adress}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.email`)}: `}
              {organizationInfoQuery.data.details.email}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.taxID`)}: `}
              {organizationInfoQuery.data.details.taxID}
            </Text>
          </div>
          <Container width="full" justify="start" align="start">
            <Text variant="body">{`${t(`Organization.Info.services`)}: `}</Text>
            <Container>
              {organizationInfoQuery.data.supportedServices.length > 0 ? (
                organizationInfoQuery.data.supportedServices.map(
                  (service, index) => (
                    <Text key={index}>
                      {t(
                        `enum.ServiceType.${
                          ServiceType[service] as keyof typeof ServiceType
                        }`
                      )}
                    </Text>
                  )
                )
              ) : (
                <Text>{t("Organization.Info.noService")}</Text>
              )}
            </Container>
          </Container>
          <PermissionGate element="OrganizationButtonEditOrga">
            <Button
              title={t(`Organization.Info.button.edit`)}
              onClick={openEdit}
            />
          </PermissionGate>
          <Modal
            open={edit}
            closeModal={closeEdit}
            modalKey="OrganizationInfoForm"
          >
            <OrganizationForm
              closeEdit={closeEdit}
              organizationInfo={organizationInfoQuery.data}
            />
          </Modal>
        </div>
      ) : null}
    </LoadingSuspense>
  );
};

export default OrganizationInfo;
