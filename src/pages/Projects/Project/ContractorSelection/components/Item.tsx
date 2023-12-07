import React from "react";
import { useTranslation } from "react-i18next";
import useCheckedProcesses from "../../hooks/useCheckedProcesses";
import { twMerge } from "tailwind-merge";
import ProcessInfoCard from "../../components/ProcessInfoCard";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ContractorSelectionFormData } from "../ContractorSelection";
import useContractors from "../hooks/useContractor";

interface ProjectContractorSelectionItemProps {
  process: ProcessProps;
  index: number;
  register: UseFormRegister<ContractorSelectionFormData>;
  errors: FieldErrors<ContractorSelectionFormData>;
}

const ProjectContractorSelectionItem: React.FC<
  ProjectContractorSelectionItemProps
> = (props) => {
  const { register, errors, index, process } = props;
  const { t } = useTranslation();
  const { checkedProcesses } = useCheckedProcesses();
  const { contractorsQuery } = useContractors(process.processID);

  return (
    <div
      key={index}
      className={twMerge(
        `flex w-full flex-col items-center justify-center gap-20  p-5 md:flex-row md:items-start md:justify-between`,
        checkedProcesses.includes(process.processID)
          ? "bg-white"
          : "bg-slate-100"
      )}
    >
      <ProcessInfoCard process={process} />
      <Container
        direction="col"
        className="grow md:max-w-2xl md:items-start md:justify-start"
      >
        <Heading variant="h2">
          {t(
            "Projects.Project.ContractorSelection.ContractorSelection.contractor"
          )}
        </Heading>
        {contractorsQuery.data !== undefined &&
        contractorsQuery.data.length > 0 ? (
          contractorsQuery.data.map((manufacturer, _index) => (
            <label
              className="flex w-full flex-row items-center justify-center gap-5 p-3 shadow-card"
              key={_index}
            >
              <input
                type="radio"
                {...register(`processes.${index}.contractorID`, {
                  required: checkedProcesses.includes(process.processID),
                  disabled: !checkedProcesses.includes(process.processID),
                })}
                value={manufacturer.id}
              />
              <Text variant="body">{manufacturer.name}</Text>
            </label>
          ))
        ) : (
          <label className="flex w-full flex-row items-center justify-center gap-5 p-3 shadow-card">
            <input
              type="radio"
              {...register(`processes.${index}.contractorID`, {
                required: true,
                disabled: true,
              })}
              value={""}
            />
            <Text variant="body">No manufacturers found</Text>
          </label>
        )}
        {errors.processes?.[index]?.contractorID ? (
          <Text variant="body" className="text-red-500">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.error.missing"
            )}
          </Text>
        ) : null}
      </Container>
    </div>
  );
};

export default ProjectContractorSelectionItem;
