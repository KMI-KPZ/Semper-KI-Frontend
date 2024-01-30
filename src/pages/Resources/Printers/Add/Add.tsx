import { Button, Heading, Modal } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOntologyPrinterQuerys from "../../../../api/Ontology/useOntologyPrinterQuerys";
import ResourcesPrintersAddSearch from "./components/Search";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ResourcesPrintersAddPreView from "./components/PreView";
import {
  NewOntoPrinter,
  OntoPrinter,
  OntoPrinterType,
} from "../../types/types";
import PrintersAddForm from "./components/Form";
import useOntologyPrinterMutations from "@/api/Ontology/useOntologyPrinterMutations";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { useNavigate } from "react-router-dom";

interface ResourcesPrintersAddProps {}

const ResourcesPrintersAdd: React.FC<ResourcesPrintersAddProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const [printer, setPrinter] = useState<OntoPrinter | NewOntoPrinter>();
  const [edit, setEdit] = useState<boolean>(false);
  const { addPrinterMutation } = useOntologyPrinterMutations();
  const navigate = useNavigate();

  const handleOnClickButtonEdit = () => {
    setEdit(true);
  };

  const handleOnClickButtonSubmit = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (printer !== undefined)
      addPrinterMutation.mutate(
        {
          organizationID:
            user.organization !== undefined ? user.organization : "",
          printer,
        },
        {
          onSuccess(data, variables, context) {
            navigate("/resources/printers");
          },
        }
      );
  };

  const handleOnClickButtonBack = () => {
    setPrinter(undefined);
    setEdit(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 md:p-5">
      <Heading variant="h2">{t("Resources.Printers.form.header")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {printer === undefined ? (
          <ResourcesPrintersAddSearch setPrinter={setPrinter} />
        ) : (
          <>
            {edit ? (
              <PrintersAddForm
                printer={printer}
                setPrinter={setPrinter}
                setEdit={setEdit}
              />
            ) : (
              <>
                <ResourcesPrintersAddPreView printer={printer} />
                <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
                  <Button
                    startIcon={<ArrowBackIcon />}
                    title={t("Resources.Printers.form.button.back")}
                    onClick={handleOnClickButtonBack}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    title={t(
                      `Resources.Printers.form.button.edit.${printer.type}`
                    )}
                    onClick={handleOnClickButtonEdit}
                  />

                  <Button
                    active={printer !== undefined}
                    variant="primary"
                    endIcon={<ArrowForwardIcon />}
                    title={t("Resources.Printers.form.button.add")}
                    onClick={handleOnClickButtonSubmit}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResourcesPrintersAdd;
