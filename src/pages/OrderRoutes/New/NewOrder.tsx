import { LoadingAnimation } from "@component-library/Loading";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/Typography";
import { UserType } from "@/hooks/useUser/types";
import { useOrder } from "../hooks/useOrder";

interface NewOrderProps {}

const NewOrder: React.FC<NewOrderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { createOrder } = useOrder();

  useEffect(() => {
    createOrder.mutate();
  }, []);

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-20">
      <LoadingAnimation />
      <Heading variant="h1">{t("NewOrder.order")}</Heading>
    </div>
  );
};

export default NewOrder;
