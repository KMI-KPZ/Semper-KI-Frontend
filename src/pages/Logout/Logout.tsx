import { LoadingSuspense } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import { useTranslation } from "react-i18next";
import { useLogout } from "../Login/hooks/useLogin";

const Logout = () => {
  const { t } = useTranslation();
  const { logoutQuery } = useLogout();
  return (
    <LoadingSuspense query={logoutQuery} animation>
      <Heading variant="h1">{t("Logout.redirect")}</Heading>
    </LoadingSuspense>
  );
};

export default Logout;
