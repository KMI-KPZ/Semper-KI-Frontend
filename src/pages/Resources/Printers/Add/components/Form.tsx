import { Button, Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import logger from "@/hooks/useLogger";
import { NewOntoPrinter, OntoPrinter } from "@/pages/Resources/types/types";
import useOntologyMaterialQuerys from "@/api/Ontology/useOntologyMaterialQuerys";
import useOntologyPrinterQuerys from "@/api/Ontology/useOntologyPrinterQuerys";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useOntoPrinters from "@/hooks/useOntoPrinters";
interface PrintersAddFormProps {
  printer: OntoPrinter | NewOntoPrinter;
  setPrinter(printer: OntoPrinter | NewOntoPrinter): void;
  setEdit(edit: boolean): void;
}

const PrintersAddForm: React.FC<PrintersAddFormProps> = (props) => {
  const { printer, setPrinter, setEdit } = props;
  const { t } = useTranslation();
  const { allPrinters } = useOntoPrinters();

  const schema = yup
    .object({
      printerName: yup
        .string()
        .notOneOf(
          [...allPrinters.map((printer) => printer.title)],
          t("Resources.Printers.form.yup.notSamePrinterName")
        )
        .required(
          t("yup.requiredName", {
            name: t("Resources.Printers.form.yup.name"),
          })
        ),
      properties: yup
        .array()
        .required()
        .of(
          yup.object().shape({
            name: yup
              .string()
              .required(t("Resources.Printers.form.yup.propNamerequired")),
            values: yup
              .array()
              .of(
                yup
                  .string()
                  .required(t("Resources.Printers.form.yup.valueItemrequired"))
              )
              .required(t("Resources.Printers.form.yup.valuesRequired")),
          })
        ),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      printerName: printer !== undefined ? printer.title : "",
      properties:
        printer !== undefined
          ? printer.properties.map((property) => ({
              ...property,
            }))
          : [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "properties",
  });

  const onSubmit = (data: FormData) => {
    setPrinter(
      printer.type === "existing"
        ? {
            title: data.printerName,
            properties: data.properties,
            type: "variant",
            lastURI: printer.URI,
          }
        : {
            title: data.printerName,
            properties: data.properties,
            type: "new",
          }
    );
    setEdit(false);
  };

  const handleOnClickButtonAddProperty = () => {
    append({ name: "", values: [""] });
  };

  const handleOnClickButtonRemoveProperty = (index: number) => {
    remove(index);
  };

  const handleOnClickButtonRemoveValue = (
    propertyIndex: number,
    valueIndex: number
  ) => {
    update(propertyIndex, {
      name: fields[propertyIndex].name,
      values: fields[propertyIndex].values.filter(
        (value, index) => index !== valueIndex
      ),
    });
  };

  const handleOnClickButtonAddValue = (index: number) => {
    update(index, {
      name: getValues(`properties.${index}.name`),
      values:
        fields[index].values !== undefined
          ? [...fields[index].values, ""]
          : [""],
    });
  };

  const handleOnClickButtonReset = () => {
    setValue("printerName", printer.title);
    setValue(
      "properties",
      printer.properties.map((property) => ({
        ...property,
      }))
    );
  };

  const handleOnClickButtonBack = () => {
    setEdit(false);
  };

  const getErrorMessage = (propertyIndex: number) => {
    const propertyError =
      errors.properties !== undefined
        ? errors.properties[propertyIndex]
        : undefined;
    const propertyNameError =
      propertyError !== undefined ? propertyError.name : undefined;
    return propertyNameError !== undefined &&
      propertyNameError.message !== undefined ? (
      <Text variant="error">{propertyNameError.message}</Text>
    ) : null;
  };

  const getValueItemErrorMessage = (
    propertyIndex: number,
    valueIndex: number
  ) => {
    const propertyError =
      errors.properties !== undefined
        ? errors.properties[propertyIndex]
        : undefined;
    const propertyValueError =
      propertyError !== undefined
        ? propertyError.values !== undefined
          ? propertyError.values[valueIndex]
          : undefined
        : undefined;
    return propertyValueError !== undefined &&
      propertyValueError.message !== undefined ? (
      <Text variant="error">{propertyValueError.message}</Text>
    ) : null;
  };

  const getValueErrorMessage = (propertyIndex: number) => {
    const propertyError =
      errors.properties !== undefined
        ? errors.properties[propertyIndex]
        : undefined;
    const propertyValueError =
      propertyError !== undefined
        ? propertyError.values !== undefined
          ? propertyError.values
          : undefined
        : undefined;
    return propertyValueError !== undefined &&
      propertyValueError.message !== undefined ? (
      <Text variant="error">{propertyValueError.message}</Text>
    ) : null;
  };

  const renderValueForm = () => {
    return fields !== undefined && fields.length > 0 ? (
      fields.map((prop, propertyIndex) => (
        <div
          className="flex w-full flex-col items-start justify-center gap-5 md:flex-row"
          key={prop.id}
        >
          <div className="flex w-full flex-col items-center justify-start gap-2">
            <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
              <Text variant="body">
                {t("Resources.Printers.form.yup.propName")}
              </Text>
              <input
                placeholder={t("Resources.Printers.form.yup.propName") + "..."}
                {...register(`properties.${propertyIndex}.name`)}
                className="w-full bg-slate-100 px-5 py-2 "
              />
              <Button
                children={<RemoveIcon />}
                size="xs"
                title={t("Resources.Printers.form.button.removeProperty")}
                onClick={() => handleOnClickButtonRemoveProperty(propertyIndex)}
              />
            </div>
            {getErrorMessage(propertyIndex)}
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            {watch(`properties.${propertyIndex}.values`) !== undefined ? (
              watch(`properties.${propertyIndex}.values`).map(
                (title, valueIndex) => (
                  <div
                    key={valueIndex}
                    className="flex w-full flex-col items-center justify-center gap-3"
                  >
                    <div className="flex w-full flex-row items-center justify-center gap-3">
                      <Text variant="body">
                        {t("Resources.Printers.form.yup.value")}
                      </Text>
                      <input
                        placeholder={
                          t("Resources.Printers.form.yup.value") + "..."
                        }
                        {...register(
                          `properties.${propertyIndex}.values.${valueIndex}`
                        )}
                        className="w-full bg-slate-100 px-5 py-2 "
                      />
                      <Button
                        size="xs"
                        title={t("Resources.Printers.form.button.removeValue")}
                        onClick={() =>
                          handleOnClickButtonRemoveValue(
                            propertyIndex,
                            valueIndex
                          )
                        }
                        children={<RemoveIcon />}
                      />
                    </div>
                    {getValueItemErrorMessage(propertyIndex, valueIndex)}
                  </div>
                )
              )
            ) : (
              <>
                <Text variant="body">
                  {t("Resources.Printers.form.emptyValue")}
                </Text>
                {getValueErrorMessage(propertyIndex)}
              </>
            )}
            <Button
              size="xs"
              title={t("Resources.Printers.form.button.addValue")}
              onClick={() => handleOnClickButtonAddValue(propertyIndex)}
              children={<AddIcon />}
            />
          </div>
        </div>
      ))
    ) : (
      <>
        <Text variant="body">{t("Resources.Printers.form.emptyProps")}</Text>{" "}
      </>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <Container width="full" className="flex-wrap">
          <Text variant="body">{t("Resources.Printers.view.name")}</Text>
          <input
            placeholder={t("Resources.Printers.form.yup.name") + "..."}
            type="test"
            className="w-full bg-slate-100 px-5 py-2 md:w-fit md:grow "
            {...register("printerName")}
          />
        </Container>
        {errors.printerName !== undefined &&
        errors.printerName.message !== undefined ? (
          <Text variant="error">{errors.printerName.message}</Text>
        ) : null}
        {renderValueForm()}
        <Button
          size="xs"
          title={t("Resources.Printers.form.button.addValue")}
          onClick={handleOnClickButtonAddProperty}
          children={<AddIcon />}
        />
        <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
          <Button
            startIcon={<ArrowBackIcon />}
            title={t("Resources.Printers.form.button.back")}
            onClick={handleOnClickButtonBack}
          />
          <Button
            startIcon={<ReplayIcon />}
            title={t("Resources.Printers.form.button.reset")}
            onClick={handleOnClickButtonReset}
          />
          <Button
            startIcon={<CheckIcon />}
            title={t("Resources.Printers.form.button.safe")}
            onClick={handleSubmit(onSubmit)}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default PrintersAddForm;
