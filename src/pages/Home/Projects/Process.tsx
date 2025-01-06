import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useGetProcess from "@/api/Process/Querys/useGetProcess";
import TestIMG from "@images/Test.png";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import { FlatProcess, Project } from "@/api/Project/Querys/useGetProject";
// import Marquee from "react-fast-marquee";

interface HomeProcessProps {
  project: Project;
  flatProcess: FlatProcess;
}

const HomeProcess: React.FC<HomeProcessProps> = (props) => {
  const { project, flatProcess } = props;
  const { t } = useTranslation();
  const process = useGetProcess(project.projectID, flatProcess.processID);
  const deleteProcess = useDeleteProcess();

  const handleOnClickButtonDelete = (processID: string) => {
    if (window.confirm(t("Home.Projects.Process.deleteConfirm"))) {
      deleteProcess.mutate({ processIDs: [processID] });
    }
  };

  if (process.data === undefined) return <LoadingAnimation />;
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
              <td>{process.data.processDetails.title}</td>
            </tr>
            <tr>
              <th className="text-left">{t("Home.Projects.Process.type")}</th>
              <td>
                {t(
                  `enum.ServiceType.${
                    ServiceType[
                      process.data.serviceType
                    ] as keyof typeof ServiceType
                  }`
                )}
              </td>
            </tr>
            <tr>
              <th className="text-left">
                {t("Home.Projects.Process.updated")}
              </th>
              <td>{process.data.updatedWhen.toLocaleString()}</td>
            </tr>
            <tr>
              <th className="text-left">
                {t("Home.Projects.Process.contractor")}
              </th>
              <td>
                {process.data.contractor.name === undefined
                  ? t("Home.Projects.Process.noContractor")
                  : process.data.contractor.name}
              </td>
            </tr>
            {process.data.serviceType === ServiceType.ADDITIVE_MANUFACTURING ? (
              <tr>
                <th className="text-left">
                  {t("Home.Projects.Process.groups")}
                </th>
                <td>{process.data.serviceDetails.length}</td>
              </tr>
            ) : null}
            {process.data.serviceType === ServiceType.ADDITIVE_MANUFACTURING &&
            process.data.serviceDetails.length > 0 ? (
              <tr>
                <td colSpan={2}>
                  <table className="w-full table-auto border-collapse">
                    <tbody>
                      {process.data.serviceDetails.map((service, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <th className="" colSpan={2}>
                              {service.name === undefined
                                ? t(`Home.Projects.Process.groupName`, {
                                    count: index + 1,
                                  })
                                : service.name}
                            </th>
                          </tr>
                          <tr>
                            <th className="text-left align-text-top">
                              {t("Home.Projects.Process.models")}
                            </th>
                            <td>
                              <Container
                                width="full"
                                direction="col"
                                justify="start"
                                align="start"
                                className="gap-0"
                              >
                                {service.models === undefined ? (
                                  <Text className="w-full text-center">
                                    ---
                                  </Text>
                                ) : (
                                  service.models.map((model, index) => (
                                    <Text
                                      key={index}
                                    >{`•  ${model.quantity}x ${model.fileName}`}</Text>
                                  ))
                                )}
                              </Container>
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left align-text-top">
                              {t("Home.Projects.Process.material")}
                            </th>
                            <td>
                              <Container
                                width="full"
                                direction="col"
                                justify="start"
                                align="start"
                                className="gap-0"
                              >
                                {service.material === undefined ? (
                                  <Text className="w-full text-center">
                                    ---
                                  </Text>
                                ) : (
                                  <Text
                                    key={index}
                                  >{`•  ${service.material.title}`}</Text>
                                )}
                              </Container>
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left align-text-top">
                              {t("Home.Projects.Process.postProcessings")}
                            </th>
                            <td className="">
                              <Container
                                width="full"
                                direction="col"
                                justify="start"
                                align="start"
                                className="gap-0"
                              >
                                {service.postProcessings === undefined ? (
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
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ) : null}
            {process.data.processErrors.length > 0 ? (
              <tr>
                <td className="" colSpan={2}>
                  <Container direction="col" width="full">
                    {process.data.processErrors.map((error, index) => (
                      <Container key={index} width="full" justify="between">
                        {/* <Marquee speed={50} className="w-full"> */}
                        <Button
                          title={t(`types.ProcessError.${error}`)}
                          size="sm"
                          width="fit"
                          className="text-orange-500"
                          variant="text"
                          to={`/projects/${project.projectID}/${process.data.processID}#${error}`}
                        />
                        {/* </Marquee> */}
                        <Button
                          title={""}
                          size="sm"
                          width="fit"
                          variant="primary"
                          className="bg-orange-500"
                          children={`>`}
                          to={`/projects/${project.projectID}/${process.data.processID}#${error}`}
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
            to={`/projects/${project.projectID}/${process.data.processID}`}
          />
          <Button
            title={t("general.button.delete")}
            size="sm"
            variant="text"
            onClick={() => handleOnClickButtonDelete(process.data.processID)}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeProcess;
