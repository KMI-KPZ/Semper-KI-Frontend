import { User } from "@/hooks/useUser/types";
import { Event } from "@/pages/App/types";
import React from "react";
import { useTranslation } from "react-i18next";

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
      AuthorizedHome
    </div>
  );
};

export default AuthorizedHome;
