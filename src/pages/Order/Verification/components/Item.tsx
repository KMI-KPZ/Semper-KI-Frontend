import { LoadingAnimation } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { IRequestState } from "../hooks/useVerification";
import { SubOrderProps } from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { UseFormRegister } from "react-hook-form";
import { VerifyFormData } from "../Verification";

type Props = {
  index: number;
  suborder: SubOrderProps;
  register: UseFormRegister<VerifyFormData>;
};

const SubOrderVerificationItem: React.FC<Props> = (props) => {
  const { suborder, register, index } = props;
  const { t } = useTranslation();

  return (
    <label className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 sm:basis-[48%] md:basis-[32%]">
      <Heading variant="h2">
        {suborder.details.title}
        {ServiceType[suborder.service.type]}
      </Heading>
      <input
        className="h-10 w-10"
        type="checkbox"
        {...register(`suborders.${index}.checked`)}
      />
    </label>
  );
};

export default SubOrderVerificationItem;
