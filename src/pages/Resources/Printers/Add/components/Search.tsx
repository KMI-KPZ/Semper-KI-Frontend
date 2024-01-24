import {
  NewOntoPrinter,
  OntoPrinter,
  OntoPrinterFlat,
} from "@/pages/Resources/types/types";
import { Button, LoadingSuspense, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useOntologyPrinterQuerys from "@/api/Ontology/useOntologyPrinterQuerys";

interface ResourcesPrintersAddSearchProps {
  printer?: OntoPrinter | NewOntoPrinter | undefined;
  setPrinter(printer: OntoPrinter | NewOntoPrinter): void;
}

const ResourcesPrintersAddSearch: React.FC<ResourcesPrintersAddSearchProps> = (
  props
) => {
  const { setPrinter, printer } = props;

  const { t } = useTranslation();
  const { printersQuery } = useOntologyPrinterQuerys({});
  const [printerName, setPrinterName] = useState<string>(
    printer !== undefined ? printer.title : ""
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { printerMutation } = useOntologyPrinterQuerys({});

  const handleOnFocusInputName = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setShowDropdown(true);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrinterName(e.target.value);
  };

  const handleOnClickButtonPrinter = (printer: OntoPrinterFlat) => {
    setShowDropdown(false);
    setPrinterName(printer.title);
    printerMutation.mutate(printer.URI, {
      onSuccess(data, variables, context) {
        setPrinter({
          URI: printer.URI,
          properties: data,
          title: printer.title,
        });
      },
    });
  };

  const handleOnClickButtonNew = () => {
    setPrinter({ URI: "", properties: [], title: printerName });
    setShowDropdown(false);
  };
  const handleOnClickButtonClose = () => {
    setShowDropdown(false);
  };

  const renderDropdown = () => (
    <div className="flex max-h-80 w-full flex-col gap-2 overflow-auto bg-slate-100 p-2 md:absolute md:top-12">
      <Button
        children={<ExpandLessIcon />}
        title={t("Resources.Printers.form.button.close")}
        variant="secondary"
        width="full"
        onClick={handleOnClickButtonClose}
      />
      <LoadingSuspense
        query={printersQuery}
        errorText={t("Resources.Printers.form.empty")}
      >
        {printersQuery.data !== undefined && printersQuery.data.length > 0
          ? printersQuery.data
              .filter((printer) =>
                printer.title
                  .toLocaleLowerCase()
                  .includes(printerName.toLocaleLowerCase())
              )
              .map((printer, index) => (
                <Button
                  key={index}
                  title={printer.title}
                  variant="secondary"
                  width="full"
                  onClick={() => handleOnClickButtonPrinter(printer)}
                />
              ))
          : t("Resources.Printers.form.empty")}
      </LoadingSuspense>
      <Button
        title={t("Resources.Printers.form.button.new")}
        variant="secondary"
        width="full"
        onClick={handleOnClickButtonNew}
      />
    </div>
  );

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Text variant="body">{t("Resources.Printers.view.name")}</Text>
        <input
          value={printerName}
          onFocus={handleOnFocusInputName}
          onChange={handleOnChangeInput}
          placeholder={t("Resources.Printers.form.yup.name") + "..."}
          type="search"
          className="w-full bg-slate-100 px-5 py-2 "
        />
      </div>

      {showDropdown ? renderDropdown() : null}
    </div>
  );
};

export default ResourcesPrintersAddSearch;
