import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import React, { PropsWithChildren } from "react";

interface OrganizationContextProviderProps {
  organization: Organization;
}

export type OrganizationContext = {
  organization: Organization;
};

export const OrganizationContext = React.createContext<OrganizationContext>({
  organization: {} as Organization,
});

const OrganizationContextProvider: React.FC<
  PropsWithChildren<OrganizationContextProviderProps>
> = (props) => {
  const { children, organization } = props;

  return (
    <OrganizationContext.Provider value={{ organization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContextProvider;
