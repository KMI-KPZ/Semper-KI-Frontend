import useUser, { UserType } from "@/hooks/useUser";
import AnonymHome from "./Anonym/Anonym";
import AuthorizedHome from "./Authorized/Authorized";
import { ContentBox } from "@component-library/index";

interface Props {}

export const Home: React.FC<Props> = (props) => {
  const {} = props;
  const { user } = useUser();

  if (user.usertype === UserType.ANONYM) return <AnonymHome />;
  return (
    <ContentBox>
      <AuthorizedHome user={user} />
    </ContentBox>
  );
};
