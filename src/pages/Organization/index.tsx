import { User } from "@/hooks/useUser";
import React from "react";
import { useTranslation } from "react-i18next";
import Invitation from "./components/invitation";
import OrganizationTabel from "./components/table";

interface OrganizationViewProps {
  user: User | undefined;
}

const OrganizationView: React.FC<OrganizationViewProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <h1>{t("Organization.index.header")}</h1>
      <div className="w-full border-t-2" />
      <Invitation />
      <div className="w-full border-t-2" />
      <OrganizationTabel />
    </div>
  );
};

export default OrganizationView;
