import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import FilterEdit from "./components/FilterEdit";

interface Props {}

const ProcessFilter: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container
      width="full"
      direction="col"
      className="gap-0 rounded-md border-2 p-0 pb-5"
    >
      <Container width="full" justify="start" className="p-5 pb-2">
        <Heading variant="h3">
          {t("Process.components.Service.Filter.heading")}
        </Heading>
      </Container>
      <FilterEdit />
    </Container>
  );
};

export default ProcessFilter;
