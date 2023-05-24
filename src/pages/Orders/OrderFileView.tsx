import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import { Button } from "@component-library/Button";
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
  useEffect(() => {
    if (fileName !== "") {
      orderFileQuery.refetch();
    }
  }, [fileName]);
  useEffect(() => {
    if (orderFileQuery.data !== undefined) {
      const url = window.URL.createObjectURL(orderFileQuery.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      setFileName("");

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode!.removeChild(link);
    }
  }, [orderFileQuery.data]);

  const buttonQuery = fileName !== "" ? orderFileQuery : undefined;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h3 className="">{t("Orders.OrderFileView.header")}</h3>
      <div className="w-full border-b-2" />
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        {order.files.length > 0
          ? order.files.map((_fileName, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-slate-100 p-2"
              >
                <span className="p-2">{_fileName}</span>
                <Button
                  onClick={() => handleOnClickButton(_fileName)}
                  icon={<DownloadIcon />}
                  query={_fileName === fileName ? buttonQuery : undefined}
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
