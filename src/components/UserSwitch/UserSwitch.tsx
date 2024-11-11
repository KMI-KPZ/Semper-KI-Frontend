import React from "react";
import { useTranslation } from "react-i18next";
import { Text, Switch, Container } from "@component-library/index";
import { UserType } from "@/hooks/useUser";

interface Props {
  userType: UserType;
  onClick(userType: UserType): void;
}

export const UserSwitch: React.FC<Props> = (props) => {
  const { onClick, userType } = props;
  const { t } = useTranslation();

  const handleOnClickSwitch = () => {
    onClick(userType === UserType.USER ? UserType.ORGANIZATION : UserType.USER);
  };

  return (
    <Container className="p-3" gap={5}>
      <Text
        variant="body"
        children={t("components.UserSwitch.client")}
        className={`rounded-full px-4 py-1 transition-all duration-300
        ${userType === UserType.USER ? " bg-türkis-800 text-white" : ""}
        `}
      />
      <Switch
        onChange={handleOnClickSwitch}
        value={userType === UserType.USER}
      />
      <Text
        variant="body"
        children={t("components.UserSwitch.organization")}
        className={`rounded-full px-4 py-1 transition-all duration-300
        ${userType === UserType.ORGANIZATION ? " bg-türkis-800 text-white" : ""}
        `}
      />
    </Container>
  );
};
