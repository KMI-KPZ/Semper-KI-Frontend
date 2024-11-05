import useUser, { UserType } from "@/hooks/useUser";
import { PropsWithChildren } from "react";
import useGetOrganization from "@/api/Organization/Querys/useGetOrganization";
import { AppLoadingSuspense } from "@component-library/index";
import OrganizationContextProvider from "@/contexts/OrganisationContext";

interface Props {}

export const OrganizationOutlet: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { children } = props;
  const { user } = useUser();
  const organization = useGetOrganization(
    user.usertype === UserType.ORGANIZATION
  );

  if (user.usertype !== UserType.ORGANIZATION) return children;

  if (
    organization.isFetched &&
    organization.data !== undefined &&
    user.usertype === UserType.ORGANIZATION
  )
    return (
      <OrganizationContextProvider organization={organization.data}>
        {children}
      </OrganizationContextProvider>
    );
  else return <AppLoadingSuspense />;
};
