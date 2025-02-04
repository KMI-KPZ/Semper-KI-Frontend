import React, { HTMLInputTypeAttribute, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { twMerge } from "tailwind-merge";
import useUploadDescriptiveModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadDescriptiveModel";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useModal from "@/hooks/useModal";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface DescriptiveModelFormProps {
  model?: ProcessModel;
}

export interface DescriptiveModelFormData {
  name: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  volume: number;
  levelOfDetail: number;
  complexity: number;
  tags: string;
}

const DescriptiveModelForm: React.FC<DescriptiveModelFormProps> = (props) => {
  const { model } = props;
  const { t } = useTranslation();
  const {
    project: { projectID },
  } = useProject();
  const {
    process: { processID },
  } = useProcess();
  const { deleteModal } = useModal();

  const navigate = useNavigate();
  const uploadDescriptiveModel = useUploadDescriptiveModel();
  const updateProcess = useUpdateProcess();
  const { prevGroups, nextGroups, groupID } = useContext(
    ManufacturingGroupContext
  );

  const closeModal = () => {
    deleteModal("");
    navigate(`/projects/${projectID}/${processID}`);
  };

  const formSchema = z.object({
    name: z
      .string({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.string"),
      })
      .min(1, t("zod.required")),
    quantity: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(0, t("zod.numberMin", { min: 0 })),
    width: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(0, t("zod.numberMin", { min: 0 })),
    length: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(0, t("zod.numberMin", { min: 0 })),
    height: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(0, t("zod.numberMin", { min: 0 })),
    volume: z.union([
      z
        .number({
          required_error: t("zod.required"),
          invalid_type_error: t("zod.number"),
        })
        .min(0, t("zod.numberMin", { min: 0 })),
      z.nan(),
    ]),
    levelOfDetail: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(0, t("zod.numberMin", { min: 0 })),
    complexity: z
      .number({
        required_error: t("zod.required"),
        invalid_type_error: t("zod.number"),
      })
      .min(1, t("zod.numberMin", { min: 0 }))
      .max(4, t("zod.numberMax", { max: 4 })),
    tags: z.string(),
  });

  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptiveModelFormData>({
    resolver: zodResolver(formSchema),
    defaultValues:
      model !== undefined
        ? {
            ...model,
            tags: model.tags.join(","),
            quantity: model.quantity ?? 1,
            levelOfDetail: model.levelOfDetail ?? 1,
            complexity: model.complexity,
            name: model.fileName,
          }
        : {
            quantity: 1,
            levelOfDetail: 1,
            complexity: 2,
          },
  });

  const onSubmit = (data: DescriptiveModelFormData) => {
    if (model === undefined) {
      uploadDescriptiveModel.mutate(
        {
          groupID: groupID,
          processID,
          projectID,
          origin: "Service",
          ...data,
          tags: data.tags.split(","),
        },
        { onSuccess: closeModal }
      );
    } else {
      updateProcess.mutate(
        {
          processIDs: [processID],
          updates: {
            changes: {
              serviceDetails: {
                groups: [
                  ...prevGroups,
                  {
                    models: [
                      {
                        ...model,
                        ...data,
                        tags:
                          data.tags === undefined
                            ? []
                            : data.tags.split(",").map((item) => item.trim()),
                        quantity:
                          data.quantity !== undefined ? data.quantity : 1,
                      },
                    ],
                  },
                  ...nextGroups,
                ],
              },
            },
          },
        },
        { onSuccess: closeModal }
      );
    }
  };

  const entries: {
    key: keyof DescriptiveModelFormData;
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
    if (watch("width") && watch("length") && watch("height")) {
      setValue("volume", watch("width") * watch("length") * watch("height"));
    }
  }, [watch("width"), watch("length"), watch("height")]);

  const form = (
    <form className="flex w-full flex-col items-center justify-start gap-2">
      {model === undefined ? (
        <Heading variant="h1">
          {t("components.Form.DescriptiveModelForm.heading")}
        </Heading>
      ) : null}
      <table className="w-fit table-auto border-separate border-spacing-3">
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
                        errors[entrie.key] !== undefined
                          ? "border-red-500"
                          : "",
                        entrie.type === "number" ? "text-center" : ""
                      )}
                      {...register(entrie.key, {
                        valueAsNumber: entrie.type === "number",
                      })}
                    />
                    {entrie.unit && <span>{entrie.unit}</span>}
                  </Container>
                  {errors[entrie.key] && (
                    <span className="text-red-500">
                      {errors[entrie.key]!.message}
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
                  name="complexity"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      className="p-5"
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
                {errors.complexity && (
                  <span className="text-red-500">
                    {errors.complexity.message}
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
                  name="levelOfDetail"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      className="p-5"
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
                {errors.levelOfDetail && (
                  <span className="text-red-500">
                    {errors.levelOfDetail.message}
                  </span>
                )}
              </Container>
            </td>
          </tr>
        </tbody>
      </table>
      <Text>{t("components.Form.DescriptiveModelForm.mandatory")}</Text>
      <Button
        title={t("general.button.save")}
        size="sm"
        variant="primary"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );

  return model === undefined ? (
    <Modal
      modalKey="ServiceRoutesManufacturingModels"
      open={true}
      closeModal={closeModal}
      className=""
    >
      {form}
    </Modal>
  ) : (
    form
  );
};

export default DescriptiveModelForm;
