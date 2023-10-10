import { LoadingAnimation } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "../Checkout";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";

type Props = {
  index: number;
  process: ProcessProps;
  register: UseFormRegister<CheckoutFormData>;
};

const ProjectCheckoutItem: React.FC<Props> = (props) => {
  const { process, register, index } = props;
  const { t } = useTranslation();

  return (
    <label className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 sm:basis-[48%] md:basis-[32%]">
      <Heading variant="h2">
        {process.details.title}
        {ServiceType[process.service.type]}
      </Heading>
      <input
        className="h-10 w-10"
        type="checkbox"
        {...register(`processes.${index}.checked`)}
      />
    </label>
  );
};

export default ProjectCheckoutItem;
