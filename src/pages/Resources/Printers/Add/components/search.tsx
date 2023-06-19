import useOntoPrinters from "@/pages/Resources/hooks/useOntoPrinters";
import { OntoPrinter, OntoPrinterFlat } from "@/pages/Resources/types/types";
import { Button, LoadingSuspense } from "@component-library/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ResourcesPrintersAddSearchProps {
  setPrinter(name: string, uri?: string): void;
  printerName: string | undefined;
}

const ResourcesPrintersAddSearch: React.FC<ResourcesPrintersAddSearchProps> = (
  props
) => {
  const { setPrinter, printerName: _printerName } = props;
  const printerName =
    _printerName === undefined ? "" : _printerName.toLocaleLowerCase();
  const { t } = useTranslation();
  const { printersQuery } = useOntoPrinters({});
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleOnFocusInputName = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setShowDropdown(true);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrinter(e.target.value);
  };

  const handleOnClickButtonPrinter = (printer: OntoPrinterFlat) => {
    setShowDropdown(false);
    setPrinter(printer.title, printer.URI);
  };

  const handleOnClickButtonNew = () => {
    setShowDropdown(false);
  };

  const renderDropdown = () => (
    <div className="flex max-h-80 w-full flex-col gap-2 overflow-auto bg-slate-100 p-2 md:absolute md:top-12">
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
                  align="start"
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
        align="start"
        title={t("Resources.Printers.form.button.new")}
        variant="secondary"
        width="full"
        onClick={handleOnClickButtonNew}
      />
    </div>
  );

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center md:flex-row">
      <input
        value={printerName}
        onFocus={handleOnFocusInputName}
        onChange={handleOnChangeInput}
        placeholder={t("Resources.Printers.form.yup.name") + "..."}
        type="search"
        className="w-full bg-slate-100 px-5 py-2 "
      />
      {showDropdown ? renderDropdown() : null}
    </div>
  );
};

export default ResourcesPrintersAddSearch;
