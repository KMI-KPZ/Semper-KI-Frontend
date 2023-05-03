import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import Button from "../General/Button";
import DownloadIcon from "@mui/icons-material/Download";
import useOrderFile from "../../hooks/useOrderFiles";

interface Props {
  order: IOrder;
  orderCollectionID: string;
}

const OrderFileView: React.FC<Props> = (props) => {
  const { order } = props;
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string>("");
  const { orderFileQuery } = useOrderFile({ orderID: order.id, fileName });
  const handleOnClickButton = (fileName: string) => {
    setFileName(fileName);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5">
      <h3>{t("Orders.OrderFileView.header")}</h3>
      <div className="flex flex-col md:flex-row gap-5 w-full items-center justify-center">
        {order.files.length > 0
          ? order.files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-3"
              >
                <span>{file.name}</span>
                <span>{file.size}</span>
                <Button
                  onClick={() => handleOnClickButton(file.name)}
                  icon={<DownloadIcon />}
                >
                  {t("Orders.OrderFileView.button.download")}
                </Button>
              </div>
            ))
          : t("Orders.OrderFileView.empty")}
      </div>
    </div>
  );
};

export default OrderFileView;
