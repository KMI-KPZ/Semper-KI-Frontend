import {
  NewOntoPrinter,
  OntoPrinter,
  OntoPrinterFlat,
} from "@/pages/Resources/types/types";
import {
  Button,
  Container,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOntoPrinters from "@/hooks/useOntoPrinters";
import logger from "@/hooks/useLogger";
import Card from "@component-library/Card/Card";
import useSearch from "@/hooks/useSearch";
import useGetOntologyPrinter from "@/api/Ontology/Querys/useGetOntologyPrinter";
import useLoadOntologyPrinter from "@/api/Ontology/Mutations/useLoadOntologyPrinter";

interface ResourcesPrintersAddSearchProps {
  printer?: OntoPrinter;
  setPrinter(printer: OntoPrinter): void;
}

const ResourcesPrintersAddSearch: React.FC<ResourcesPrintersAddSearchProps> = (
  props
) => {
  const { setPrinter, printer } = props;

  const { t } = useTranslation();
  const { allPrinters } = useOntoPrinters();
  const [printerName, setPrinterName] = useState<string>(
    printer !== undefined ? printer.title : ""
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const loadPrinter = useLoadOntologyPrinter();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoPrinterFlat>();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrinterName(e.target.value);
    handleSearchInputChange(e.target.value);
  };

  const handleOnClickCardPrinter = (printer: OntoPrinterFlat) => {
    setShowDropdown(false);
    setPrinterName(printer.title);
    loadPrinter.mutate(printer.URI, {
      onSuccess(loadedPrinter, variables, context) {
        setPrinter(loadedPrinter);
      },
    });
  };

  const handleOnClickButtonNew = () => {
    setPrinter({ properties: [], title: printerName, type: "new" });
    setShowDropdown(false);
  };

  return (
    <Container width="full" justify="center" direction="col" align="center">
      <Container width="full">
        <Text variant="body">{t("Resources.Printers.view.name")}</Text>
        <input
          value={printerName}
          onChange={handleOnChangeInput}
          placeholder={t("Resources.Printers.form.yup.name") + "..."}
          type="search"
          className="w-full bg-slate-100 px-5 py-2 "
        />
        <Button
          title={t("Resources.Printers.form.button.new")}
          variant="primary"
          onClick={handleOnClickButtonNew}
        />
      </Container>
      <Container
        width="full"
        justify="center"
        direction="row"
        align="center"
        className="flex-wrap"
      >
        {allPrinters
          .slice(0, 50)
          .filter((printer) => filterDataBySearchInput(printer))
          .map((printer, index) => (
            <Card key={index} onClick={() => handleOnClickCardPrinter(printer)}>
              <Text>{printer.title}</Text>
            </Card>
          ))}
      </Container>

      {/* {showDropdown ? renderDropdown() : null} */}
    </Container>
  );
};

export default ResourcesPrintersAddSearch;
