import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import GrayContainer from "@component-library/Container/GrayContainer";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import LogoURL from "@images/logo192.png";
import ActionContainerTodos from "@/components/Process/Container/ActionContainer/components/Todos";

interface ProcessHaederProps {
  process: Process;
}

const ProcessHaeder: React.FC<ProcessHaederProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" justify="start">
      <GrayContainer width="fit" className="self-stretch">
        <Container
          width="fit"
          direction="row"
          className="grow  rounded-md bg-white"
          justify="start"
        >
          <Container width="fit" direction="col" items="end" className="py-3">
            <Container
              width="full"
              direction="col"
              className="gap-0 rounded-r-md bg-gradient-to-l from-teal-600 to-teal-400 p-2 text-white"
              items="end"
            >
              <Text variant="strong">{process.processDetails.title}</Text>
              <Text className="whitespace-nowrap">
                {t("general.createdWhen")}
                {": "}
                {process.createdWhen.toLocaleDateString()}
              </Text>
            </Container>
            <Container
              width="full"
              direction="col"
              className="gap-0 rounded-r-md bg-gradient-to-l from-teal-600 to-teal-400 p-2 text-white"
              items="end"
            >
              <Text variant="strong">
                {t(
                  `enum.ProcessStatus.${
                    ProcessStatus[
                      process.processStatus
                    ] as keyof typeof ProcessStatus
                  }`
                )}
              </Text>
              <Text className="whitespace-nowrap">
                {t("general.updatedWhen")}
                {": "}
                {process.updatedWhen.toLocaleDateString()}
              </Text>
            </Container>
          </Container>
          <Container width="fit" direction="col" className="p-3">
            <img src={LogoURL} alt="" />
          </Container>
        </Container>
      </GrayContainer>
      <GrayContainer width="full" direction="row" className="self-stretch">
        <ActionContainerTodos
          process={process}
          className="row rounded-md bg-white"
        />
      </GrayContainer>
    </Container>
  );
};

export default ProcessHaeder;
