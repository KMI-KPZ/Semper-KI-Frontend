import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import TestIMG from "@images/Test.png";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import { DashboardProject } from "@/api/Project/Querys/useGetDashboardProject";

interface HomeProcessProps {
  project: DashboardProject;
  process: Process;
}

const HomeProcess: React.FC<HomeProcessProps> = (props) => {
  const { project, process } = props;
  const { t } = useTranslation();
  const deleteProcess = useDeleteProcess();

  const handleOnClickButtonDelete = (processID: string) => {
    if (window.confirm(t("Home.Projects.Process.deleteConfirm"))) {
      deleteProcess.mutate({ processIDs: [processID] });
    }
  };

  return (
    <Container
      width="full"
      direction="col"
      justify="start"
      className="m-0 px-5 py-2"
    >
      <Container
        width="full"
        direction="row"
        justify="between"
        className="m-0 px-5 py-2"
      >
        <img className="aspect-square" src={TestIMG} />
        <table className="w-fit table-auto border-separate border-spacing-x-2">
          <tbody>
            <tr>
              <th className="text-left">{t("Home.Projects.Process.name")}</th>
              <td>
                {process.processDetails !== undefined &&
                process.processDetails.title !== undefined
                  ? process.processDetails.title
                  : ""}
              </td>
            </tr>
            <tr>
              <th className="text-left">{t("Home.Projects.Process.type")}</th>
              <td>
                {t(
                  `enum.ServiceType.${
                    ServiceType[process.serviceType] as keyof typeof ServiceType
                  }`
                )}
              </td>
            </tr>
            <tr>
              <th className="text-left">
                {t("Home.Projects.Process.updated")}
              </th>
              <td>{process.updatedWhen.toLocaleString()}</td>
            </tr>
            <tr>
              <th className="text-left">
                {t("Home.Projects.Process.contractor")}
              </th>
              <td>
                {process.contractor === undefined ||
                process.contractor.name === undefined
                  ? t("Home.Projects.Process.noContractor")
                  : process.contractor.name}
              </td>
            </tr>
            {process.serviceType === ServiceType.ADDITIVE_MANUFACTURING ? (
              <tr>
                <th className="text-left">
                  {t("Home.Projects.Process.groups")}
                </th>
                <td>{process.serviceDetails.groups.length}</td>
              </tr>
            ) : null}
            {process.serviceType === ServiceType.ADDITIVE_MANUFACTURING &&
            process.serviceDetails.groups.length > 0 ? (
              <tr>
                <td colSpan={2}>
                  <Container width="full" direction="col" className="gap-2">
                    {process.serviceDetails.groups.map((service, index) => (
                      <Container
                        width="full"
                        key={index}
                        className="rounded-md border-2 p-1"
                      >
                        <table className="w-full table-auto border-collapse">
                          {/* <caption>
                            {service.name === undefined
                              ? t(`Home.Projects.Process.groupName`, {
                                  count: index + 1,
                                })
                              : service.name}
                          </caption> */}
                          <tbody>
                            {/* <tr>
                              <th className="" colSpan={2}>
                                {service.name === undefined
                                  ? t(`Home.Projects.Process.groupName`, {
                                      count: index + 1,
                                    })
                                  : service.name}
                              </th>
                            </tr> */}
                            <tr>
                              <th className="px-2 text-left align-text-top">
                                {t("Home.Projects.Process.models")}
                              </th>
                              <td className="px-2">
                                <Container
                                  width="full"
                                  direction="col"
                                  justify="start"
                                  align="start"
                                  className="gap-0"
                                >
                                  {service.models.length > 0 &&
                                  service.models !== undefined ? (
                                    service.models.map((model, index) => (
                                      <Text
                                        key={index}
                                      >{`•  ${model.quantity}x ${model.fileName}`}</Text>
                                    ))
                                  ) : process.processErrors.find(
                                      (error) =>
                                        error.groupID !== undefined &&
                                        error.groupID === index &&
                                        error.key ===
                                          "Service-ADDITIVE_MANUFACTURING-models"
                                    ) !== undefined ? (
                                    <Button
                                      title={`
                                              ${t(
                                                `types.ProcessError.Service-ADDITIVE_MANUFACTURING-models`
                                              )}
                                            `}
                                      size="sm"
                                      width="fit"
                                      className="text-orange-500"
                                      variant="text"
                                      to={`/projects/${project.projectID}/${process.processID}#Service-ADDITIVE_MANUFACTURING-models`}
                                    />
                                  ) : (
                                    <Text className="w-full text-center">
                                      ---
                                    </Text>
                                  )}
                                </Container>
                              </td>
                            </tr>
                            <tr>
                              <th className="px-2 text-left align-text-top">
                                {t("Home.Projects.Process.material")}
                              </th>
                              <td className="px-2">
                                <Container
                                  width="full"
                                  direction="col"
                                  justify="start"
                                  align="start"
                                  className="gap-0"
                                >
                                  {service.material !== undefined ? (
                                    <Text>{`•  ${service.material.title}`}</Text>
                                  ) : process.processErrors.find(
                                      (error) =>
                                        error.groupID !== undefined &&
                                        error.groupID === index &&
                                        error.key ===
                                          "Service-ADDITIVE_MANUFACTURING-material"
                                    ) !== undefined ? (
                                    <Button
                                      title={`
                                              ${t(
                                                `types.ProcessError.Service-ADDITIVE_MANUFACTURING-material`
                                              )}
                                            `}
                                      size="sm"
                                      width="fit"
                                      className="text-orange-500"
                                      variant="text"
                                      to={`/projects/${project.projectID}/${process.processID}#Service-ADDITIVE_MANUFACTURING-material`}
                                    />
                                  ) : (
                                    <Text className="w-full text-center">
                                      ---
                                    </Text>
                                  )}
                                </Container>
                              </td>
                            </tr>
                            <tr>
                              <th className="px-2 text-left align-text-top">
                                {t("Home.Projects.Process.postProcessings")}
                              </th>
                              <td className="px-2 ">
                                <Container
                                  width="full"
                                  direction="col"
                                  justify="start"
                                  align="start"
                                  className="gap-0"
                                >
                                  {service.postProcessings.length === 0 ||
                                  service.postProcessings === undefined ? (
                                    <Text className="w-full text-center">
                                      ---
                                    </Text>
                                  ) : (
                                    service.postProcessings.map(
                                      (postProcessing, index) => (
                                        <Text
                                          key={index}
                                        >{`•  ${postProcessing.title}`}</Text>
                                      )
                                    )
                                  )}
                                </Container>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Container>
                    ))}
                  </Container>
                </td>
              </tr>
            ) : null}
            {process.processErrors.filter(
              (error) =>
                error.groupID === undefined &&
                error.key !== "Service-ADDITIVE_MANUFACTURING-models" &&
                error.key !== "Service-ADDITIVE_MANUFACTURING-material"
            ).length > 0 ? (
              <tr>
                <th className="text-left">
                  {t("Home.Projects.Process.processErrors")}
                </th>
                <td className="px-2">
                  <Container direction="col" width="full">
                    {process.processErrors
                      .filter(
                        (error) =>
                          error.groupID === undefined &&
                          error.key !==
                            "Service-ADDITIVE_MANUFACTURING-models" &&
                          error.key !==
                            "Service-ADDITIVE_MANUFACTURING-material"
                      )
                      .map((error, index) => (
                        <Container key={index} width="full" justify="between">
                          {/* <Marquee speed={50} className="w-full"> */}
                          <Button
                            title={`
                            ${t(`types.ProcessError.${error.key}`)}
                            ${
                              error.groupID !== undefined
                                ? error.groupID + 1
                                : ""
                            }
                              `}
                            size="sm"
                            width="fit"
                            className="text-orange-500"
                            variant="text"
                            to={`/projects/${project.projectID}/${process.processID}#${error.key}`}
                          />
                        </Container>
                      ))}
                  </Container>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>

        <Container width="fit" direction="col">
          <Button
            title={t("general.button.open")}
            size="sm"
            variant="primary"
            to={`/projects/${project.projectID}/${process.processID}`}
          />
          <Button
            title={t("general.button.delete")}
            size="sm"
            variant="text"
            onClick={() => handleOnClickButtonDelete(process.processID)}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeProcess;
