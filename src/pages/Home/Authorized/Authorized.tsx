import { AuthorizedUser } from "@/hooks/useUser";
import React from "react";
import HomeProjects from "../components/Projects";
import HomeOrgaResources from "../components/Resources";
import HomeUserProgress from "../components/UserProgress";
import HomeOrgaAccountProgress from "../components/OrgaProgress";

interface AuthorizedPropsHome {
  user: AuthorizedUser;
}

const AuthorizedHome: React.FC<AuthorizedPropsHome> = (props) => {
  const { user } = props;

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5"
      data-testid="home-authorized"
    >
      <HomeUserProgress user={user} />
      <HomeOrgaAccountProgress />
      <HomeProjects />
      <HomeOrgaResources />
    </div>
  );
};

export default AuthorizedHome;
