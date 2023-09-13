import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { Button, LoadingSuspense, Text } from "@component-library/index";
import OrganizationInfoForm from "./components/Form";
import Modal from "@component-library/Modal";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface OrganizationInfoProps {}

const OrganizationInfo: React.FC<OrganizationInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationInfoQuery } = useOrganizations();
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
              {organizationInfoQuery.data.accessed.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.created`)}: `}
              {organizationInfoQuery.data.created.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {`${t(`Organization.Info.updated`)}: `}
              {organizationInfoQuery.data.updated.toLocaleDateString()}
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
              {`${t(`Organization.Info.canManufacture.name`)}: `}
              {t(
                `Organization.Info.canManufacture.${
                  organizationInfoQuery.data.canManufacture ? "true" : "false"
                }`
              )}
            </Text>
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
          <PermissionGate element="OrganizationButtonEditOrga">
            <Button
              title={t(`Organization.Info.button.edit`)}
              onClick={openEdit}
            />
          </PermissionGate>
          <Modal open={edit} closeModal={closeEdit}>
            <OrganizationInfoForm
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
