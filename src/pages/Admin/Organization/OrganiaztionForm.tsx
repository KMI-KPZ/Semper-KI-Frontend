import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

interface AdminOrganizationFormProps {}

const AdminOrganizationForm: React.FC<AdminOrganizationFormProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Organization.form.title")}</Heading>
      </BackButtonContainer>
      Todo
    </Container>
  );
};

export default AdminOrganizationForm;
