import { Button, Container, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOntoPrinters from "@/hooks/useOntoPrinters";
import Card from "@component-library/Card/Card";
import useSearch from "@/hooks/useSearch";
import {
  OntoNode,
  OntoNodeNew,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface ResourcesPrintersAddSearchProps {
  printer?: OntoNode;
  setPrinter(printer: OntoNode | OntoNodeNew): void;
}

const ResourcesPrintersAddSearch: React.FC<ResourcesPrintersAddSearchProps> = (
  props
) => {
  const { setPrinter, printer } = props;

  const { t } = useTranslation();
  const [printerName, setPrinterName] = useState<string>(
    printer !== undefined ? printer.name : ""
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { allPrinters, ownPrinters } = useOntoPrinters();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrinterName(e.target.value);
    handleSearchInputChange(e.target.value);
  };

  const handleOnClickCardPrinter = (printer: OntoNode) => {
    setShowDropdown(false);
    setPrinter(printer);
  };

  const handleOnClickButtonNew = () => {
    setPrinter({
      properties: [],
      name: printerName,
      nodeType: "printer",
      context: "",
    });
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
              <Text>{printer.name}</Text>
            </Card>
          ))}
      </Container>

      {/* {showDropdown ? renderDropdown() : null} */}
    </Container>
  );
};

export default ResourcesPrintersAddSearch;
