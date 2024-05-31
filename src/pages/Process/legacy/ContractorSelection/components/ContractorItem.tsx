import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import ProcessInfoCard from "../../../../Project/components/FlatProcessCard";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ContractorSelectionFormData } from "../ContractorSelection";
import useGetContractors from "@/api/Project/Querys/useGetContractors";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";

interface ProjectContractorSelectionItemProps {
  process: FlatProcess;
  index: number;
  register: UseFormRegister<ContractorSelectionFormData>;
  errors: FieldErrors<ContractorSelectionFormData>;
}

const ProjectContractorSelectionItem: React.FC<
  ProjectContractorSelectionItemProps
> = (props) => {
  const { register, errors, index, process } = props;
  const { t } = useTranslation();
  const contractors = useGetContractors(process.processID);

  return (
    <div
      key={index}
      className={`flex w-full flex-col items-center justify-center gap-20  bg-white p-5 md:flex-row md:items-start md:justify-between `}
    >
      <ProcessInfoCard flatProcess={process} />
      <Container
        direction="col"
        className="grow md:max-w-2xl md:items-start md:justify-start"
      >
        <Heading variant="h2">
          {t(
            "Projects.Project.ContractorSelection.ContractorSelection.contractor"
          )}
        </Heading>
        {contractors.data !== undefined && contractors.data.length > 0 ? (
          contractors.data.map((manufacturer, _index) => (
            <label
              className="flex w-full flex-row items-center justify-center gap-10 p-3 shadow-card"
              key={_index}
            >
              <input
                type="radio"
                {...register(`processes.${index}.contractorID`)}
                value={manufacturer.hashedID}
              />
              <Container direction="col" align="start">
                <Text variant="body">{manufacturer.name}</Text>
                <Text variant="body">{manufacturer.details.adress}</Text>
              </Container>
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
              value=""
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
