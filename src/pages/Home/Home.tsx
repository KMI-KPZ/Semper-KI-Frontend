import { User, UserType } from "@/hooks/useUser/types";
import { Event } from "@/pages/App/types";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import AnonymHome from "./Anonym/Anonym";
import { Button } from "@component-library/Button";
import AuthorizedHome from "./Authorized/Authorized";

interface Props {
  userType: UserType;
  user?: User;
  events?: Event[];
}

export interface IHomeItem {
  userTypes: UserType[];
  title: string;
  link: string;
  icon: ReactNode;
}

export const Home: React.FC<Props> = (props) => {
  const { user, userType, events } = props;
  const { t } = useTranslation();

  if (userType === UserType.anonym || user === undefined) return <AnonymHome />;
  return <AuthorizedHome user={user} events={events} />;
};
