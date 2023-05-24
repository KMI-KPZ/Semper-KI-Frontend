import React from "react";
import useManufacturer from "../../../hooks/useManufacturer";
import { IProcessItem } from "../../../interface/Interface";
import { getModelURI } from "../../../services/utils";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";

interface Props {
  itemIndex: number;
  processItem: IProcessItem;
  manufacturerID: string;
  setManufacturerIndex(itemIndex: number, manufacturerID: string): void;
}

const ManufacturerItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { itemIndex, processItem, manufacturerID, setManufacturerIndex } =
    props;
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
        <h2>{processItem.model?.title}</h2>
        <div className="flex w-full flex-col items-start justify-around md:flex-row">
          <img
            src={getModelURI(processItem.model!)}
            className="h-full max-w-xs"
          />
          <div className="flex flex-row items-center justify-start gap-5 md:flex-col">
            <h3>{t("AfterProcess.Manufacturer.ManufacturerItem.header")}</h3>
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
                  <h3>{manufacturer.name}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </LoadingSuspense>
  );
};

export default ManufacturerItem;
