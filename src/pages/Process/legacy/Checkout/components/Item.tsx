import { Heading } from "@component-library/index";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "../Checkout";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";

type Props = {
  index: number;
  process: FlatProcess;
  register: UseFormRegister<CheckoutFormData>;
};

const ProjectCheckoutItem: React.FC<Props> = (props) => {
  const { process, register, index } = props;

  return (
    <label className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 md:flex-row">
      <input
        className="h-10 w-10"
        type="checkbox"
        {...register(`processes.${index}.checked`)}
      />
      <Heading variant="h2">{process.title}</Heading>
      <Heading variant="h2">{ServiceType[process.serviceType]}</Heading>
    </label>
  );
};

export default ProjectCheckoutItem;
