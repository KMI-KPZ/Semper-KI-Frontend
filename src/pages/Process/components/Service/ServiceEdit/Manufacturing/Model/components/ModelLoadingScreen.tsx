import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Heading,
  LoadingAnimation,
  Modal,
} from "@component-library/index";
import useModal from "@/hooks/useModal";
import { ModelsUpload } from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import { UseMutationResult } from "@tanstack/react-query";

interface ModelLoadingScreenProps {
  loading: boolean;
  uploadModels: UseMutationResult<string, Error, ModelsUpload, unknown>;
}

const ModelLoadingScreen: React.FC<ModelLoadingScreenProps> = (props) => {
  const { loading } = props;
  const { t } = useTranslation();
  const { deleteModal } = useModal();

  const closeModel = () => {
    deleteModal("ModelLoadingScreen");
  };

  return (
    <Modal
      modalKey="ModelLoadingScreen"
      open={loading}
      closeModal={closeModel}
      locked
      noIcon
    >
      <Container width="full" direction="col" className="">
        <Heading variant="h1">
          {t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.LoadingScreen.heading"
          )}
        </Heading>
        <LoadingAnimation />
      </Container>
    </Modal>
  );
};

export default ModelLoadingScreen;
