import React from "react";
import { useTranslation } from "react-i18next";
import ManufacturingModelUploadForm from "./Form";
import { Button, Container, Heading } from "@component-library/index";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import useUploadModels, {
  UploadModel,
} from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";

interface ManufacturingModelUploadFormsProps {
  files: File[];
}

export interface ManufacturingModelUploadFormData {
  models: {
    tags: string;
    licenses: string;
    certificates: string;
    file: File;
  }[];
}

const ManufacturingModelUploadForms: React.FC<
  ManufacturingModelUploadFormsProps
> = (props) => {
  const { files } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const uploadModels = useUploadModels();
  const { reset, register, watch, handleSubmit, control } =
    useForm<ManufacturingModelUploadFormData>({
      defaultValues: {
        models: files.map((file) => ({
          file,
          tags: "",
          licenses: "none",
          certificates: "",
        })),
      },
    });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "models", // unique name for your Field Array
    }
  );

  const onSubmit = (data: ManufacturingModelUploadFormData) => {
    // logger("onSubmit", data);
    uploadModels.mutate({
      processID: process.processID,
      projectID: project.projectID,
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
    });
  };
  return (
    <Container direction="col">
      <Heading variant="h1" className="px-10">
        {t("Service.Manufacturing.Model.Upload.components.Forms.title")}
      </Heading>
      <form className="w-full">
        <Container width="full" direction="col">
          {fields.map((item, index) => (
            <ManufacturingModelUploadForm
              register={register}
              index={index}
              item={item}
            />
          ))}
          <Button
            loading={uploadModels.isLoading}
            variant="primary"
            title={t(
              `Service.Manufacturing.Model.Upload.components.Form.button.send`
            )}
            onClick={handleSubmit(onSubmit)}
          />
        </Container>
      </form>
    </Container>
  );
};

export default ManufacturingModelUploadForms;
