import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading } from "@component-library/index";
import useAdminMenuButtons from "@/hooks/useAdminMenuButtons";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { adminMenuButtons } = useAdminMenuButtons();

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <Heading variant="h1" className="p-2">
        {t("Admin.Admin.title")}
      </Heading>
      <Container>
        {adminMenuButtons.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            to={button.to}
            width="full"
            variant={button.isActive ? "primary" : "secondary"}
          />
        ))}
      </Container>
    </Container>
  );
};

export default AdminDashboard;
