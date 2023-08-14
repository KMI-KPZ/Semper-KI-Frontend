import { User, UserType } from "@/hooks/useUser/types";
import { Event } from "@/pages/App/types";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeAuthorizedOrder from "./components/Order";
import HomeAuthorizedOrganization from "./components/Organization";
import HomeAuthorizedResources from "./components/Resources";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import HomeAuthorizedAdmin from "./components/Admin";

interface AuthorizedPropsHome {
  user: User;
  events?: Event[];
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user, events } = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10"
      data-testid="home-authorized"
    >
      <PermissionGate element={"HomeAuthorizedOrder"}>
        <HomeAuthorizedOrder />
      </PermissionGate>
      {user.usertype === UserType.ORGANIZATION ? (
        <>
          <PermissionGate element={"HomeAuthorizedOrganization"}>
            <HomeAuthorizedOrganization />
          </PermissionGate>
          <PermissionGate element={"HomeAuthorizedResources"}>
            <HomeAuthorizedResources />
          </PermissionGate>
        </>
      ) : null}
      {user.usertype === UserType.ADMIN ? <HomeAuthorizedAdmin /> : null}
    </div>
  );
};

export default AuthorizedHome;
