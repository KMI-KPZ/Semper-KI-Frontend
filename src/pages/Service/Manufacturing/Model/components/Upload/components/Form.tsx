import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import React, { useContext } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import useModelUpload from "../../../hooks/useModelUpload";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import ModelPreview from "@/pages/Test/STLViewer";
import { StlViewer } from "react-stl-viewer";

interface ManufacturingModelUploadFormProps {
  file: File;
}

const ManufacturingModelUploadForm: React.FC<
  ManufacturingModelUploadFormProps
> = (props) => {
  const { file } = props;
  const { t } = useTranslation();
  const { uploadModel } = useModelUpload();
  const { status, error } = uploadModel;
  const { project } = useContext(ProjectContext);
  const { process } = useContext(ProcessContext);
  const url = URL.createObjectURL(file);

  const schema = yup
    .object({
      tags: yup.string(),
      licenses: yup.string(),
      certificates: yup.string(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tags: "",
      licenses: "",
      certificates: "",
    },
  });

  const onSubmit = (data: FormData) => {
    logger("onSubmit", data);
    uploadModel.mutate({
      projectID: project.projectID,
      processID: process.processID,
      file: file,
      model: {
        certificates:
          data.certificates === undefined
            ? []
            : data.certificates.split(",").map((item) => item.trim()),
        date: new Date(),
        licenses:
          data.licenses === undefined
            ? []
            : data.licenses.split(",").map((item) => item.trim()),
        tags:
          data.tags === undefined
            ? []
            : data.tags.split(",").map((item) => item.trim()),
      },
    });
  };

  return (
    <form className="flex w-full flex-col gap-5 bg-white p-5 md:max-w-4xl">
      <Heading variant="h1" className="px-10">
        {t("Service.Manufacturing.Model.Upload.components.Form.title")}
      </Heading>
      <Container width="full" direction="col" align="center" justify="center">
        <Text variant="body">{`${t(
          `Service.Manufacturing.Model.Upload.components.Form.name`
        )} ${file.name}`}</Text>
        <ModelPreview file={url} className="h-80" />
        <Text variant="body">{`${t(
          `Service.Manufacturing.Model.Upload.components.Form.size`
        )} ${file.size}`}</Text>
        <Text variant="body">{`${t(
          `Service.Manufacturing.Model.Upload.components.Form.date`
        )} ${new Date().toLocaleDateString()}`}</Text>
      </Container>
      <Container width="full" direction="col" align="center" justify="center">
        <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
          <Text variant="body" className="md:w-2/12">
            {t(
              `Service.Manufacturing.Model.Upload.components.Form.certificate`
            )}
          </Text>
          <input
            className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
              errors.certificates !== undefined
                ? "border-red-500 bg-red-500"
                : ""
            }}`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.certificatePH"
            )}
            {...register("certificates")}
          />
        </div>
        <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
          <Text variant="body" className="md:w-2/12">
            {t(`Service.Manufacturing.Model.Upload.components.Form.license`)}
          </Text>
          <input
            className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
              errors.licenses !== undefined ? "border-red-500 bg-red-500" : ""
            }}`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.licensePH"
            )}
            {...register("licenses")}
          />
        </div>
        <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
          <Text variant="body" className="md:w-2/12">
            {t(`Service.Manufacturing.Model.Upload.components.Form.tags`)}
          </Text>
          <input
            className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
              errors.tags !== undefined ? "border-red-500 bg-red-500" : ""
            }}`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.tagsPH"
            )}
            {...register("tags")}
          />
        </div>
        <Button
          title={t(
            `Service.Manufacturing.Model.Upload.components.Form.button.send`
          )}
          onClick={handleSubmit(onSubmit)}
        />
      </Container>
    </form>
  );
};

export default ManufacturingModelUploadForm;
