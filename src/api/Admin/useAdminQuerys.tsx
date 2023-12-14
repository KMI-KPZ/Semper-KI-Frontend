import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import {
  AdminFlatProjectProps,
  AdminProps,
  OrganizationProps,
} from "@/pages/Admin/hooks/useAdmin";
import { ProjectProps } from "@/pages/Projects/hooks/useProject";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FlatProjectProps } from "../Project/useFlatProjectQuerys";
import { useParams } from "react-router-dom";
import { getProjectFiles } from "../Project/useProjectQuerys";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";

interface useAdminQuerysReturnProps {
  adminQuery: UseQueryResult<AdminProps, Error>;
  adminFlatProjectsQuery: UseQueryResult<FlatProjectProps[], Error>;
  adminProjectQuery: UseQueryResult<ProjectProps, Error>;
}

const useAdminQuerys = (): useAdminQuerysReturnProps => {
  const { user } = useUser();
  const { projectID } = useParams();

  const adminQuery = useQuery<AdminProps, Error>({
    queryKey: ["admin"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getAll/`)
        .then((res) => {
          logger("useAdminQuerys | adminQuery ✅ |", res.data);
          return {
            organizations: res.data.organizations.map(
              (organization: any): OrganizationProps => ({
                ...organization,
                accessedWhen: new Date(organization.accessedWhen),
                createdWhen: new Date(organization.createdWhen),
                updatedWhen: new Date(organization.updatedWhen),
              })
            ),
            user: res.data.user.map(
              (user: any): AuthorizedUserProps => ({
                ...user,
                organization: user.organizations,
                accessedWhen: new Date(user.accessedWhen),
                createdWhen: new Date(user.createdWhen),
                updatedWhen: new Date(user.updatedWhen),
              })
            ),
          };
        }),
    enabled: user.usertype === UserType.ADMIN,
  });

  const adminFlatProjectsQuery = useQuery<FlatProjectProps[], Error>({
    queryKey: ["flatProjects"],
    queryFn: async () =>
      customAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/admin/getAllProjectsFlatAsAdmin/`
        )
        .then((res) => {
          const projects = res.data.map((project: any) => ({
            ...project,
            accessedWhen: new Date(project.accessedWhen),
            createdWhen: new Date(project.createdWhen),
            updatedWhen: new Date(project.updatedWhen),
          }));
          logger("useAdminQuerys | adminFlatProjectsQuery ✅ |", projects);
          return projects;
        }),
    enabled: user.usertype === UserType.ADMIN,
  });
  const adminProjectQuery = useQuery<ProjectProps, Error>(
    ["project", projectID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/admin/getSpecificProjectAsAdmin/${projectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        const project: ProjectProps = {
          client: response.data.client,
          projectID: response.data.projectID,
          status: response.data.status,
          details: response.data.details,
          createdWhen: new Date(response.data.createdWhen),
          updatedWhen: new Date(response.data.updatedWhen),
          processes: response.data.processes.map(
            (process: any): ProcessProps => ({
              client: process.client,
              processDetails: process.processDetails,
              processID: process.processID,
              processStatus: process.processStatus,
              serviceDetails: process.serviceDetails,
              serviceStatus: process.serviceStatus,
              serviceType: process.serviceType,
              messages: process.messages.messages,
              contractor: process.contractor,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              files: getProjectFiles(process.files),
            })
          ),
        };
        logger("useAdminQuerys | adminProjectQuery ✅ |", project);
        return project;
      });
    },
    {
      enabled: projectID !== undefined && user.usertype === UserType.ADMIN,
    }
  );

  return { adminFlatProjectsQuery, adminQuery, adminProjectQuery };
};

export default useAdminQuerys;
