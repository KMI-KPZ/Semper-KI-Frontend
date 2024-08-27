import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, LoadingAnimation } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import Collapsible from "@/components/Collapsible/Collapsible";
import ManufacturingProcessFilter from "./MaufacturingFilter/Filter";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";

interface ProcessFilterProps {}

const ProcessFilter: React.FC<ProcessFilterProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const filters = useGetFilters();

  return (
    <Container width="full" direction="col" className="card gap-0">
      <Container width="full" justify="start">
        <Heading variant="h3">
          {t("Process.components.Filter.Filter.pageTitle")}
        </Heading>
      </Container>
      <Collapsible initialOpen showButton logName="Filter" animation={false}>
        <Container width="full" direction="col" className="my-5">
          {filters.isLoading ? (
            <LoadingAnimation />
          ) : filters.data !== undefined ? (
            <ManufacturingProcessFilter
              filterOpen
              setFilterOpen={() => {}}
              applyFilters={(filter) => {}}
              filters={filters.data}
            />
          ) : null}
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ProcessFilter;
