import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import Collapsible from "@/components/Collapsible/Collapsible";
import ManufacturingProcessFilter, {
  FilterItemProps,
} from "./MaufacturingFilter/Filter";
import useProcess from "@/hooks/Process/useProcess";

interface ProcessFilterProps {}

const ProcessFilter: React.FC<ProcessFilterProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { filters, setFilters } = useProcess();

  const applyFilters = (filters: FilterItemProps[]) => {
    setFilters(filters);
  };

  return (
    <Container width="full" direction="col" className="card gap-0">
      <Container width="full" justify="start">
        <Heading variant="h3">
          {t("Process.components.Filter.Filter.pageTitle")}
        </Heading>
      </Container>
      <Collapsible initialOpen showButton logName="Filter" animation={false}>
        <Container width="full" direction="col" className="my-5">
          <ManufacturingProcessFilter
            filters={filters}
            applyFilters={applyFilters}
          />
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ProcessFilter;
