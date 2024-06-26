import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import { Modal } from "@component-library/index";
import logger from "@/hooks/useLogger";
import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import { useFieldArray, useForm } from "react-hook-form";
import ManufacturingModelUploadForm from "./components/Form";
import ModelPreview from "@/pages/Test/STLViewer";

interface Props {}

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

  const { process } = useProcess();
  const { project } = useProject();
  const [openIndex, setOpenIndex] = React.useState<number | undefined>(
    undefined
  );
  const uploadModels = useUploadModels();
  const [models, setModels] = useState<ManufacturingModelUploadData[]>([]);

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

  const handleChangeHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
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

  const handleDropOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files: File[] = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const addFiles = (inputFiles: File[]): void => {
    setModels((prevState) => [
      ...prevState,
      ...inputFiles.map((file): ManufacturingModelUploadData => ({ file })),
    ]);
  };

  const handleSubmit = () => {
    // logger("onSubmit", data);
    uploadModels.mutate(
      {
        processID: process.processID,
        projectID: project.projectID,
        models: models.map((item) => ({
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
        onSuccess(data, variables, context) {
          setModels([]);
        },
      }
    );
  };

  const hasError = (): boolean => {
    return (
      models.filter(
        (item) => item.licenses === undefined || item.licenses === ""
      ).length > 0
    );
  };

  const handleOnButtonClickEdit = (index: number) => {
    setOpenIndex(index);
  };
  const handleOnButtonClickDelete = (index: number) => {
    setModels((prevState) => [
      ...prevState.filter((item, _index) => _index < index),
      ...prevState.filter((item, _index) => _index > index),
    ]);
  };

  const updateModel = (
    index: number,
    item: ManufacturingModelUploadData,
    all: boolean
  ) => {
    setModels((prevState) =>
      all
        ? [
            ...prevState.filter((_item, _index) => _index < index),
            item,
            ...prevState.filter((_item, _index) => _index > index),
          ].map((_item) => ({ ...item, file: _item.file }))
        : [
            ...prevState.filter((_item, _index) => _index < index),
            item,
            ...prevState.filter((_item, _index) => _index > index),
          ]
    );

    setOpenIndex(undefined);
  };

  return (
    <form className="w-full">
      <Container width="full" direction="col">
        <a
          className={`flex w-full grow flex-col items-center justify-center gap-2  rounded-xl border-2
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
        {models.length > 0 ? (
          <Container width="full" direction="col">
            <Container width="full" direction="row" wrap="wrap">
              {models.map((item, index) => {
                const url = URL.createObjectURL(item.file);
                return (
                  <Container
                    key={index}
                    className="w-fit min-w-[350px] max-w-[50%] gap-0 rounded-xl border-2 bg-white"
                    direction="col"
                  >
                    <ModelPreview
                      interactive={false}
                      file={url}
                      className="h-40 w-fit rounded-b-none border-0"
                    />
                    <Divider />
                    <Container direction="col" className="p-5">
                      <Heading variant="h3">{item.file.name}</Heading>
                      <Container direction="row" width="full" align="start">
                        <Container
                          direction="col"
                          justify="start"
                          align="start"
                        >
                          <Text>{`${t(
                            `Service.Manufacturing.Model.Upload.components.Form.size`
                          )}`}</Text>
                          <Text>{`${t(
                            `Service.Manufacturing.Model.Upload.components.Form.date`
                          )}`}</Text>
                          <Text>
                            {`${t(
                              `Service.Manufacturing.Model.Upload.components.Form.certificate`
                            )}`}
                          </Text>
                          <Text>
                            {`${t(
                              `Service.Manufacturing.Model.Upload.components.Form.license`
                            )}`}
                          </Text>
                          <Text>
                            {`${t(
                              `Service.Manufacturing.Model.Upload.components.Form.tags`
                            )}`}
                          </Text>
                        </Container>
                        <Container
                          direction="col"
                          justify="start"
                          align="start"
                        >
                          <Text>{item.file.size}</Text>
                          <Text>{new Date().toLocaleDateString()}</Text>
                          <Text>{item.certificates}</Text>
                          <Text>{item.licenses}</Text>
                          <Text>{item.tags}</Text>
                        </Container>
                      </Container>

                      <Container direction="row">
                        <Button
                          variant="text"
                          title={t(
                            "Service.Manufacturing.Model.Upload.Upload.button.delete"
                          )}
                          onClick={() => handleOnButtonClickDelete(index)}
                        />
                        <Button
                          variant="secondary"
                          onClick={() => handleOnButtonClickEdit(index)}
                          title={t(
                            "Service.Manufacturing.Model.Upload.Upload.button.edit"
                          )}
                        />
                      </Container>
                    </Container>
                  </Container>
                );
              })}
            </Container>
            {hasError() ? (
              <Text variant="body" className="text-red-500">
                {t(`Service.Manufacturing.Model.Upload.Upload.error.licenses`)}
              </Text>
            ) : null}
            <Button
              loading={uploadModels.isLoading}
              variant="primary"
              title={t(
                `Service.Manufacturing.Model.Upload.Upload.button.upload`
              )}
              onClick={handleSubmit}
              active={!hasError()}
            />
          </Container>
        ) : null}
        <Modal
          modalKey="ManufacturingModelUploadForm"
          open={openIndex !== undefined}
          closeModal={() => {
            setOpenIndex(undefined);
          }}
        >
          {openIndex !== undefined && models[openIndex] !== undefined ? (
            <ManufacturingModelUploadForm
              index={openIndex}
              item={models[openIndex]}
              updateModel={updateModel}
            />
          ) : null}
        </Modal>
      </Container>
    </form>
  );
};
