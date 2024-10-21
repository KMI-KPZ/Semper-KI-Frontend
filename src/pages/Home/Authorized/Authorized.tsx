import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { DefaultUser, UserProps, UserType } from "@/hooks/useUser";
import React from "react";
import HomeProjects from "../components/Projects";
import HomeOrganization from "../components/Organization";
import HomeResources from "../components/Resources";
import { Navigate } from "react-router-dom";

interface AuthorizedPropsHome {
  user: UserProps;
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user } = props;

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10"
      data-testid="home-authorized"
    >
      {user.usertype !== UserType.ADMIN ? (
        <PermissionGate element={"HomeAuthorizedProject"}>
          <HomeProjects />
        </PermissionGate>
      ) : null}
      {user.usertype === UserType.ORGANIZATION ? (
        <>
          <PermissionGate element={"HomeAuthorizedOrganization"}>
            <HomeOrganization />
          </PermissionGate>
          <PermissionGate element={"HomeAuthorizedResources"}>
            <HomeResources />
          </PermissionGate>
        </>
      ) : null}
      {user.usertype === UserType.ADMIN ? <Navigate to="admin" /> : null}
    </div>
  );
};

export default AuthorizedHome;
