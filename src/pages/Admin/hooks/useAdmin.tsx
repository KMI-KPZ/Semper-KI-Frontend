import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { DefaultUser } from "@/hooks/useUser";
import { useContext } from "react";
import { ProjectDetailsProps } from "@/api/Project/Querys/useGetProject";
import { AdminContext } from "@/outlets/AdminOutlet";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";

interface ReturnProps {
  users: AdminUserProps[];
  organizations: Organization[];
  flatProjects: FlatProject[];
}

export interface DeleteUserProps {
  hashedID: string;
  name: string;
}

export interface AdminProps {
  user: AdminUserProps[];
  organizations: Organization[];
}

export interface AdminUserProps extends DefaultUser {
  organizationNames: string[];
}

export interface AdminFlatProjectProps {
  accessedWhen: Date;
  client: string;
  clientName: string;
  createdWhen: Date;
  details: ProjectDetailsProps;
  processesCount: number;
  projectID: string;
  status: ProcessStatus;
  updatedWhen: Date;
}

const useAdmin = (): ReturnProps => {
  const { flatProjects, organizations, users } = useContext(AdminContext);

  return {
    flatProjects,
    organizations,
    users,
  };
};

export default useAdmin;
