import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Modal } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import { ManufacturingModelContext } from "@/contexts/ManufacturingModelContext";
import EditModelCard from "./EditModelCard";
import DescriptiveModelForm from "@/components/Form/DescriptiveModelForm";

interface ManufacturingModelEditProps {}

const ManufacturingModelEdit: React.FC<ManufacturingModelEditProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { model } = useContext(ManufacturingModelContext);
  const navigate = useNavigate();

  return (
    <Modal
      modalKey="ModelEdit"
      open={true}
      closeModal={() => navigate("../../../../..")}
    >
      <Container width="full" direction="col">
        <Heading variant="h1">
          {t(
            "Process.components.Service.ServiceEdit.Manufacturing.Model.Edit.heading"
          )}
        </Heading>
        {model.isFile ? (
          <EditModelCard model={model} />
        ) : (
          <DescriptiveModelForm model={model} />
        )}
      </Container>
    </Modal>
  );
};

export default ManufacturingModelEdit;
