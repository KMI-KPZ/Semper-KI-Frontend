import { OntoNodePrinter } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesPrintersAddPreViewProps {
  printer: OntoNodePrinter;
}

const ResourcesPrintersAddPreView: React.FC<
  ResourcesPrintersAddPreViewProps
> = (props) => {
  const { printer } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">
        {`${t("Resources.Printers.view.name")} : ${printer.nodeName}`}
      </Heading>
      <Heading variant="h3">{t("Resources.Printers.view.properties")}</Heading>
      {/* {printer.properties !== undefined && printer.properties.length > 0 ? (
        printer.properties.map((prop, propertyIndex) => (
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
      )} */}
    </div>
  );
};

export default ResourcesPrintersAddPreView;
