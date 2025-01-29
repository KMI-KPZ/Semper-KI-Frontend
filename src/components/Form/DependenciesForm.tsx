import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading } from "@component-library/index";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { DashboardProject } from "@/api/Project/Querys/useGetDashboardProject";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
interface DependenciesFormProps {
  project: DashboardProject;
  process: Process;
}

export interface DependenciesFormData {
  dependenciesIn: string[];
  dependenciesOut: string[];
}

const DependenciesForm: React.FC<DependenciesFormProps> = (props) => {
  const { process, project } = props;
  const { t } = useTranslation();
  const [data, setData] = useState<DependenciesFormData>({
    dependenciesIn: process.dependenciesIn,
    dependenciesOut: process.dependenciesOut,
  });
  const updateProcess = useUpdateProcess();

  const handleOnChangeDependenciesIn = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    setData((prev) => ({
      ...data,
      dependenciesIn: prev.dependenciesIn.includes(value)
        ? prev.dependenciesIn.filter((dep) => dep !== value)
        : [...prev.dependenciesIn, value],
    }));
  };

  const handleOnChangeDependenciesOut = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    setData((prev) => ({
      ...data,
      dependenciesOut: prev.dependenciesOut.includes(value)
        ? prev.dependenciesOut.filter((dep) => dep !== value)
        : [...prev.dependenciesOut, value],
    }));
  };

  const handleSubmit = () => {
    updateProcess.mutate({
      projectID: project.projectID,
      processIDs: [process.processID],
      updates: {
        changes: {
          dependenciesIn: data.dependenciesIn,
          dependenciesOut: data.dependenciesOut,
        },
        deletions: {
          dependenciesIn: process.dependenciesIn.filter(
            (dep) => !data.dependenciesIn.includes(dep)
          ),
          dependenciesOut: process.dependenciesOut.filter(
            (dep) => !data.dependenciesOut.includes(dep)
          ),
        },
      },
    });
  };

  return (
    <Container width="full" direction="col" justify="start" align="center">
      <Heading variant="h1">
        {t("Home.Projects.Process.addDependencie")}
      </Heading>
      <Container
        className="rounded-md border-2 p-2"
        width="full"
        direction="col"
        justify="start"
        align="center"
      >
        <Heading variant="h2">
          {t("Home.Projects.Process.dependenciesIn")}
        </Heading>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th>{t("Home.Projects.Process.dependenciesTable.name")}</th>
              <th>
                {t("Home.Projects.Process.dependenciesTable.serviceType")}
              </th>
              <th>
                {t("Home.Projects.Process.dependenciesTable.processStatus")}
              </th>
              <th>{t("Home.Projects.Process.dependenciesTable.selected")}</th>
            </tr>
          </thead>
          <tbody>
            {project.processes
              .filter((_process) => _process.processID !== process.processID)
              .map((_process, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {_process.processDetails.title}
                  </td>
                  <td className="text-center">
                    {t(
                      `enum.ServiceType.${
                        ServiceType[
                          _process.serviceType
                        ] as keyof typeof ServiceType
                      }`
                    )}
                  </td>
                  <td className="text-center">
                    {t(
                      `enum.ProcessStatus.${
                        ProcessStatus[
                          project.projectStatus
                        ] as keyof typeof ProcessStatus
                      }`
                    )}
                  </td>
                  <td>
                    <Container width="full">
                      <input
                        onClick={handleOnChangeDependenciesIn}
                        disabled={
                          data.dependenciesOut.includes(_process.processID) &&
                          !data.dependenciesIn.includes(_process.processID)
                        }
                        defaultChecked={data.dependenciesIn.includes(
                          _process.processID
                        )}
                        type="checkbox"
                        value={_process.processID}
                        className="h-6 w-6"
                      />
                    </Container>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
      <Container
        className="rounded-md border-2 p-2"
        width="full"
        direction="col"
        justify="start"
        align="center"
      >
        <Heading variant="h2">
          {t("Home.Projects.Process.dependenciesOut")}
        </Heading>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th>{t("Home.Projects.Process.dependenciesTable.name")}</th>
              <th>
                {t("Home.Projects.Process.dependenciesTable.serviceType")}
              </th>
              <th>
                {t("Home.Projects.Process.dependenciesTable.processStatus")}
              </th>
              <th>{t("Home.Projects.Process.dependenciesTable.selected")}</th>
            </tr>
          </thead>
          <tbody>
            {project.processes
              .filter((_process) => _process.processID !== process.processID)
              .map((_process, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {_process.processDetails.title}
                  </td>
                  <td className="text-center">
                    {t(
                      `enum.ServiceType.${
                        ServiceType[
                          _process.serviceType
                        ] as keyof typeof ServiceType
                      }`
                    )}
                  </td>
                  <td className="text-center">
                    {t(
                      `enum.ProcessStatus.${
                        ProcessStatus[
                          project.projectStatus
                        ] as keyof typeof ProcessStatus
                      }`
                    )}
                  </td>
                  <td>
                    <Container width="full">
                      <input
                        onClick={handleOnChangeDependenciesOut}
                        disabled={
                          data.dependenciesIn.includes(_process.processID) &&
                          !data.dependenciesOut.includes(_process.processID)
                        }
                        defaultChecked={data.dependenciesOut.includes(
                          _process.processID
                        )}
                        type="checkbox"
                        value={_process.processID}
                        className="h-6 w-6"
                      />
                    </Container>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
      <Button
        title={t("general.button.save")}
        size="sm"
        variant="primary"
        onClick={handleSubmit}
      />
    </Container>
  );
};

export default DependenciesForm;
