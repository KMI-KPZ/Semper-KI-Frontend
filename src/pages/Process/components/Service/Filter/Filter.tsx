import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import ServiceEdit from "../ServiceEdit/ServiceEdit";
// import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
// import useProcess from "@/hooks/Process/useProcess";

interface Props {}

const ProcessFilter: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  // const { process } = useProcess();

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
      {/* {process.processStatus < ProcessStatus.SERVICE_COMPLETED ? ( */}
      <ServiceEdit />
      {/* ) : null} */}
    </Container>
  );
};

export default ProcessFilter;
