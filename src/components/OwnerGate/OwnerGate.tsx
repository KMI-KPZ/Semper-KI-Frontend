import { Process } from "@/api/Process/Querys/useGetProcess";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import { Project } from "@/api/Project/Querys/useGetProject";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useUser, { UserType } from "@/hooks/useUser";
import React, { PropsWithChildren } from "react";

interface OwnerGateProps {
  type?: "organization" | "user";
  project?: Project | FlatDashboardProject;
  process?: Process;
}

const OwnerGate: React.FC<PropsWithChildren<OwnerGateProps>> = (props) => {
  const {
    children,
    type = "user",
    project: customProject,
    process: customProcess,
  } = props;
  const { user } = useUser();
  const { project: loadedProject } = useProject();
  const { process: loadedProcess } = useProcess();

  const project = customProject || loadedProject;
  const process = customProcess || loadedProcess;

  const ownProject =
    (user.usertype === UserType.USER && project.client === user.hashedID) ||
    (user.usertype === UserType.ORGANIZATION &&
      project.client === user.organization);

  const recievedProject =
    user.usertype === UserType.ORGANIZATION &&
    project.client !== user.organization;
  const ownProcess =
    user.usertype === UserType.ORGANIZATION &&
    process.contractor?.hashedID === user.hashedID;

  if (user.usertype === UserType.ADMIN) return children;
  if (user.usertype === UserType.ANONYM) return children;
  if (type === "user" && ownProject) return children;
  if (type === "organization" && (recievedProject || ownProcess))
    return children;
  return null;
};

export default OwnerGate;
