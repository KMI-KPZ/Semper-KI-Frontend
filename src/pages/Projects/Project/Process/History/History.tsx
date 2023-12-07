import useProcessQuerys from "@/api/Process/useProcessQuerys";
import useProcess from "@/pages/Projects/hooks/useProcess";
import Container from "@component-library/Container";
import Modal from "@component-library/Modal";
import { LoadingSuspense, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProcessHistoryItem from "./components/Item";

interface ProcessHistoryProps {}

const ProcessHistory: React.FC<ProcessHistoryProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { processHistoryQuery } = useProcessQuerys();

  return (
    <Modal
      open
      title="ProcessHistory"
      closeModal={() => {
        navigate("..");
      }}
    >
      <LoadingSuspense query={processHistoryQuery}>
        {processHistoryQuery.data !== undefined ? (
          <Container direction="col">
            {processHistoryQuery.data
              .sort((a, b) => (a.createdWhen < b.createdWhen ? 1 : -1))
              .map((historyItem) => (
                <Container
                  key={historyItem.dataID}
                  direction="col"
                  align="start"
                  justify="between"
                  width="full"
                  className="rounded-xl bg-white p-5"
                >
                  {Object.keys(historyItem).map((untypedKey, index) => {
                    const typedKey = untypedKey as keyof typeof historyItem;
                    return (
                      <Container key={index} align="start">
                        <Text className="md:min-w-[120px]">
                          {t(
                            `Projects.Project.Process.History.History.${typedKey}`
                          )}
                        </Text>
                        <ProcessHistoryItem data={historyItem[typedKey]} />
                      </Container>
                    );
                  })}
                </Container>
              ))}
          </Container>
        ) : (
          <Text>{t("Projects.Project.Process.History.History.noHistory")}</Text>
        )}
      </LoadingSuspense>
    </Modal>
  );
};

export default ProcessHistory;
