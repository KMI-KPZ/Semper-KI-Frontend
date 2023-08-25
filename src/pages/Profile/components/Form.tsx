import { User } from "@/hooks/useUser/types";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Profile.components.Form.title")}</Heading>
    </div>
  );
};

export default ProfileForm;
