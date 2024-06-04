import React from "react";
import { useTranslation } from "react-i18next";
import ManufacturingModelUploadForm from "./Form";
import { Container, Heading } from "@component-library/index";

interface ManufacturingModelUploadFormsProps {
  files: File[];
}

const ManufacturingModelUploadForms: React.FC<
  ManufacturingModelUploadFormsProps
> = (props) => {
  const { files } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <Heading variant="h1" className="px-10">
        {t("Service.Manufacturing.Model.Upload.components.Forms.title")}
      </Heading>
      <div className="w-full ">
        {files.map((file: File) => (
          <ManufacturingModelUploadForm file={file} />
        ))}
      </div>
    </Container>
  );
};

export default ManufacturingModelUploadForms;
