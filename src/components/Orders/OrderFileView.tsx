import React, { useEffect, useState } from "react";
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
    orderFileQuery.refetch();
  };
  useEffect(() => {
    if (orderFileQuery.data !== undefined) {
      const url = window.URL.createObjectURL(new Blob([orderFileQuery.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode!.removeChild(link);
    }
  }, [orderFileQuery.data]);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5">
      <h3>{t("Orders.OrderFileView.header")}</h3>
      <div className="flex flex-col md:flex-row gap-5 w-full items-center justify-center">
        {order.files.length > 0
          ? order.files.map((fileName, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-3 bg-slate-100"
              >
                <span>{fileName}</span>
                <Button
                  onClick={() => handleOnClickButton(fileName)}
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
