import React, { PropsWithChildren, useContext } from "react";
import { Button, Container, Divider } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/index";
import { RepositoryModel } from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetRepositoryModels";
import {
  ModelComplexity,
  ModelLevelOfDetail,
  ProcessModel,
} from "@/api/Process/Querys/useGetProcess";
import usePostRepositoryModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/usePostRepositoryModel";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";
import { getFileSizeAsString } from "@/services/utils";

interface Props {
  model: RepositoryModel;
  openModelView(model: ProcessModel): void;
  closeModal(): void;
}

export const ProcessModelCard: React.FC<PropsWithChildren<Props>> = (props) => {
  const { t } = useTranslation();
  const { model, children, closeModal } = props;
  const postRepositoryModel = usePostRepositoryModel();
  const { process } = useProcess();
  const { project } = useProject();
  const { groupID } = useContext(ManufacturingGroupContext);

  const handleOnClickButtonSelect = (model: RepositoryModel) => {
    postRepositoryModel.mutate(
      {
        groupID: groupID,
        processID: process.processID,
        projectID: project.projectID,
        model: model,
        origin: "ServiceDetails",
      },
      { onSuccess: () => closeModal() }
    );
  };

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[45%] gap-0 rounded-md border-2 bg-white"
      direction="col"
    >
      <img src={model.preview} className="h-fit w-full object-contain" />
      <Divider />
      <Container direction="col" className="p-5" width="full">
        <Heading variant="h3">{model.name}</Heading>
        <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-0 rounded-md border-2 p-2">
          <tbody>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.size"
                )}
              </td>
              <td>{getFileSizeAsString(model.size)}</td>
            </tr>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.levelOfDetail"
                )}
              </td>
              <td>
                {t(
                  `enum.ModelLevelOfDetail.${
                    ModelLevelOfDetail[
                      model.levelOfDetail
                    ] as keyof typeof ModelLevelOfDetail
                  }`
                )}
              </td>
            </tr>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.complexity"
                )}
              </td>
              <td>
                {t(
                  `enum.ModelComplexity.${
                    ModelComplexity[
                      model.complexity
                    ] as keyof typeof ModelComplexity
                  }`
                )}
              </td>
            </tr>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.license"
                )}
              </td>
              <td>
                {model.license.length === 0
                  ? "---"
                  : model.license.concat(", ")}
              </td>
            </tr>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.tags"
                )}
              </td>
              <td>
                {model.tags.length === 0 ? "---" : model.tags.concat(", ")}
              </td>
            </tr>
            <tr>
              <td>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.certificates"
                )}
              </td>
              <td>
                {model.certificates.length === 0
                  ? "---"
                  : model.certificates.concat(", ")}
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          title={t("general.button.select")}
          variant="primary"
          active={!postRepositoryModel.isLoading}
          size="sm"
          loading={postRepositoryModel.isLoading}
          onClick={() => handleOnClickButtonSelect(model)}
        />
        {children}
      </Container>
    </Container>
  );
};
