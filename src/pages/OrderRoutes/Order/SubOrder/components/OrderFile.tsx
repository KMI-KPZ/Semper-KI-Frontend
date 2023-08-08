import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import DownloadIcon from "@mui/icons-material/Download";
import useOrderFile from "../../hooks/useOrderFiles";
import { Heading } from "@component-library/Typography";
import useFileView from "../../hooks/useFileView";
import { SubOrderProps } from "../../../hooks/useSubOrder";

interface Props {
  subOrder: SubOrderProps;
  orderCollectionID: string;
}

const OrderFile: React.FC<Props> = (props) => {
  const { subOrder: order } = props;
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string>("");
  const { orderFileQuery } = useOrderFile({ orderID: order.id, fileName });
  useFileView(fileName, orderFileQuery, setFileName);

  const handleOnClickButton = (fileName: string) => {
    setFileName(fileName);
  };

  const buttonQuery = fileName !== "" ? orderFileQuery : undefined;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h3">{t("Orders.OrderFileView.header")}</Heading>
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
                  startIcon={<DownloadIcon />}
                  loading={buttonQuery?.isLoading}
                  title={t("Orders.OrderFileView.button.download")}
                />
              </div>
            ))
          : t("Orders.OrderFileView.empty")}
      </div>
    </div>
  );
};

export default OrderFile;
