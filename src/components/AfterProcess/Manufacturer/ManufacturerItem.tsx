import { IProcessItem } from "@/interface/Interface";
import React from "react";
import Loading from "src/components/Loading/Loading";
import useManufacturer from "src/hooks/useManufacturer";

interface Props {
  processItem: IProcessItem;
}

const ManufacturerItem: React.FC<Props> = (props) => {
  const { processItem } = props;
  const { data, error, status } = useManufacturer();
  return (
    <Loading error={error} status={status}>
      <div className="flex flex-row items-center gap-5 w-full p-5">
        <h2>{processItem.model?.title}</h2>
        {/* {data.map((manufacturer, index) => ( */}
        <div key={0}>
          <h3>{JSON.stringify(data)}</h3>
        </div>
        {/* ))} */}
      </div>
    </Loading>
  );
};

export default ManufacturerItem;
