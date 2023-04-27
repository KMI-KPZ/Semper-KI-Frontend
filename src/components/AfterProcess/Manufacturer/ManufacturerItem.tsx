import React from "react";
import useManufacturer from "../../../hooks/useManufacturer";
import { IProcessItem } from "../../../interface/Interface";
import Loading from "../../Loading/Loading";
import { getModelURI } from "../../../services/utils";
import { useTranslation } from "react-i18next";

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
  const { data, error, status } = useManufacturer();

  const handleOnClickManufacturer = (manufacturerID: string) => {
    setManufacturerIndex(itemIndex, manufacturerID);
  };
  const handleOnChangeInput = (manufacturerID: string) => {
    setManufacturerIndex(itemIndex, manufacturerID);
  };

  return (
    <Loading error={error} status={status}>
      <div className="flex flex-col items-center gap-5 w-full p-2 justify-between bg-white">
        <h2>{processItem.model?.title}</h2>
        <div className="flex flex-col md:flex-row justify-around items-start w-full">
          <img
            src={getModelURI(processItem.model!)}
            className="h-full max-w-xs"
          />
          <div className="flex flex-row md:flex-col gap-5 items-center justify-start">
            <h3>{t("AfterProcess.Manufacturer.ManufacturerItem.header")}</h3>
            {data !== undefined &&
              data.map((manufacturer, manufacturerIndex) => (
                <div
                  className={`flex flex-col sm:flex-row w-full md:w-fit p-5 gap-5
            hover:cursor-pointer transition-all ease-in-out duration-300
            ${
              manufacturer.id === manufacturerID
                ? "shadow-inner bg-slate-50"
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
    </Loading>
  );
};

export default ManufacturerItem;
