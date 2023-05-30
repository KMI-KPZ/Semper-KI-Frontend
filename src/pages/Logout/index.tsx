import { LoadingSuspense } from "@component-library/Loading";
import { useTranslation } from "react-i18next";
import { useLogout } from "../Login/hooks/useLogin";

const Logout = () => {
  const { t } = useTranslation();
  const { logoutQuery } = useLogout();
  return (
    <LoadingSuspense query={logoutQuery} animation>
      <h1>{t("Logout.redirect")}</h1>
    </LoadingSuspense>
  );
};

export default Logout;
