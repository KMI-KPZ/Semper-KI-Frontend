import useAdminDeleteOrganization, {
  AdminDeleteOrgaProps,
} from "@/api/Admin/Mutations/useAdminDeleteOrganization";
import useAdminDeleteUser, {
  AdminDeleteUserProps,
} from "@/api/Admin/Mutations/useAdminDeleteUser";
import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ProjectDetailsProps as ProjectDetails } from "@/hooks/Project/useProject";
import { AuthorizedUserProps } from "@/hooks/useUser";
import { AdminContext } from "@/routeOutlets/AdminOutlet";
import { UseMutationResult } from "@tanstack/react-query";
import { useContext } from "react";

interface ReturnProps {
  users: AuthorizedUserProps[];
  organizations: OrganizationProps[];
  flatProjects: FlatProject[];
  deleteUser: UseMutationResult<void, Error, AdminDeleteUserProps, unknown>;
  deleteOrganization: UseMutationResult<
    void,
    Error,
    AdminDeleteOrgaProps,
    unknown
  >;
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
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
}

export interface AdminFlatProjectProps {
  accessedWhen: Date;
  client: string;
  clientName: string;
  createdWhen: Date;
  details: ProjectDetails;
  processesCount: number;
  projectID: string;
  status: ProcessStatus;
  updatedWhen: Date;
}

const useAdmin = (): ReturnProps => {
  const { flatProjects, organizations, users } = useContext(AdminContext);
  // const { deleteOrganization, deleteUser } = useAdminMutations();
  const deleteUser = useAdminDeleteUser();
  const deleteOrganization = useAdminDeleteOrganization();

  return {
    deleteOrganization,
    deleteUser,
    flatProjects,
    organizations,
    users,
  };
};

export default useAdmin;
