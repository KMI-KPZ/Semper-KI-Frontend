import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";
import { VerifyFormData } from "../Verification";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { Process } from "@/api/Process/Querys/useGetProcess";

type Props = {
  index: number;
  process: Process;
  register: UseFormRegister<VerifyFormData>;
};

const ProcessVerificationItem: React.FC<Props> = (props) => {
  const { process, register, index } = props;
  const { t } = useTranslation();

  return (
    <label className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 md:flex-row">
      <input
        className="h-10 w-10"
        type="checkbox"
        {...register(`processes.${index}.checked`)}
      />
      <Heading variant="h2">{process.processDetails.title}</Heading>
      <Heading variant="h2">
        {t(
          `enum.ServiceType.${
            ServiceType[process.serviceType] as keyof typeof ServiceType
          }`
        )}
      </Heading>
    </label>
  );
};

export default ProcessVerificationItem;
