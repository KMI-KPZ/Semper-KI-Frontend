import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesPrintersAddPreViewProps {
  printerName: string;
  properties?: { name: string; values: string[] }[];
}

const ResourcesPrintersAddPreView: React.FC<
  ResourcesPrintersAddPreViewProps
> = (props) => {
  const { printerName, properties } = props;
  const { t } = useTranslation();

  console.log("ResourcesPrintersAddPreView", properties);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">
        {`${t("Resources.Printers.view.name")} : ${printerName}`}
      </Heading>
      {properties !== undefined ? (
        properties.map((prop, propertyIndex) => (
          <div
            className="flex w-full flex-col items-start justify-center gap-5 px-10 md:flex-row"
            key={propertyIndex}
          >
            <Text variant="body">{prop.name === "" ? "---" : prop.name}</Text>
            <div className="flex flex-col items-start justify-start gap-2">
              {prop.values !== undefined
                ? prop.values.map((value, index) => (
                    <Text key={index} variant="body">
                      {value === "" ? "---" : value}
                    </Text>
                  ))
                : null}
            </div>
          </div>
        ))
      ) : (
        <Text variant="body">{t("Resources.Printers.form.emptyProps")}</Text>
      )}
    </div>
  );
};

export default ResourcesPrintersAddPreView;
