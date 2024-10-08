import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Text,
} from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useOrganization from "@/hooks/useOrganization";
import {
  OntoNodePropertyName,
  clientNodeTypes,
  isOntoNodePropertyName,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import useGetAdminNode from "@/api/Resources/Admin/Querys/useGetAdminNode";

interface AdminResourcesNodeViewProps {
  nodeID?: string;
  closeModal?: () => void;
}

const AdminResourcesNodeView: React.FC<
  PropsWithChildren<AdminResourcesNodeViewProps>
> = (props) => {
  const { nodeID, closeModal, children } = props;
  const { t } = useTranslation();
  const node = useGetAdminNode(nodeID);
  const navigate = useNavigate();
  const { organization } = useOrganization();
  const allOrgaNodeNeighbors = useGetAllOrgaNodeNeighbors(
    node.data?.nodeID ?? ""
  );

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
      open={
        nodeID === undefined ||
        (nodeID !== undefined && nodeID !== "" && closeModal !== undefined)
          ? true
          : false
      }
      closeModal={oncloseModal}
    >
      {node.isLoading ? (
        <LoadingAnimation />
      ) : node.data === undefined ? (
        <Text>Loading Error</Text>
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
                    : "Sermper-KI"}
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

              {allOrgaNodeNeighbors.isLoading ? (
                <tr>
                  <td colSpan={2} className={`border-t-2 p-3`}>
                    <LoadingAnimation />
                  </td>
                </tr>
              ) : null}
              {allOrgaNodeNeighbors.data === undefined ||
              allOrgaNodeNeighbors.data.length === 0
                ? null
                : clientNodeTypes.map((nodeType) =>
                    allOrgaNodeNeighbors.data.filter(
                      (node) => node.nodeType === nodeType
                    ).length > 0 ? (
                      <>
                        <tr key={nodeType}>
                          <td colSpan={2} className={`border-t-2 p-3`}>
                            <Heading variant="h2">
                              {t(`types.OntoNodeType.${nodeType}`)}
                            </Heading>
                          </td>
                        </tr>
                        {allOrgaNodeNeighbors.data
                          .filter((node) => node.nodeType === nodeType)
                          .map((node, index) => (
                            <tr key={index}>
                              <td className={`border-t-2 p-3`}>{node.name}</td>
                              <td className={`border-t-2 p-3`}>
                                {node.context}
                              </td>
                            </tr>
                          ))}
                      </>
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

export default AdminResourcesNodeView;
