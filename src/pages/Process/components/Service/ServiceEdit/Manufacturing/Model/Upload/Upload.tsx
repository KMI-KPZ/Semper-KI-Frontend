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

interface Props {}

export interface ProcessModelUploadFormProps {
  models: ManufacturingModelUploadData[];
}

export interface ManufacturingModelUploadData {
  tags?: string;
  licenses?: string;
  certificates?: string;
  file: File;
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
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProcessModelUploadFormProps>({
    defaultValues: {
      models: [],
    },
  });
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "models",
  });

  const dataTypes: string[] = [
    ".STEP",
    ".STP",
    ".SLDPRT",
    ".STL",
    ".SAT",
    ".3DXML",
    ".3MF",
    ".PRT",
    ".IPT",
    ".CATPART",
    ".X_T",
    ".PTC",
    ".X_B",
    ".DXF",
  ];

  const addFilesToForm = (files: File[]) => {
    files.forEach((file) => {
      append({ file });
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

  const saveForAll = (index: number) => {
    const overrideModel = watch(`models.${index}`);
    fields.forEach((model, i) => {
      if (i !== index) {
        update(i, {
          file: model.file,
          certificates: overrideModel.certificates,
          licenses: overrideModel.licenses,
          tags: overrideModel.tags,
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

  return (
    <form className="flex h-full w-full flex-col items-center justify-start gap-5">
      <Container width="full" direction="row" justify="between">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.Model.Model.upload.title")}
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
                className="fixed bottom-10 z-10  md:sticky md:right-10"
              >
                {errors.models !== undefined ? (
                  <Text variant="body" className="text-red-500">
                    {t(
                      `Service.Manufacturing.Model.Upload.Upload.error.licenses`
                    )}
                  </Text>
                ) : null}
                <Button
                  width="fit"
                  loading={uploadModels.isLoading}
                  variant="primary"
                  title={t(
                    `Service.Manufacturing.Model.Upload.Upload.button.upload`
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
          title={t("Service.Manufacturing.Model.Upload.Upload.card.title")}
          href="#"
        >
          <UploadIcon className="h-32 w-32" />
          <Heading variant="h2">
            {t("Service.Manufacturing.Model.Upload.Upload.card.title")}
          </Heading>
          {t("Service.Manufacturing.Model.Upload.Upload.card.text")}
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
