import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Text,
} from "@component-library/index";
import { useNavigate, useParams } from "react-router-dom";
import useOrganization from "@/hooks/useOrganization";
import {
  OntoNodePropertyName,
  clientNodeTypes,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import useGetOrgaNode from "@/api/Resources/Organization/Querys/useGetOrgaNode";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";

interface ResourcesNodeViewProps {
  nodeID?: string;
  closeModal?: () => void;
}

const ResourcesNodeView: React.FC<PropsWithChildren<ResourcesNodeViewProps>> = (
  props
) => {
  const { nodeID: argNodeID, closeModal, children } = props;
  const { nodeID: paramNodeID } = useParams();
  const nodeID = paramNodeID !== undefined ? paramNodeID : argNodeID;

  const node = useGetOrgaNode(nodeID);
  const nodeNeighbors = useGetAllOrgaNodeNeighbors(nodeID);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organization } = useOrganization();

  const oncloseModal = () => {
    if (nodeID !== undefined && closeModal !== undefined) closeModal();
    else navigate("..");
  };

  const propertyNameTranslation = (name: string) => {
    return isOntoNodePropertyName(name)
      ? t(`types.OntoNodePropertyName.${name as OntoNodePropertyName}`)
      : name;
  };

  return (
    <Modal
      className="justify-start"
      modalKey={`nodeView`}
      open={nodeID !== undefined && nodeID !== ""}
      closeModal={oncloseModal}
    >
      {node.isError || nodeNeighbors.isError ? (
        <Text>Error Loading</Text>
      ) : node.isLoading || nodeNeighbors.isLoading ? (
        <LoadingAnimation />
      ) : (
        <Container width="full" direction="col" justify="start" className="p-5">
          <Heading variant="h1">{node.data.name}</Heading>
          <table className="w-fit table-auto border-collapse border-spacing-x-0 p-0">
            <tbody>
              <tr>
                <td colSpan={2} className={` p-3`}>
                  <Heading variant="h2">
                    {t("Resources.components.NodeView.general")}
                  </Heading>
                </td>
              </tr>
              <tr>
                <td className={` p-3`}>
                  {t("Resources.components.NodeView.context")}
                </td>
                <td className={` p-3`}>{node.data.context}</td>
              </tr>
              <tr>
                <td className={`border-t-2 p-3`}>
                  {t("Resources.components.NodeView.createdBy")}
                </td>
                <td className={`border-t-2 p-3`}>
                  {node.data.createdBy === organization.hashedID
                    ? organization.name
                    : "Semper-KI"}
                </td>
              </tr>
              <tr>
                <td className={`border-t-2 p-3`}>
                  {t("Resources.components.NodeView.updatedWhen")}
                </td>
                <td className={`border-t-2 p-3`}>
                  {node.data.updatedWhen.toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className={`border-t-2 p-3`}>
                  {t("Resources.components.NodeView.createdWhen")}
                </td>
                <td className={`border-t-2 p-3`}>
                  {node.data.createdWhen.toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className={`border-t-2 p-3`}>
                  {t("Resources.components.NodeView.nodeType")}
                </td>
                <td className={`border-t-2 p-3`}>
                  {t(`types.OntoNodeType.${node.data.nodeType}`)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className={`border-t-2 p-3`}>
                  <Heading variant="h2">
                    {t("Resources.components.NodeView.properties")}
                  </Heading>
                </td>
              </tr>
              {node.data.properties.length === 0 ? (
                <tr>
                  <td colSpan={2} className={`border-t-2 p-3`}>
                    <Text>
                      {t("Resources.components.NodeView.noProperties")}
                    </Text>
                  </td>
                </tr>
              ) : (
                node.data.properties.map((property, index) => (
                  <tr key={index}>
                    <td className={`border-t-2 p-3`}>
                      {propertyNameTranslation(property.name)}
                    </td>
                    <td className={`border-t-2 p-3`}>
                      {property.value.toString()}
                    </td>
                  </tr>
                ))
              )}

              {nodeNeighbors.data.length === 0
                ? null
                : clientNodeTypes.map((nodeType, index) =>
                    nodeNeighbors.data.filter(
                      (node) => node.nodeType === nodeType
                    ).length > 0 ? (
                      <React.Fragment key={`nodeType-${index}`}>
                        <tr key={index}>
                          <td colSpan={2} className={`border-t-2 p-3`}>
                            <Heading variant="h2">
                              {t(`types.OntoNodeType.${nodeType}`)}
                            </Heading>
                          </td>
                        </tr>
                        {nodeNeighbors.data
                          .filter((node) => node.nodeType === nodeType)
                          .map((node, _index) => (
                            <tr key={index + _index}>
                              <td className={`border-t-2 p-3`}>{node.name}</td>
                              <td className={`border-t-2 p-3`}>
                                {node.context}
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ) : null
                  )}
            </tbody>
          </table>
          {children}
        </Container>
      )}
    </Modal>
  );
};

export default ResourcesNodeView;
