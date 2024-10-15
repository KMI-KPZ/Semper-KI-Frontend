import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { AuthorizedUserProps } from "@/hooks/useUser";
import { useContext } from "react";
import { ProjectDetailsProps } from "@/api/Project/Querys/useGetProject";
import { AdminContext } from "@/outlets/AdminOutlet";

interface ReturnProps {
  users: AdminUserProps[];
  organizations: OrganizationProps[];
  flatProjects: FlatProject[];
}

export interface DeleteUserProps {
  hashedID: string;
  name: string;
}

export interface AdminProps {
  user: AdminUserProps[];
  organizations: OrganizationProps[];
}

export interface AdminUserProps extends AuthorizedUserProps {
  organizationNames: string[];
}

export interface OrganizationProps {
  hashedID: string;
  name: string;
  canManufacture: boolean;
  details: any;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
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
