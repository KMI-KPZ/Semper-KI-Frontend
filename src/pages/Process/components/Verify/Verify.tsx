import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
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

  const getVerifyStatus = (type: "serviceReady" | "FEM"): VerifyStatus => {
    if (_process.processStatus === ProcessStatus.CONTRACTOR_COMPLETED) {
      return VerifyStatus.READY;
    }
    if (_process.processStatus === ProcessStatus.VERIFYING_IN_PROGRESS) {
      return VerifyStatus.STARTED;
    }
    {
      switch (type) {
        case "serviceReady":
          return _process.processDetails.verificationResults !== undefined &&
            _process.processDetails.verificationResults.serviceReady
              .isSuccessful
            ? VerifyStatus.COMPLETED
            : VerifyStatus.FAILED;
        case "FEM":
          return _process.processDetails.verificationResults !== undefined &&
            _process.processDetails.verificationResults.serviceSpecificTasks
              .FEM !== undefined &&
            _process.processDetails.verificationResults.serviceSpecificTasks.FEM
              .isSuccessful
            ? VerifyStatus.COMPLETED
            : VerifyStatus.FAILED;
      }
    }
  };

  const showFEM = () => {
    return (
      _process.serviceType === ServiceType.ADDITIVE_MANUFACTURING &&
      _process.serviceDetails.groups.some((group) =>
        group.models.some((model) => model.femRequested)
      )
    );
  };

  const getAddtionalTitle = () => {
    if (_process.processStatus === ProcessStatus.CONTRACTOR_COMPLETED)
      return t("Process.components.Verify.components.VerifyStatus.READY");
    if (_process.processStatus === ProcessStatus.VERIFYING_IN_PROGRESS)
      return t(`Process.components.Verify.components.VerifyStatus.STARTED`);
    if (_process.processStatus === ProcessStatus.VERIFICATION_FAILED)
      return t(`Process.components.Verify.components.VerifyStatus.FAILED`);
    if (_process.processStatus === ProcessStatus.VERIFYING_COMPLETED)
      return t(`Process.components.Verify.components.VerifyStatus.COMPLETED`);
    return t(`Process.components.Verify.components.VerifyStatus.COMPLETED`);
  };

  return (
    <ProcessContainer
      id="Verification"
      start={ProcessStatus.CONTRACTOR_COMPLETED}
      end={ProcessStatus.VERIFICATION_FAILED}
      titleAddition={getAddtionalTitle()}
      showDelete={_process.processStatus === ProcessStatus.VERIFICATION_FAILED}
    >
      <Container
        width="full"
        direction="row"
        className="flex-wrap md:flex-nowrap"
        items="start"
      >
        <ProcessVerifyCard
          status={getVerifyStatus("serviceReady")}
          type="PROCESS"
          errorMsg={
            _process.processDetails.verificationResults !== undefined &&
            _process.processDetails.verificationResults.serviceReady
              .isSuccessful === false
              ? t("Process.components.Verify.serviceReady")
              : undefined
          }
        />
        {showFEM() ? (
          <ProcessVerifyCard
            status={getVerifyStatus("FEM")}
            type="FEM"
            errorMsg={
              _process.processDetails.verificationResults !== undefined &&
              _process.processDetails.verificationResults.serviceSpecificTasks
                .FEM !== undefined &&
              _process.processDetails.verificationResults.serviceSpecificTasks
                .FEM.isSuccessful === false ? (
                <Container
                  direction="col"
                  width="full"
                  className=" rounded-md border-2 "
                >
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className=" border-r p-2 text-center align-text-top">
                          {t("general.group")}
                        </th>
                        <th className=" border-r p-2 text-center align-text-top">
                          {t("general.model")}
                        </th>
                        <th className=" p-2 text-center align-text-top">
                          {t("general.error")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {_process.processDetails.verificationResults.serviceSpecificTasks.FEM.groups.map(
                        (group, _index) =>
                          group.models.map((model, index) => (
                            <tr key={index}>
                              {index === 0 ? (
                                <td className="border-r border-t p-2 text-center align-text-top">
                                  {group.groupID + 1}
                                </td>
                              ) : (
                                <td />
                              )}
                              <td className="border-r border-t p-2 text-center  align-text-top">
                                {model.name}
                              </td>
                              <td className="border-t p-2 text-center  align-text-top ">
                                {t(
                                  `types.ProcessVerificationResultFEMError.${model.type}`
                                )}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
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
