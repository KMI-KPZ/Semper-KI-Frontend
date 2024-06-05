import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React, { useContext } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldArrayWithId, UseFormRegister, useForm } from "react-hook-form";
import logger from "@/hooks/useLogger";
import { Button } from "@component-library/index";
import ModelPreview from "@/pages/Test/STLViewer";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import { ManufacturingModelUploadFormData } from "./Forms";
// import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModel";

interface ManufacturingModelUploadFormProps {
  item: FieldArrayWithId<ManufacturingModelUploadFormData, "models", "id">;
  register: UseFormRegister<ManufacturingModelUploadFormData>;
  index: number;
}

const ManufacturingModelUploadForm: React.FC<
  ManufacturingModelUploadFormProps
> = (props) => {
  const { item, register, index } = props;
  const { t } = useTranslation();
  const { project } = useProject();
  const { process } = useProcess();
  const file = item.file;
  const url = URL.createObjectURL(file);

  return (
    <div className="flex h-full w-full flex-col items-start gap-5 overflow-auto bg-white p-5 md:max-w-4xl">
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
          <Text variant="body" className="md:min-w-[150px]">
            {t(
              `Service.Manufacturing.Model.Upload.components.Form.certificate`
            )}
          </Text>
          <input
            className={`flex w-full rounded-xl border-2 p-3
            ${false ? "border-red-500 bg-red-500" : ""}
          }`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.certificatePH"
            )}
            {...register(`models.${index}.certificates`, {})}
          />
        </div>
        <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
          <Text variant="body" className="md:min-w-[150px]">
            {t(`Service.Manufacturing.Model.Upload.components.Form.license`)}
          </Text>
          {/* <input
            className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow 
            ${false ? "border-red-500 bg-red-500" : ""}
          }`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.licensePH"
            )}
            {...register(`models.${index}.licenses`)}
          /> */}
          <select
            {...register(`models.${index}.licenses`)}
            className="flex w-full rounded-xl border-2 p-3"
          >
            <option value="none" disabled>
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
        </div>
        <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
          <Text variant="body" className="md:min-w-[150px]">
            {t(`Service.Manufacturing.Model.Upload.components.Form.tags`)}
          </Text>
          <input
            className={`flex w-full rounded-xl border-2 p-3
            ${false ? "border-red-500 bg-red-500" : ""}}`}
            placeholder={t(
              "Service.Manufacturing.Model.Upload.components.Form.tagsPH"
            )}
            {...register(`models.${index}.tags`)}
          />
        </div>
      </Container>
    </div>
  );
};

export default ManufacturingModelUploadForm;
