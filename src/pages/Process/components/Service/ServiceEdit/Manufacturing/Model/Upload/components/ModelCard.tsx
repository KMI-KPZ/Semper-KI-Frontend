import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import ModelPreview from "@/pages/Test/STLViewer";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ManufacturingModelUploadData,
  ProcessModelUploadFormProps,
} from "../Upload";
import {
  FieldArrayWithId,
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  useForm,
} from "react-hook-form";

interface UploadModelCardProps {
  model: FieldArrayWithId<ProcessModelUploadFormProps, "models", "id">;
  index: number;
  register: UseFormRegister<ProcessModelUploadFormProps>;
  deleteModel: (index: number) => void;
  saveForAll: (index: number) => void;
  errors: FieldErrors<ProcessModelUploadFormProps>;
}

const UploadModelCard: React.FC<UploadModelCardProps> = (props) => {
  const { index, model, register, deleteModel, saveForAll, errors } = props;
  const { t } = useTranslation();
  const url = URL.createObjectURL(model.file);

  const handleOnClickButtonDelete = () => {
    deleteModel(index);
  };

  const handleOnClickButtonSaveAll = () => {
    saveForAll(index);
  };

  const licenseError: boolean =
    errors.models === undefined
      ? false
      : errors.models[index]?.licenses !== undefined;

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[50%] gap-0 rounded-xl border-2 bg-white"
      direction="col"
    >
      <ModelPreview
        interactive={true}
        file={url}
        className="h-40 w-fit rounded-b-none border-0"
      />
      <Divider />
      <Container direction="col" className="p-5">
        <Heading variant="h3">{model.file.name}</Heading>
        <Container direction="row" width="full" align="start">
          <Container direction="col" justify="start" align="start">
            <Text>{`${t(
              `Service.Manufacturing.Model.Upload.components.Form.size`
            )}`}</Text>
            <Text>{`${t(
              `Service.Manufacturing.Model.Upload.components.Form.date`
            )}`}</Text>
            <Text className="py-3">
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.certificate`
              )}`}
            </Text>
            <Text className="py-3">
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.license`
              )}`}
            </Text>
            <Text className="py-3">
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.tags`
              )}`}
            </Text>
          </Container>
          <Container direction="col" justify="start" align="start">
            <Text>{model.file.size}</Text>
            <Text>{new Date().toLocaleDateString()}</Text>
            <input
              className={`flex w-full rounded-xl border-2 p-3
            ${false ? "border-red-500 bg-red-500" : ""}
          }`}
              placeholder={t(
                "Service.Manufacturing.Model.Upload.components.Form.certificatePH"
              )}
              {...register(`models.${index}.certificates`)}
            />
            <select
              {...register(`models.${index}.licenses`, { required: true })}
              className={`flex w-full rounded-xl border-2 p-3 ${
                licenseError ? "border-red-500 " : ""
              }`}
            >
              <option value="" disabled selected>
                {t(
                  `Service.Manufacturing.Model.Upload.components.Form.selectLicense`
                )}
              </option>
              <option value="CC BY">CC BY</option>
              <option value="CC BY-NC">CC BY-NC</option>
              <option value="CC BY-ND">CC BY-ND</option>
              <option value="CC BY-SA">CC BY-SA</option>
              <option value="CC BY-NC-ND">CC BY-NC-ND</option>
              <option value="CC BY-NC-SA">CC BY-NC-SA</option>
            </select>
            <input
              className={`flex w-full rounded-xl border-2 p-3
            ${false ? "border-red-500 bg-red-500" : ""}}`}
              placeholder={t(
                "Service.Manufacturing.Model.Upload.components.Form.tagsPH"
              )}
              {...register(`models.${index}.tags`)}
            />
          </Container>
        </Container>

        <Container direction="row">
          <Button
            variant="text"
            title={t("Service.Manufacturing.Model.Upload.Upload.button.delete")}
            onClick={handleOnClickButtonDelete}
          />
          <Button
            variant="secondary"
            onClick={handleOnClickButtonSaveAll}
            title={t(
              "Service.Manufacturing.Model.Upload.Upload.button.saveAll"
            )}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default UploadModelCard;
