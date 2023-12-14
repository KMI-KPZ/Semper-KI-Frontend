import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { Event } from "@/pages/App/types";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeProjects from "../components/Projects";
import HomeOrganization from "../components/Organization";
import HomeResources from "../components/Resources";
import HomeAdmin from "../components/Admin";
import Coypu from "../components/Coypu";

interface AuthorizedPropsHome {
  user: AuthorizedUserProps;
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

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
      {user.usertype === UserType.ADMIN ? <HomeAdmin /> : null}
    </div>
  );
};

export default AuthorizedHome;
