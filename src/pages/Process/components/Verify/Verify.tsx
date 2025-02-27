import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
import ProcessVerifyCard, { VerifyStatus } from "./components/VerifyCard";
import useProcess from "@/hooks/Process/useProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface ProcessVerifyProps {}

const ProcessVerify: React.FC<ProcessVerifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process: _process } = useProcess();

  const getVerifyStatus = (): VerifyStatus => {
    if (_process.processStatus === ProcessStatus.CONTRACTOR_COMPLETED) {
      return VerifyStatus.READY;
    }
    if (_process.processStatus === ProcessStatus.VERIFYING_IN_PROGRESS) {
      return VerifyStatus.STARTED;
    }
    {
      return VerifyStatus.COMPLETED;
    }
  };

  return (
    <ProcessContainer
      id="Verification"
      start={ProcessStatus.CONTRACTOR_COMPLETED}
      end={ProcessStatus.VERIFICATION_FAILED}
      menuButtonTitle={t("Process.components.Verify.button.menu")}
      pageTitle={t("Process.components.Verify.heading")}
      showDelete={_process.processStatus === ProcessStatus.VERIFICATION_FAILED}
    >
      <Container
        width="full"
        direction="row"
        className="flex-wrap md:flex-nowrap"
        items="start"
      >
        <ProcessVerifyCard
          status={getVerifyStatus()}
          type="PROCESS"
          errorMsg={
            _process.processDetails.verificationResults !== undefined &&
            _process.processDetails.verificationResults.serviceReady
              .isSuccessful === false
              ? _process.processDetails.verificationResults.serviceReady.reason
              : undefined
          }
        />
        {_process.serviceType === ServiceType.ADDITIVE_MANUFACTURING ? (
          <ProcessVerifyCard
            status={getVerifyStatus()}
            type="FEM"
            errorMsg={
              _process.processDetails.verificationResults !== undefined &&
              _process.processDetails.verificationResults.serviceSpecificTasks
                .FEM !== undefined &&
              _process.processDetails.verificationResults.serviceSpecificTasks
                .FEM.isSuccessful === false ? (
                <Container direction="col" width="full">
                  {_process.processDetails.verificationResults.serviceSpecificTasks.FEM.groups.map(
                    (group, index) => (
                      <Container direction="col" width="full" key={index}>
                        <Text>
                          {t("general.group") + " " + group.groupID + 1}
                        </Text>
                        {group.models.map((model, index) => (
                          <Container direction="col" width="full" key={index}>
                            <Text>{model.name}</Text>
                            <Text>
                              {t(
                                `types.ProcessVerificationResultFEMError.${model.type}`
                              )}
                            </Text>
                            {model.ssi &&
                            process.env.NODE_ENV === "development" ? (
                              <Text>{model.type}</Text>
                            ) : null}
                          </Container>
                        ))}
                      </Container>
                    )
                  )}
                </Container>
              ) : undefined
            }
          />
        ) : null}
      </Container>
    </ProcessContainer>
  );
};

export default ProcessVerify;
