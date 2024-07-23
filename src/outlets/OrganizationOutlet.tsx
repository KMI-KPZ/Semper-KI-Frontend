import { UserType } from "@/hooks/useUser";
import { Error } from "@/pages/Error/Error";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetOrganization from "@/api/Organization/Querys/useGetOrganization";
import { LoadingAnimation } from "@component-library/index";
import OrganizationContextProvider from "@/contexts/OrganisationContext";

interface Props {}

export const OrganizationOutlet: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { children } = props;
  const { user } = useAuthorizedUser();
  const { t } = useTranslation();
  const organization = useGetOrganization();

  if (organization.isLoading) return <LoadingAnimation />;

  if (
    organization.data !== undefined &&
    user.usertype === UserType.ORGANIZATION
  )
    return (
      <OrganizationContextProvider organization={organization.data}>
        <Outlet />
        {children}
      </OrganizationContextProvider>
    );

  return <Error text={t("Outlets.UserOutlets.error.organization")} />;
};
