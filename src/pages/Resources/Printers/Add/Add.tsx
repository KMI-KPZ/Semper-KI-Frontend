import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useOntoPrinters from "../../hooks/useOntoPrinters";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ResourcesPrintersAddSearch from "./components/Search";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import ResourcesPrintersAddPreView from "./components/PreView";
import logger from "@/hooks/useLogger";

interface ResourcesPrintersAddProps {}

const ResourcesPrintersAdd: React.FC<ResourcesPrintersAddProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [printerID, setPrinterID] = useState<string>("");
  const { printerMutation } = useOntoPrinters({});
  const [editPrinter, setEditPrinter] = useState<boolean>(true);
  const [newPrinter, setNewPrinter] = useState<boolean>(false);

  const schema = yup
    .object({
      printerName: yup.string().required(
        t("yup.required", {
          name: t("Resources.Printers.form.yup.name"),
        })
      ),
      properties: yup.array().of(
        yup.object().shape({
          name: yup
            .string()
            .required(t("Resources.Printers.form.yup.propNamerequired")),
          values: yup.array().of(yup.string().required()).required(),
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "properties",
  });
  const onSubmit = (data: FormData) => {
    setEditPrinter(false);
    logger("onSubmitInvite", data);
  };
  const selectPrinter = (uri?: string) => {
    if (uri !== undefined) {
      printerMutation.mutate(uri, {
        onSuccess(data, variables, context) {
          setPrinterID(uri);
          setValue("properties", data);
        },
      });
      setEditPrinter(false);
    } else {
      setEditPrinter(true);
    }
  };
  const setPrinterName = (name: string) => {
    setValue("printerName", name);
  };
  const handleOnClickButtonEdit = () => {
    setEditPrinter(true);
  };
  const handleOnClickButtonSafe = () => {
    setEditPrinter(false);
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
    reset();
    remove();
    setEditPrinter(true);
  };
  const getErrorMessage = (propertyIndex: number) => {
    const propertiesError = errors.properties;
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
                    className="flex w-full flex-row items-center justify-center gap-3"
                  >
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
                )
              )
            ) : (
              <Text variant="body">
                {t("Resources.Printers.form.emptyValue")}
              </Text>
            )}
            <Button
              title={t("Resources.Printers.form.button.addValue")}
              onClick={() => handleOnClickButtonAddValue(propertyIndex)}
              children={<AddIcon />}
            />
          </div>
        </div>
      ))
    ) : (
      <Text variant="body">{t("Resources.Printers.form.emptyProps")}</Text>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:p-5">
      <Heading variant="h2">{t("Resources.Printers.form.header")}</Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        {editPrinter ? (
          <>
            <ResourcesPrintersAddSearch
              selectPrinter={selectPrinter}
              setPrinterName={setPrinterName}
              printerName={watch("printerName")}
              error={errors.printerName}
            />
            {renderValueForm()}
            <Button
              children={<AddIcon />}
              title={t("Resources.Printers.form.button.addProperty")}
              onClick={handleOnClickButtonAddProperty}
            />
          </>
        ) : (
          <ResourcesPrintersAddPreView
            printerName={getValues("printerName")}
            properties={watch("properties")}
          />
        )}

        <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
          <Button
            startIcon={<ReplayIcon />}
            title={t("Resources.Printers.form.button.reset")}
            onClick={handleOnClickButtonReset}
          />
          {editPrinter ? (
            <Button
              startIcon={<CheckIcon />}
              title={t("Resources.Printers.form.button.safe")}
              onClick={handleOnClickButtonSafe}
            />
          ) : (
            <Button
              startIcon={<EditIcon />}
              title={t("Resources.Printers.form.button.edit")}
              onClick={handleOnClickButtonEdit}
            />
          )}
          <Button
            endIcon={<ArrowForwardIcon />}
            active={!editPrinter}
            title={t("Resources.Printers.form.button.add")}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default ResourcesPrintersAdd;
