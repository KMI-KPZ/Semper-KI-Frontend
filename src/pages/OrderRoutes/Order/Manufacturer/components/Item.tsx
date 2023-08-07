import React from "react";
import useManufacturer from "../hooks/useManufacturer";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { getModelURI } from "@/services/utils";
import { Heading } from "@component-library/Typography";
import { SubOrderProps } from "@/pages/OrderRoutes/hooks/useSubOrder";
import { ServiceType } from "@/pages/OrderRoutes/SubOrder/Service/hooks/useService";

interface Props {
  itemIndex: number;
  subOrder: SubOrderProps;
  manufacturerID: string;
  setManufacturerIndex(itemIndex: number, manufacturerID: string): void;
}

const ProcessManufacturerItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { itemIndex, subOrder, manufacturerID, setManufacturerIndex } = props;
  const { manufacturerQuery } = useManufacturer();

  const handleOnClickManufacturer = (manufacturerID: string) => {
    setManufacturerIndex(itemIndex, manufacturerID);
  };
  const handleOnChangeInput = (manufacturerID: string) => {
    setManufacturerIndex(itemIndex, manufacturerID);
  };

  return (
    <LoadingSuspense query={manufacturerQuery}>
      <div className="flex w-full flex-col items-center justify-between gap-5 bg-white p-2">
        <Heading variant="h2">{ServiceType[subOrder.service.type]}</Heading>
        <div className="flex w-full flex-col items-start justify-around md:flex-row">
          <div className="flex flex-row items-center justify-start gap-5 md:flex-col">
            <Heading variant="h3">
              {t("AfterProcess.Manufacturer.ManufacturerItem.header")}
            </Heading>
            {manufacturerQuery.data !== undefined &&
              manufacturerQuery.data.map((manufacturer, manufacturerIndex) => (
                <div
                  className={`flex w-full flex-col gap-5 p-5 transition-all duration-300
            ease-in-out hover:cursor-pointer sm:flex-row md:w-fit
            ${
              manufacturer.id === manufacturerID
                ? "bg-slate-50 shadow-inner"
                : "shadow-md hover:bg-slate-50 hover:shadow-inner"
            } `}
                  key={manufacturerIndex}
                  onClick={() => handleOnClickManufacturer(manufacturer.id)}
                >
                  <input
                    type="radio"
                    checked={manufacturer.id === manufacturerID}
                    onChange={() => handleOnChangeInput(manufacturer.id)}
                  />
                  <Heading variant="h3">{manufacturer.name}</Heading>
                </div>
              ))}
          </div>
        </div>
      </div>
    </LoadingSuspense>
  );
};

export default ProcessManufacturerItem;
