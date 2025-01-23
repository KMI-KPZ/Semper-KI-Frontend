import { AuthorizedUser, UserType } from "@/hooks/useUser";
import React from "react";
import HomeProjects from "../Projects/Projects";
import HomeOrgaResources from "../components/Resources";
import HomeUserProgress from "../components/UserProgress";
import HomeOrgaProgress from "../components/OrgaProgress";

interface AuthorizedPropsHome {
  user: AuthorizedUser;
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user } = props;

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 "
      data-testid="home-authorized"
    >
      <HomeUserProgress user={user} />
      {user.usertype === UserType.ORGANIZATION ? <HomeOrgaProgress /> : null}
      <HomeProjects user={user} />
      {user.usertype === UserType.ORGANIZATION ? (
        <HomeProjects recieved user={user} />
      ) : null}
      <HomeOrgaResources />
    </div>
  );
};

export default AuthorizedHome;
