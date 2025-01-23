import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import { Project } from "@/api/Project/Querys/useGetProject";
import { useProject } from "@/hooks/Project/useProject";
import useUser, { UserType } from "@/hooks/useUser";
import React, { PropsWithChildren } from "react";

interface OwnerGateProps {
  type?: "organization" | "user";
  project?: Project | FlatDashboardProject;
}

const OwnerGate: React.FC<PropsWithChildren<OwnerGateProps>> = (props) => {
  const { children, type = "user", project: customProject } = props;
  const { user } = useUser();
  const { project: loadedProject } = useProject();

  const project = customProject || loadedProject;

  const ownProject =
    (user.usertype === UserType.USER && project.client === user.hashedID) ||
    (user.usertype === UserType.ORGANIZATION &&
      project.client === user.organization);

  const recievedProject =
    user.usertype === UserType.ORGANIZATION &&
    project.client !== user.organization;

  if (user.usertype === UserType.ADMIN) return children;
  if (user.usertype === UserType.ANONYM) return children;
  if (type === "user" && ownProject) return children;
  if (type === "organization" && recievedProject) return children;
  return null;
};

export default OwnerGate;
