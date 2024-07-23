import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
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

interface OrganizationInfoProps {}

const OrganizationInfo: React.FC<OrganizationInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationQuery } = useOrganizations();
  const [edit, setEdit] = useState<boolean>(false);

  const closeEdit = () => {
    setEdit(false);
  };

  const openEdit = () => {
    setEdit(true);
  };
  if (organizationQuery.isLoading) return <LoadingAnimation variant="circel" />;
  if (organizationQuery.isError || organizationQuery.data === undefined)
    return <Text>ERROR LOADING</Text>;

  return (
    <Container width="full" direction="col">
      <Divider />
      {edit ? (
        <OrganizationForm
          organizationInfo={organizationQuery.data}
          closeEdit={closeEdit}
        />
      ) : (
        <OrganizationInfoPreView
          orga={organizationQuery.data}
          openEdit={openEdit}
        />
      )}
    </Container>
  );
};

export default OrganizationInfo;
