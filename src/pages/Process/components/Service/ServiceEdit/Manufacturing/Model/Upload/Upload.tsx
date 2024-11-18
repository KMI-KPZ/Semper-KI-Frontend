import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { Button, Container, Heading, Text } from "@component-library/index";
import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useModal from "@/hooks/useModal";
import UploadModelCard from "./components/ModelCard";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModelLevelOfDetail } from "../types";

interface Props {}

export interface ProcessModelUploadFormProps {
  models: ManufacturingModelUploadData[];
}

export interface ManufacturingModelUploadData {
  file: File;
  tags?: string;
  licenses?: string;
  certificates?: string;
  quantity?: number;
  levelOfDetail?: ModelLevelOfDetail;
}

export const ProcessModelUpload: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { deleteModal } = useModal();

  const { process } = useProcess();
  const { project } = useProject();
  const uploadModels = useUploadModels();

  const formSchema = z.object({
    models: z.array(
      z.object({
        file: z.instanceof(File),
        tags: z.string().optional(),
        licenses: z.string().min(
          1,
          t("zod.requiredName", {
            name: t(
              `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.license`
            ),
          })
        ),
        certificates: z.string().optional(),
        quantity: z
          .number()
          .min(1, t("zod.numberMin", { min: 1 }))
          .max(10000000, t("zod.numberMax", { max: 10000000 })),
        levelOfDetail: z.nativeEnum(ModelLevelOfDetail, {
          errorMap: () => ({
            message: t("zod.requiredName", {
              name: t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.levelOfDetail`
              ),
            }),
          }),
        }),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProcessModelUploadFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      models: [],
    },
  });

  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "models",
  });

  const dataTypes: string[] = [".STL"];

  const addFilesToForm = (files: File[]) => {
    files.forEach((file) => {
      append({ file, quantity: 1 });
    });
  };

  const handleChangeHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const files: File[] = Array.from(e.target.files);
      addFilesToForm(files);
    }
  };

  const handleDropOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files: File[] = Array.from(e.dataTransfer.files);
    addFilesToForm(files);
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    // logger("Click on Upload Card");
    hiddenFileInput.current?.click();
  };

  const handleDragOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const deleteModel = (index: number) => {
    remove(index);
  };

  const saveForAll = (
    index: number,
    key: keyof ManufacturingModelUploadData
  ) => {
    const overrideModel = watch(`models.${index}`);
    const currentField = watch(`models`);
    currentField.forEach((model, i) => {
      if (i !== index) {
        update(i, {
          ...model,
          [key]: overrideModel[key],
        });
      }
    });
  };

  const sendModels = (data: ProcessModelUploadFormProps) => {
    uploadModels.mutate(
      {
        processID: process.processID,
        projectID: project.projectID,
        origin: "Service",
        models: data.models.map((item) => ({
          file: item.file,
          details: {
            date: new Date(),
            certificates:
              item.certificates === undefined
                ? []
                : item.certificates.split(",").map((item) => item.trim()),
            licenses:
              item.licenses === undefined
                ? []
                : item.licenses.split(",").map((item) => item.trim()),
            tags:
              item.tags === undefined
                ? []
                : item.tags.split(",").map((item) => item.trim()),
            quantity: item.quantity !== undefined ? item.quantity : 1,
            levelOfDetail:
              item.levelOfDetail !== undefined
                ? item.levelOfDetail
                : ModelLevelOfDetail.MEDIUM,
          },
        })),
      },
      {
        onSuccess() {
          deleteModal("ServiceRoutesManufacturingModels");
        },
      }
    );
  };

  const getCompressedErrors = (): string[] => {
    const uniqueErrors = new Set<string>();

    // Iterate through the nested errors object
    Object.values(errors.models || []).forEach((modelErrors) => {
      if (modelErrors && typeof modelErrors === "object") {
        Object.values(modelErrors).forEach((error) => {
          if (error && "message" in error) {
            uniqueErrors.add((error as { message: string }).message);
          }
        });
      }
    });

    return Array.from(uniqueErrors);
  };

  return (
    <form className="flex h-full w-full flex-col items-center justify-start gap-5">
      <Container width="full" direction="row" justify="between">
        <Heading variant="h2" className="w-full text-left">
          {t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.heading"
          )}
        </Heading>
      </Container>

      <Container width="full" direction="col">
        {fields.length > 0 ? (
          <Container width="full" direction="col">
            <Container width="full" direction="row" wrap="wrap">
              {fields.map((model, index) => {
                return (
                  <UploadModelCard
                    errors={errors}
                    deleteModel={deleteModel}
                    saveForAll={saveForAll}
                    key={model.id}
                    index={index}
                    model={model}
                    register={register}
                  />
                );
              })}
            </Container>
            {fields.length > 0 ? (
              <Container
                width="full"
                direction="row"
                justify="end"
                align="end"
                className="fixed bottom-5 z-10  w-fit self-center pr-5 md:sticky md:self-end"
              >
                {errors !== undefined && getCompressedErrors().length > 0 ? (
                  <Container
                    className="rounded-md border-2 bg-white p-3"
                    direction="col"
                  >
                    {getCompressedErrors().map((error, index) => (
                      <Text key={index} className=" text-red-500">
                        {error}
                      </Text>
                    ))}
                  </Container>
                ) : null}
                <Button
                  width="fit"
                  loading={uploadModels.isLoading}
                  variant="primary"
                  title={t(
                    `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.button.upload`
                  )}
                  onClick={handleSubmit(sendModels)}
                  // className="fixed bottom-10 z-10 md:sticky md:right-10 "
                />
              </Container>
            ) : null}
          </Container>
        ) : null}
        <a
          className={`flex w-full grow flex-col items-center justify-center gap-2  rounded-md border-2
        bg-white p-2 text-black transition
        duration-300  hover:cursor-pointer hover:bg-türkis-200
        ${dragActive ? "bg-türkis-200" : ""}
        `}
          onClick={handleClickUploadCard}
          onDragEnter={handleDragOnUploadCard}
          onDragLeave={handleDragOnUploadCard}
          onDragOver={handleDragOnUploadCard}
          onDrop={handleDropOnUploadCard}
          title={t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.heading"
          )}
          href="#"
        >
          <UploadIcon className="h-32 w-32" />
          <Heading variant="h2">
            {t(
              "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.heading"
            )}
          </Heading>
          {t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.text"
          )}
        </a>
        <input
          accept={dataTypes.map((type: string) => type).join(",")}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChangeHiddenInput}
          className="hidden"
          multiple
        />
      </Container>
    </form>
  );
};
