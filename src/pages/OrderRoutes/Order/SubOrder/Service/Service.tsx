import { GeneralServiceProps } from "@/pages/OrderRoutes/Service/Service";
import { ServiceType } from "@/pages/OrderRoutes/Service/hooks/useService";
import Service from "@/pages/Service/Service";
import React from "react";
import { useTranslation } from "react-i18next";
import SubOrderServiceManufacturing from "./components/Manufacturing";
import SubOrderServiceModelling from "./components/Modelling";
import SubOrderServiceSelect from "./components/Select";
import { Heading } from "@component-library/Typography";
import { Divider } from "@component-library/Divider";
import { Button } from "@component-library/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useSubOrder from "@/pages/OrderRoutes/hooks/useSubOrder";

interface SubOrderServiceProps {
  service: GeneralServiceProps;
  subOrderID: string;
}

const SubOrderService: React.FC<SubOrderServiceProps> = (props) => {
  const { service, subOrderID } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateSubOrderWithSubOrderID } = useSubOrder();

  const renderService = () => {
    if (
      service.type === undefined ||
      (service.type !== undefined && service.type === undefined)
    )
      return <SubOrderServiceSelect />;
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        return <SubOrderServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <SubOrderServiceModelling service={service} />;
    }
  };

  const handleOnClickButtonDelete = () => {
    updateSubOrderWithSubOrderID.mutate({
      subOrderID,
      changes: { service: { type: undefined } },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="flex w-full items-center gap-3">
        <Heading variant="h3" className="whitespace-nowrap">
          {t("Orders.OrderView.Service.title")}{" "}
          {t(`OrderRoutes.Service.type.${ServiceType[service.type]}`)}
        </Heading>
        <Divider className="mt-[0.3rem]" />
        <div className="flex flex-row items-center justify-center gap-3">
          <Button
            title={t("OrderRoutes.Service.Service.button.edit")}
            children={<EditIcon />}
            to={`suborder/${subOrderID}`}
          />
          <Button
            title={t("OrderRoutes.Service.Service.button.delete")}
            children={<DeleteIcon />}
            onClick={handleOnClickButtonDelete}
          />
        </div>
      </div>
      {renderService()}
    </div>
  );
};

export default SubOrderService;
