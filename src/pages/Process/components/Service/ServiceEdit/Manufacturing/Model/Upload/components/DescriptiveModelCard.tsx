import { Button, Container, Divider, Heading } from "@component-library/index";
import React, { HTMLInputTypeAttribute, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  DescriptiveModelFormEditData,
  ProcessModelUploadFormProps,
} from "../Upload";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "rc-slider";
import { twMerge } from "tailwind-merge";

interface UploadDescriptiveModelCardProps {
  index: number;
  register: UseFormRegister<ProcessModelUploadFormProps>;
  deleteModel: (index: number) => void;
  errors: FieldErrors<ProcessModelUploadFormProps>;
  watch: UseFormWatch<ProcessModelUploadFormProps>;
  setValue: UseFormSetValue<ProcessModelUploadFormProps>;
  control: Control<ProcessModelUploadFormProps, any>;
  model: FieldArrayWithId<
    ProcessModelUploadFormProps,
    "descriptiveModels",
    "id"
  >;
}

const UploadDescriptiveModelCard: React.FC<UploadDescriptiveModelCardProps> = (
  props
) => {
  const {
    index,
    watch,
    register,
    setValue,
    deleteModel,
    errors,
    control,
    model,
  } = props;
  const { t } = useTranslation();

  const handleOnClickButtonDelete = () => {
    deleteModel(index);
  };

  const modelErrors =
    errors.descriptiveModels === undefined
      ? undefined
      : errors.descriptiveModels[index];

  const entries: {
    key: keyof DescriptiveModelFormEditData;
    type: HTMLInputTypeAttribute;
    optional?: boolean;
    placeholder?: string;
    unit?: string;
  }[] = [
    {
      key: "name",
      type: "text",
      optional: false,
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.name"),
    },
    { key: "quantity", type: "number", optional: false },
    {
      key: "width",
      type: "number",
      optional: false,
      unit: "mm",
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.width"),
    },
    {
      key: "length",
      type: "number",
      optional: false,
      unit: "mm",
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.length"),
    },
    {
      key: "height",
      type: "number",
      optional: false,
      unit: "mm",
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.height"),
    },
    {
      key: "volume",
      type: "number",
      optional: true,
      unit: "mm³",
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.volume"),
    },
    {
      key: "tags",
      type: "text",
      optional: true,
      placeholder: t("components.Form.DescriptiveModelForm.placeholder.tags"),
    },
  ];

  useEffect(() => {
    const width = watch(`descriptiveModels.${index}.width`);
    const length = watch(`descriptiveModels.${index}.length`);
    const height = watch(`descriptiveModels.${index}.height`);

    if (width && length && height) {
      setValue(`descriptiveModels.${index}.volume`, width * length * height);
    }
  }, [
    watch(`descriptiveModels.${index}.width`),
    watch(`descriptiveModels.${index}.length`),
    watch(`descriptiveModels.${index}.height`),
  ]);

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[50%] gap-0 rounded-md border-2 bg-white "
      direction="col"
    >
      <Divider />
      <Container direction="col" className="p-5">
        <Container width="full" className="relative">
          <Heading variant="h3">{model.name}</Heading>
          <Button
            children={<DeleteIcon fontSize="medium" />}
            className="absolute right-0 top-0"
            variant="text"
            title={t("general.button.delete")}
            onClick={handleOnClickButtonDelete}
          />
        </Container>
        <table className="w-full table-auto border-separate border-spacing-3">
          <tbody>
            {entries.map((entrie, index) => (
              <tr key={index}>
                <th className="text-left">
                  {t(`general.${entrie.key}`)}
                  {entrie.optional ? "" : " *"}
                </th>
                <td>
                  <Container width="full" direction="col" className="gap-2">
                    <Container
                      width="full"
                      direction="row"
                      justify="start"
                      align="center"
                    >
                      <input
                        type={entrie.type}
                        placeholder={entrie.placeholder}
                        className={twMerge(
                          `w-full rounded-md border-2 p-2 md:min-w-[400px]`,
                          modelErrors !== undefined &&
                            modelErrors[entrie.key] !== undefined
                            ? "border-red-500"
                            : "",
                          entrie.type === "number" ? "text-center" : ""
                        )}
                        {...register(
                          `descriptiveModels.${index}.${entrie.key}`,
                          {
                            valueAsNumber: entrie.type === "number",
                          }
                        )}
                      />
                      {entrie.unit && <span>{entrie.unit}</span>}
                    </Container>
                    {modelErrors !== undefined &&
                      modelErrors[entrie.key] !== undefined && (
                        <span className="text-red-500">
                          {modelErrors[entrie.key]!.message}
                        </span>
                      )}
                  </Container>
                </td>
              </tr>
            ))}
            <tr>
              <th className="text-left">
                {t(`general.complexity`)}
                {" *"}
              </th>
              <td>
                <Container width="full" className="p-5">
                  <Controller
                    name={`descriptiveModels.${index}.complexity`}
                    control={control}
                    render={({ field }) => (
                      <Slider
                        className="w-full p-5"
                        dots
                        min={0}
                        max={4}
                        included={false}
                        marks={{
                          0: t(`enum.ModelLevelOfDetail.LOW`),
                          2: t(`enum.ModelLevelOfDetail.MEDIUM`),
                          4: t(`enum.ModelLevelOfDetail.HIGH`),
                        }}
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {modelErrors !== undefined && modelErrors.complexity && (
                    <span className="text-red-500">
                      {modelErrors.complexity.message}
                    </span>
                  )}
                </Container>
              </td>
            </tr>
            <tr>
              <th className="text-left">
                {t(`general.levelOfDetail`)}
                {" *"}
              </th>
              <td>
                <Container width="full" className="p-5">
                  <Controller
                    name={`descriptiveModels.${index}.levelOfDetail`}
                    control={control}
                    render={({ field }) => (
                      <Slider
                        className="w-full p-5"
                        min={0}
                        max={2}
                        included={false}
                        marks={{
                          0: t(`enum.ModelLevelOfDetail.LOW`),
                          1: t(`enum.ModelLevelOfDetail.MEDIUM`),
                          2: t(`enum.ModelLevelOfDetail.HIGH`),
                        }}
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {modelErrors !== undefined && modelErrors.levelOfDetail && (
                    <span className="text-red-500">
                      {modelErrors.levelOfDetail.message}
                    </span>
                  )}
                </Container>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default UploadDescriptiveModelCard;
