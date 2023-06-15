import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useOntoPrinters from "../../hooks/useOntoPrinters";
import { LoadingSuspense } from "@component-library/index";
import { OntoPrinterFlat } from "../../types/types";

interface ResourcesPrintersFormProps {}

const ResourcesPrintersForm: React.FC<ResourcesPrintersFormProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [printerID, setPrinterID] = useState<string>("");
  const { printerQuery, printersQuery } = useOntoPrinters({
    printerID,
  });
  const [showPrinters, setShowPrinters] = useState<boolean>(false);
  const [editPrinter, setEditPrinter] = useState<boolean>(false);
  const [newPrinter, setNewPrinter] = useState<boolean>(false);

  const schema = yup
    .object({
      name: yup.string().required(
        t("yup.required", {
          name: t("Resources.Printers.form.yup.name"),
        })
      ),
      properties: yup.array().of(
        yup.object().shape({
          values: yup.array().of(yup.string()),
        })
      ),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const { fields } = useFieldArray({ control, name: "properties" });

  const onSubmit = (data: FormData) => {
    setEditPrinter(false);
    console.log("onSubmitInvite", data);
  };

  const handleOnFocusInputName = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setShowPrinters(true);
  };

  const handleOnClickButtonPrinter = (printer: OntoPrinterFlat) => {
    setShowPrinters(false);
    setNewPrinter(false);
    setValue("name", printer.title);
    setPrinterID(printer.URI);
  };

  const handleOnClickButtonNew = () => {
    setShowPrinters(false);
    setNewPrinter(true);
  };

  const handleOnClickButtonEdit = () => {
    setEditPrinter(true);
  };
  const handleOnClickButtonSafe = () => {
    setEditPrinter(false);
  };

  const renderDropdown = () => (
    <div className="flex max-h-80 w-full flex-col gap-2 overflow-auto bg-white p-2 md:absolute md:top-12">
      <LoadingSuspense
        query={printersQuery}
        errorText={t("Resources.Printers.form.empty")}
      >
        {printersQuery.data !== undefined && printersQuery.data.length > 0
          ? printersQuery.data
              .filter((printer) =>
                printer.title
                  .toLocaleLowerCase()
                  .includes(watch("name").toLocaleLowerCase())
              )
              .map((printer, index) => (
                <div
                  key={index}
                  className="bg-slate-100 p-2 hover:cursor-pointer hover:bg-slate-200"
                  onClick={() => handleOnClickButtonPrinter(printer)}
                >
                  {printer.title}
                </div>
              ))
          : t("Resources.Printers.form.empty")}
        <div
          className="bg-slate-100 p-2 hover:cursor-pointer hover:bg-slate-200"
          onClick={handleOnClickButtonNew}
        >
          {t("Resources.Printers.form.button.new")}
        </div>
      </LoadingSuspense>
    </div>
  );

  const renderValueInput = () =>
    fields.map((prop, index) => (
      <div
        className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row"
        key={index}
      >
        <Text variant="body">{prop.id}</Text>
        {editPrinter ? (
          <input
            placeholder={t("Resources.Printers.form.yup.name") + "..."}
            {...register(`properties.${index}`)}
            className="w-full bg-slate-100 px-5 py-2 "
          />
        ) : (
          <Text variant="body">{prop.values}</Text>
        )}
      </div>
    ));

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Printers.form.header")}</Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
          <Text variant="body">{t("Resources.Printers.form.yup.name")}</Text>
          <div className="relative z-10 flex w-full flex-col items-center justify-center">
            <input
              onFocus={handleOnFocusInputName}
              placeholder={t("Resources.Printers.form.yup.name") + "..."}
              {...register("name")}
              className="w-full bg-slate-100 px-5 py-2 "
            />
            {showPrinters ? renderDropdown() : null}
          </div>
        </div>
        {printerQuery.data !== undefined ? renderValueInput() : null}
        <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
          {editPrinter ? (
            <Button
              title={t("Resources.Printers.form.button.safe")}
              onClick={handleOnClickButtonSafe}
            />
          ) : (
            <Button
              title={t("Resources.Printers.form.button.edit")}
              onClick={handleOnClickButtonEdit}
            />
          )}
          <Button
            title={t("Resources.Printers.form.button.add")}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default ResourcesPrintersForm;
