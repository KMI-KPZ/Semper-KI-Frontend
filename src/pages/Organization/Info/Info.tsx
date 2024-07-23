import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganization from "../../../hooks/useOrganization";
import {
  Button,
  Divider,
  LoadingAnimation,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import { Modal } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Container } from "@component-library/index";
import OrganizationForm from "@/components/Form/OrganizationForm";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import OrganizationInfoPreView from "./View";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";

interface OrganizationInfoProps {
  organization: Organization;
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = (props) => {
  const { organization } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);

  const closeEdit = () => {
    setEdit(false);
  };

  const openEdit = () => {
    setEdit(true);
  };

  return (
    <Container className={`shadow-card`} width="full">
      {edit ? (
        <OrganizationForm organization={organization} closeEdit={closeEdit} />
      ) : (
        <OrganizationInfoPreView
          organization={organization}
          openEdit={openEdit}
        />
      )}
    </Container>
  );
};

export default OrganizationInfo;
