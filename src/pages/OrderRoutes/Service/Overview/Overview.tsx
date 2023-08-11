import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import ServiceOverviewItem from "./components/Item";
import { getModelURI } from "@/services/utils";
import IconModel from "@icons/Model.svg";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import useSubOrder, {
  SubOrderProps,
} from "@/pages/OrderRoutes/hooks/useSubOrder";

interface Props {
  subOrders: SubOrderProps[] | undefined;
}

const ServiceOverview: React.FC<Props> = (props) => {
  const { subOrders } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    <div className="flex min-w-fit max-w-sm flex-col justify-start gap-5 bg-white p-5">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <Heading variant="h2">
          {t("Process.Header.Cart.CartItem.title")}
        </Heading>
        <Button
          to=".."
          title={t("Process.Header.Cart.CartItem.button.overview")}
        />
      </div>
      <div className="flex w-full flex-col flex-wrap gap-5">
        {subOrders !== undefined
          ? subOrders.map((subOrder: SubOrderProps, index: number) => (
              <ServiceOverviewItem key={index} subOrder={subOrder} />
            ))
          : null}
        <Button
          title={t("Process.Header.Cart.CartItem.new")}
          startIcon={<AddIcon fontSize="large" />}
          onClick={addNewItem}
        />
      </div>
    </div>
  );
};

export default ServiceOverview;
