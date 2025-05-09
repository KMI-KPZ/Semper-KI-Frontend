import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { Button, Container, Heading, Text } from "@component-library/index";
import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import { useProject } from "@/hooks/Project/useProject";
import useModal from "@/hooks/useModal";
import UploadModelCard from "./components/ModelCard";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
// import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ModelLevelOfDetail } from "@/api/Process/Querys/useGetProcess";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";
import ModelLoadingScreen from "../components/ModelLoadingScreen";
import ErrorDisplay from "@/components/Form/ErrorDisplay";

interface Props {}

export interface ProcessModelUploadFormProps {
  check: boolean;
  models: ManufacturingModelUploadData[];
}

export interface ManufacturingModelUploadData {
  modelID?: string;
  file?: File;
  tags?: string;
  licenses?: string;
  certificates?: string;
  quantity?: number;
  levelOfDetail?: ModelLevelOfDetail;
  scalingFactor?: number;
  femRequested?: boolean;
  testType?: "elongation" | "compression";
  pressure?: number;
}

export const ProcessModelUpload: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { deleteModal } = useModal();
  const { group, groupID } = useContext(ManufacturingGroupContext);

  const { process } = useManufacturingProcess();
  const { project } = useProject();
  const uploadModels = useUploadModels();
  // const updateProcess = useUpdateProcess();

  const formSchema = z.object({
    check: z.boolean().refine((val) => val === true, {
      message: t("zod.required"),
    }),
    models: z.array(
      z.object({
        modelID: z.string().optional(),
        file: z.instanceof(File).optional(),
        tags: z.string().optional(),
        scalingFactor: z.number().min(1).max(100000).optional(),
        licenses: z.string().optional(),
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
        femRequested: z.boolean().optional(),
        testType: z.string().optional(),
        pressure: z.number().min(0).optional(),
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

  const dataTypes: string[] = [".STL", ".STP", ".STEP"];

  const addFilesToForm = (files: File[]) => {
    files.forEach((file) => {
      append({
        file,
        quantity: 1,
        scalingFactor: 100,
        levelOfDetail: ModelLevelOfDetail.MEDIUM,
        femRequested: false,
        testType: "elongation",
        pressure: 0,
      });
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
        groupID: groupID,
        origin: "ServiceDetails",
        models: data.models
          .filter((model) => model.file !== undefined)
          .map((item) => ({
            file: item.file!,
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
              scalingFactor:
                item.scalingFactor !== undefined ? item.scalingFactor : 100,
              femRequested:
                item.femRequested !== undefined ? item.femRequested : false,
              testType: item.testType,
              pressure: item.pressure,
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
                    watch={watch}
                    errors={errors}
                    deleteModel={deleteModel}
                    saveForAll={saveForAll}
                    key={model.id}
                    index={index}
                    model={model}
                    existingModel={group.models?.find(
                      (existingModel) => existingModel.id === model.modelID
                    )}
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
                items="end"
                className="fixed bottom-5 z-10 w-fit self-center pr-5 md:sticky md:self-end"
              >
                <Container
                  width="fit"
                  direction="col"
                  className="rounded-md border-2 bg-white p-3"
                >
                  <Text className="text-center text-sm">
                    {t(
                      "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.disclaimer2"
                    )}
                  </Text>
                  <Container width="full" direction="row">
                    <input
                      type="checkbox"
                      id="disclaimerCheckbox"
                      {...register("check")}
                      className="h-6 w-6"
                    />
                    <label htmlFor="disclaimerCheckbox" className="text-sm">
                      {t(
                        "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.disclaimerCheckBox"
                      )}
                    </label>
                    <Button
                      className="text-sm"
                      variant="text"
                      title={t(
                        "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.nda"
                      )}
                      size="xs"
                      to="/legal/nda"
                    />
                  </Container>
                </Container>
                <ErrorDisplay errors={errors} />
                <Button
                  width="fit"
                  loading={uploadModels.isLoading}
                  variant="primary"
                  active={watch("check") === true}
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
          <UploadIcon className="h-20 w-20 " />
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
      <Container direction="col" width="full" className="gap-1">
        <Text className="text-center text-xs">
          {t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.disclaimer"
          )}
        </Text>
        <Container width="full" className="gap-2">
          <Button
            className="text-sm"
            variant="text"
            title={t(
              "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.termsOfService"
            )}
            size="xs"
            to="/legal/termsOfService"
          />
          <Button
            className="text-sm"
            size="xs"
            variant="text"
            to="/legal/privacyPolicy"
            title={t(
              "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.privacyPolicy"
            )}
          />
        </Container>
      </Container>
      <ModelLoadingScreen
        loading={uploadModels.isLoading}
        uploadModels={uploadModels}
      />
    </form>
  );
};
