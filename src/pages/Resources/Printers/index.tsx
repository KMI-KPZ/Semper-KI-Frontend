import Table from "@/components/Table";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesPrintersProps {}

const ResourcesPrinters: React.FC<ResourcesPrintersProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3">
      <Heading variant="h2">{t("Resources.Printers.header")}</Heading>
      <Table
        header={[
          <Text variant="body">Name</Text>,
          <Text variant="body">Hersteller</Text>,
          <Text variant="body">use</Text>,
        ]}
        rows={[
          [
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
          ],
          [
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
          ],
          [
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
            <div className="text-center">---</div>,
          ],
        ]}
      />
    </div>
  );
};

export default ResourcesPrinters;
