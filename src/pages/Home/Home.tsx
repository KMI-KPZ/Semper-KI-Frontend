import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { Event } from "@/pages/App/types";
import { ReactNode, useContext } from "react";
import { useTranslation } from "react-i18next";
import AnonymHome from "./Anonym/Anonym";
import AuthorizedHome from "./Authorized/Authorized";
import { ContentBox } from "@component-library/index";

interface Props {}

export const Home: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();

  if (user.usertype === UserType.ANONYM) return <AnonymHome />;
  return (
    <ContentBox>
      <AuthorizedHome user={user} />
    </ContentBox>
  );
};
