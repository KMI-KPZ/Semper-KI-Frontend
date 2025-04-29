import { AuthorizedUser, UserType } from "@/hooks/useUser";
import React from "react";
import HomeOrgaResources from "../components/Resources";
import HomeUserProgress from "../components/UserProgress";
import HomeOrgaProgress from "../components/OrgaProgress";
import ProjectsOverview from "../Projects/ProjectsOverview";
import useOrganization from "@/hooks/useOrganization";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface AuthorizedPropsHome {
  user: AuthorizedUser;
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user } = props;
  const { organization } = useOrganization();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 "
      data-testid="home-authorized"
    >
      {user.details.todos.show === undefined ||
      user.details.todos.show === true ? (
        <HomeUserProgress user={user} />
      ) : null}
      {user.usertype === UserType.ORGANIZATION &&
      organization !== undefined &&
      (organization.details.todos.show === undefined ||
        organization.details.todos.show === true) ? (
        <HomeOrgaProgress />
      ) : null}
      <PermissionGate element="HomeProjects">
        <ProjectsOverview />
      </PermissionGate>
      <PermissionGate element="HomeOrgaResources">
        <HomeOrgaResources />
      </PermissionGate>
    </div>
  );
};

export default AuthorizedHome;
