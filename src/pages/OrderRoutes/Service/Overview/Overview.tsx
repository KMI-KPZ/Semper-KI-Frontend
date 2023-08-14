import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import ServiceOverviewItem from "./components/Item";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import useSubOrder, {
  SubOrderProps,
} from "@/pages/OrderRoutes/hooks/useSubOrder";
import { useOrder } from "../../hooks/useOrder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {}

const ServiceOverview: React.FC<Props> = (props) => {
  const {} = props;
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderQuery } = useOrder();
  const { createSubOrder } = useSubOrder();

  const addNewItem = () => {
    createSubOrder.mutate(undefined, {
      onSuccess(data, variables, context) {
        navigate(`../${data}`);
      },
    });
  };

  // const navigateToUpload = () => {
  //   selectProcess(-1);
  // };

  const selectItem = (index: number) => {
    // selectProcess(index);
  };

  return (
    <div className="flex h-fit w-full flex-col justify-start gap-5 bg-white p-5 md:w-fit md:min-w-fit md:max-w-sm">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <Heading variant="h2">
          {t("Process.Header.Cart.CartItem.title")}
        </Heading>
        <Button
          to=".."
          title={t("Process.Header.Cart.CartItem.button.overview")}
        />
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5">
        {open &&
        orderQuery.data !== undefined &&
        orderQuery.data.subOrders !== undefined &&
        orderQuery.data.subOrders.length > 0
          ? orderQuery.data.subOrders.map(
              (subOrder: SubOrderProps, index: number) => (
                <ServiceOverviewItem key={index} subOrder={subOrder} />
              )
            )
          : null}
        <Button
          variant="secondary"
          title={
            open
              ? t("Process.Header.Cart.CartItem.button.collapse")
              : t("Process.Header.Cart.CartItem.button.expand")
          }
          children={
            <ExpandMoreIcon
              className={`duration-300 ${open ? "rotate-180" : ""}`}
            />
          }
          onClick={() => setOpen(!open)}
          width="full"
        />
        <Button
          width="full"
          title={t("Process.Header.Cart.CartItem.new")}
          startIcon={<AddIcon />}
          onClick={addNewItem}
        />
      </div>
    </div>
  );
};

export default ServiceOverview;
