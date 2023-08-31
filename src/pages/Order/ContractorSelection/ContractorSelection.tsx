import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@component-library/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Heading, Text } from "@component-library/Typography";
import { OrderProps, OrderState, useOrder } from "@/pages/Order/hooks/useOrder";
import { useForm } from "react-hook-form";
import useSubOrder, { SubOrderProps } from "../SubOrder/hooks/useSubOrder";
import useService, { ServiceType } from "@/pages/Service/hooks/useService";
import useManufacturer from "./hooks/useContractor";

interface Props {}

interface FormData {
  suborders: {
    subOrder: SubOrderProps;
    manufacturerID: string;
  }[];
}

const OrderContractorSelection: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { orderQuery } = useOrder();
  const { t } = useTranslation();
  const { isServiceComplete } = useService();
  const { manufacturerQuery } = useManufacturer();
  const { updateSubOrderWithSubOrderID } = useSubOrder();
  const { subOrderID } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: async () => ({
      suborders:
        orderQuery.data === undefined
          ? []
          : orderQuery.data.subOrders
              .filter((suborder) => isServiceComplete(suborder.subOrderID))
              .map((subOrder) => {
                return {
                  subOrder: subOrder,
                  manufacturerID: "",
                };
              }),
    }),
  });

  const onSubmit = (data: FormData) => {
    data.suborders.forEach((suborder, index, allSubOrders) => {
      updateSubOrderWithSubOrderID.mutate(
        {
          subOrderID: suborder.subOrder.subOrderID,
          updates: {
            changes: {
              state: OrderState.CONTRACTOR_SELECTED,
              contractor: [suborder.manufacturerID],
            },
          },
        },
        {
          onSuccess: () => {
            if (index === allSubOrders.length - 1) {
              navigate("../..");
            }
          },
        }
      );
    });
  };

  return (
    <form className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
        <Heading variant="h1">
          {t("AfterProcess.Manufacturer.ManufacturerView.header")}
        </Heading>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        {orderQuery.data !== undefined && orderQuery.data.subOrders.length > 0
          ? orderQuery.data.subOrders
              .filter((suborder) => isServiceComplete(suborder.subOrderID))
              .map((subOrder, index) => (
                <label
                  key={index}
                  className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 md:flex-row"
                >
                  <Text variant="body">{subOrder.details.title}</Text>
                  <Text variant="body">
                    {ServiceType[subOrder.service.type]}
                  </Text>
                  <div className="flex w-full flex-row items-center justify-center gap-5">
                    {manufacturerQuery.data !== undefined &&
                    manufacturerQuery.data.length > 0 ? (
                      manufacturerQuery.data.map((manufacturer, _index) => (
                        <label
                          className="flex flex-row items-center justify-center gap-5 p-3 shadow-card"
                          key={_index}
                        >
                          <Text variant="body">{manufacturer.name}</Text>
                          <input
                            type="radio"
                            {...register(`suborders.${index}.manufacturerID`, {
                              required: true,
                            })}
                            value={manufacturer.id}
                          />
                        </label>
                      ))
                    ) : (
                      <Text variant="body">No manufacturers found</Text>
                    )}
                  </div>
                  {errors.suborders?.[index]?.manufacturerID ? (
                    <Text variant="body" className="text-red-500">
                      {t(
                        "AfterProcess.Manufacturer.ManufacturerView.error.missing"
                      )}
                    </Text>
                  ) : null}
                </label>
              ))
          : null}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Button
          to=".."
          startIcon={<ArrowBackIcon />}
          title={t(
            "AfterProcess.Manufacturer.ManufacturerView.button.overview"
          )}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          endIcon={<ArrowForwardIcon />}
          title={t(
            "AfterProcess.Manufacturer.ManufacturerView.button.checkOrder"
          )}
        />
      </div>
    </form>
  );
};

export default OrderContractorSelection;
