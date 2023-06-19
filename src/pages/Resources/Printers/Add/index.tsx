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
import ResourcesPrintersAddSearch from "./components/search";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

interface ResourcesPrintersAddProps {}

const ResourcesPrintersAdd: React.FC<ResourcesPrintersAddProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [printerID, setPrinterID] = useState<string>("");
  const { printersQuery } = useOntoPrinters({
    printerID,
  });
  const [editPrinter, setEditPrinter] = useState<boolean>(false);
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
          name: yup.string().required(),
          values: yup.array().of(yup.string()).required(),
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
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onChange" });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "properties",
  });

  const onSubmit = (data: FormData) => {
    setEditPrinter(false);
    console.log("onSubmitInvite", data);
  };

  const setPrinter = (name: string, uri?: string) => {
    if (uri !== undefined) setPrinterID(uri);
    setValue("printerName", name);
    setEditPrinter(false);
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
  };

  const renderValueForm = () => {
    return fields !== undefined && fields.length > 0 ? (
      fields.map((prop, propertyIndex) => (
        <div
          className="flex w-full flex-col items-start justify-center gap-5 px-10 md:flex-row"
          key={prop.id}
        >
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
          <div className="flex w-full flex-col items-center justify-center gap-3">
            {watch(`properties.${propertyIndex}.values`) !== undefined ? (
              watch(`properties.${propertyIndex}.values`).map(
                (title, valueIndex) => (
                  <div
                    key={valueIndex}
                    className="flex w-full flex-row items-center justify-center gap-3"
                  >
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

  const renderValueView = () => {
    return fields !== undefined && fields.length > 0 ? (
      fields.map((prop, propertyIndex) => (
        <div
          className="flex w-full flex-col items-start justify-center gap-5 px-10 md:flex-row"
          key={propertyIndex}
        >
          <Text variant="body">{prop.name === "" ? "---" : prop.name}</Text>
          <div className="flex flex-col items-start justify-start gap-2">
            {prop.values.map((value, index) => (
              <Text key={index} variant="body">
                {value === "" ? "---" : value}
              </Text>
            ))}
          </div>
        </div>
      ))
    ) : (
      <Text variant="body">{t("Resources.Printers.form.emptyProps")}</Text>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Printers.form.header")}</Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <ResourcesPrintersAddSearch
          setPrinter={setPrinter}
          printerName={watch("printerName")}
        />
        {editPrinter ? renderValueForm() : renderValueView()}
        <div className="flex w-full flex-col items-center justify-center gap-5 px-10 md:flex-row">
          <Button
            startIcon={<ReplayIcon />}
            title={t("Resources.Printers.form.button.reset")}
            onClick={handleOnClickButtonReset}
          />
          {editPrinter ? (
            <>
              <Button
                startIcon={<AddIcon />}
                title={t("Resources.Printers.form.button.addProperty")}
                onClick={handleOnClickButtonAddProperty}
              />
              <Button
                startIcon={<CheckIcon />}
                title={t("Resources.Printers.form.button.safe")}
                onClick={handleOnClickButtonSafe}
              />
            </>
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
