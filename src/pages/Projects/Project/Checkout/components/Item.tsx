import { LoadingAnimation } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "../Checkout";
import { Process } from "@/pages/Projects/hooks/useProcess";

type Props = {
  index: number;
  process: Process;
  register: UseFormRegister<CheckoutFormData>;
};

const ProjectCheckoutItem: React.FC<Props> = (props) => {
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
      <Heading variant="h2">{ServiceType[process.serviceType]}</Heading>
    </label>
  );
};

export default ProjectCheckoutItem;
