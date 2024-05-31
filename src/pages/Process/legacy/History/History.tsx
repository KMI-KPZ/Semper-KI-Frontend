import { Container } from "@component-library/index";
import { Modal } from "@component-library/index";
import {
  LoadingAnimation,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProcessHistoryItem from "./components/Item";
import useGetProcessHistory, {
  ProcessHistoryType,
} from "@/api/Process/Querys/useGetProcessHistory";

interface ProcessHistoryProps {}

const ProcessHistory: React.FC<ProcessHistoryProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const processHistory = useGetProcessHistory();

  if (processHistory.isLoading) return <LoadingAnimation />;

  return (
    <Modal
      open
      modalKey="ProcessHistory"
      closeModal={() => {
        navigate("..");
      }}
    >
      {processHistory.data !== undefined ? (
        <Container
          direction="col"
          className="h-full overflow-auto"
          justify="start"
        >
          {processHistory.data
            .sort((a, b) => (a.createdWhen < b.createdWhen ? 1 : -1))
            .map((historyItem, index_) => (
              <Container
                key={index_}
                direction="col"
                align="start"
                justify="between"
                width="full"
                className="rounded-xl bg-white p-5"
              >
                <Container align="start" direction="row" justify="between">
                  <Text className="md:min-w-[120px]">
                    {t(`Projects.Project.Process.History.History.createdBy`)}
                  </Text>
                  <Text>{historyItem.createdBy}</Text>
                </Container>
                <Container align="start" direction="row" justify="between">
                  <Text className="md:min-w-[120px]">
                    {t(`Projects.Project.Process.History.History.createdWhen`)}
                  </Text>
                  <Text>{historyItem.createdWhen.toLocaleString()}</Text>
                </Container>
                <Container align="start" direction="row" justify="between">
                  <Text className="md:min-w-[120px]">
                    {t(`Projects.Project.Process.History.History.type`)}
                  </Text>
                  <Text>
                    {t(
                      `enum.ProcessHistoryType.${
                        ProcessHistoryType[
                          historyItem.type
                        ] as keyof typeof ProcessHistoryType
                      }`
                    )}
                  </Text>
                </Container>
                <Container align="start" direction="row" justify="between">
                  <Text className="md:min-w-[120px]">
                    {t(`Projects.Project.Process.History.History.data`)}
                  </Text>
                  <ProcessHistoryItem item={historyItem} />
                </Container>
              </Container>
            ))}
        </Container>
      ) : (
        <Text>{t("Projects.Project.Process.History.History.noHistory")}</Text>
      )}
    </Modal>
  );
};

export default ProcessHistory;
