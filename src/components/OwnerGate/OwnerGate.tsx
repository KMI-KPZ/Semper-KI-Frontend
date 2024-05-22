import { useProject } from "@/hooks/Project/useProject";
import logger from "@/hooks/useLogger";
import useUser, { UserType } from "@/hooks/useUser";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface OwnerGateProps {}

const OwnerGate: React.FC<PropsWithChildren<OwnerGateProps>> = (props) => {
  const { children } = props;
  const { user } = useUser();
  const { project } = useProject();
  // logger("Usergate", project, user);

  return user.usertype === UserType.ORGANIZATION &&
    project.client !== user.organization
    ? null
    : children;
};

export default OwnerGate;
