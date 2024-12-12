import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import useGetProcess from "@/api/Process/Querys/useGetProcess";
import TestIMG from "@images/Test.png";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import { FlatProcess, Project } from "@/api/Project/Querys/useGetProject";

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
    if (window.confirm(t("Home.Projects.Project.deleteConfirm"))) {
      deleteProcess.mutate({ processIDs: [processID] });
    }
  };

  if (process.data === undefined) return <LoadingAnimation />;
  return (
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
            <th className="text-left">{t("Home.Projects.Project.name")}</th>
            <td>{process.data.processDetails.title}</td>
          </tr>
          <tr>
            <th className="text-left">{t("Home.Projects.Project.type")}</th>
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
            <th className="text-left">{t("Home.Projects.Project.updated")}</th>
            <td>{process.data.updatedWhen.toLocaleString()}</td>
          </tr>
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
  );
};

export default HomeProcess;
