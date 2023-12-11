import useAdminMutations from "@/api/Admin/useAdminMutations";
import { AuthorizedUserProps } from "@/hooks/useUser";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { ProjectDetailsProps } from "@/pages/Projects/hooks/useProject";
import { AdminContext } from "@/routeOutlets/AdminOutlet";
import { UseMutationResult } from "@tanstack/react-query";
import { useContext } from "react";

interface ReturnProps {
  users: AuthorizedUserProps[];
  organizations: OrganizationProps[];
  flatProjects: AdminFlatProjectProps[];
  deleteUser: UseMutationResult<any, Error, DeleteUserProps, unknown>;
  deleteOrganization: UseMutationResult<any, Error, DeleteUserProps, unknown>;
}

export interface DeleteUserProps {
  hashedID: string;
  name: string;
}

export interface AdminProps {
  user: AuthorizedUserProps[];
  organizations: OrganizationProps[];
}

export interface OrganizationProps {
  hashedID: string;
  name: string;
  canManufacture: boolean;
  details: any;
  created: Date;
  updated: Date;
  accessed: Date;
}

export interface AdminFlatProjectProps {
  accessed: Date;
  client: string;
  clientName: string;
  created: Date;
  details: ProjectDetailsProps;
  projectCollectionID: string;
  status: ProcessStatus;
  processCount: number;
  updated: Date;
}

const useAdmin = (): ReturnProps => {
  const { flatProjects, organizations, users } = useContext(AdminContext);
  const { deleteOrganization, deleteUser } = useAdminMutations();

  return {
    deleteUser,
    deleteOrganization,
    flatProjects,
    organizations,
    users,
  };
};

export default useAdmin;
