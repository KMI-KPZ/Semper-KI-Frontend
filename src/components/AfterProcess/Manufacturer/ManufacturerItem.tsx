import { IProcessItem } from "@/interface/Interface";
import React, { useState } from "react";
import Loading from "src/components/Loading/Loading";
import useManufacturer from "src/hooks/useManufacturer";

interface Props {
  itemIndex: number;
  processItem: IProcessItem;
  manufacturerID: string;
  setManufacturerIndex(itemIndex: number, manufacturerID: string): void;
}

const ManufacturerItem: React.FC<Props> = (props) => {
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
      <div className="flex flex-col md:flex-row items-center gap-5 w-full p-5 justify-between">
        <h2>{processItem.model?.title}</h2>
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
    </Loading>
  );
};

export default ManufacturerItem;
