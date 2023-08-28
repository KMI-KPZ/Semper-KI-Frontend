import { UserProps, UserType } from "@/hooks/useUser/types";
import { Event } from "@/pages/App/types";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import AnonymHome from "./Anonym/Anonym";
import { Button } from "@component-library/Button";
import AuthorizedHome from "./Authorized/Authorized";

interface Props {
  user: UserProps | undefined;
  events?: Event[];
}

export const Home: React.FC<Props> = (props) => {
  const { user, events } = props;
  const { t } = useTranslation();

  if (user === undefined) return <AnonymHome />;
  return <AuthorizedHome user={user} events={events} />;
};
