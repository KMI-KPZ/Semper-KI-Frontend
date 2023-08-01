import { LoadingAnimation } from "@component-library/Loading";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOrder } from "../Order/hooks/useOrder";
import { useFlatOrders } from "../Orders/hooks/useFlatOrders";
import { Heading } from "@component-library/Typography";

interface DemoProps {}

const Demo: React.FC<DemoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { createOrder } = useOrder();

  useEffect(() => {
    createOrder.mutate(true);
  }, []);

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-20">
      <LoadingAnimation />
      <Heading variant="h1">{t("Demo.title")}</Heading>
    </div>
  );
};

export default Demo;
