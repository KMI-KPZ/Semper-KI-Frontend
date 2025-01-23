import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading } from "@component-library/index";
import useOrganization from "@/hooks/useOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

import CostingTable from "./Table";

interface CostingProps {}

const Costing: React.FC<CostingProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Costing.heading")}</Heading>
      </Container>
      <Divider />
      <Container width="full" direction="col" className="gap-10 pt-5">
        {organization.details.services !== undefined
          ? (
              Object.keys(organization.details.services) as Array<
                keyof typeof ServiceType
              >
            ).map((serviceType, index) => {
              return (
                <CostingTable
                  key={index}
                  serviceType={serviceType as keyof typeof ServiceType}
                />
              );
            })
          : null}
      </Container>
    </Container>
  );
};

export default Costing;
