import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
} from "@component-library/index";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodeType,
  clientNodeTypes,
  isOntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import { useFieldArray, useForm } from "react-hook-form";
import { GeneralInput } from "@component-library/Form/GeneralInput";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ResourcesEdgeForm from "./EdgeForm";
import ResourcesPropertyForm from "./PropertyForm";
import ResourcesNodeDraft from "./NodeDraft";
import useSubmitOrgaNode from "@/api/Resources/Organization/Mutations/useSubmitOrgaNode";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import useOrganization from "@/hooks/useOrganization";
import useGetOrgaNode from "@/api/Resources/Organization/Querys/useGetOrgaNode";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import logger from "@/hooks/useLogger";

interface ResourcesNodePropsForm {
  type: ResourcesAction;
}
export type ResourcesAction = "create" | "edit";

export interface ResourcesNodeFormEdges {
  edges: ResourcesNodeFormEdge[];
}

export interface ResourcesNodeFormEdge {
  nodeID: string;
  nodeType: OntoNodeType;
  nodeName: string;
  createdBy: string;
}

export const parseOntoNodesToEdges = (
  nodes: OntoNode[]
): ResourcesNodeFormEdge[] => {
  return nodes.map(
    (node): ResourcesNodeFormEdge => ({
      nodeID: node.nodeID,
      nodeType: node.nodeType,
      nodeName: node.name,
      createdBy: node.createdBy,
    })
  );
};

const getNodeID = (
  type: ResourcesAction,
  paramNodeID: string | undefined,
  variantNodeID: string
) => {
  if (type === "edit") {
    return paramNodeID;
  } else if (type === "create") {
    return variantNodeID;
  }
};

const getNodeType = (unsafeNodeType: string | undefined) => {
  return unsafeNodeType !== undefined && isOntoNodeType(unsafeNodeType)
    ? unsafeNodeType
    : undefined;
};

const getEdges = (
  organization: Organization,
  nodes?: OntoNode[]
): ResourcesNodeFormEdge[] =>
  parseOntoNodesToEdges(
    nodes === undefined
      ? []
      : nodes.filter((edgeNode) => edgeNode.nodeID !== organization.hashedID)
  );

const ResourcesNodeForm: React.FC<ResourcesNodePropsForm> = (props) => {
  const { type } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const submitOrgaNodeForm = useSubmitOrgaNode();
  const { organization } = useOrganization();

  const [variantNodeID, setVariantNodeID] = useState<string>("");

  const { nodeType: unsafeNodeType, nodeID: paramNodeID } = useParams();
  const nodeID: string | undefined = getNodeID(
    type,
    paramNodeID,
    variantNodeID
  );
  const nodeType: OntoNodeType | undefined = getNodeType(unsafeNodeType);

  if (nodeType === undefined) return <Navigate to=".." />;

  const node = useGetOrgaNode(nodeID);
  const allOrgaNodeNeighbors = useGetAllOrgaNodeNeighbors(nodeID);

  const edges = getEdges(organization, allOrgaNodeNeighbors.data);

  const { register, handleSubmit, control, reset, watch } = useForm<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges
  >({
    defaultValues:
      nodeID === undefined ? { nodeType, edges } : { ...node.data, edges },
  });

  const usePropertyArray = useFieldArray({
    control,
    name: "properties",
  });
  const useEdgeArray = useFieldArray({
    control,
    name: "edges",
  });

  const onSubmit = (
    data: (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges
  ) => {
    const newEdges: string[] =
      type === "create"
        ? data.edges.map((edge) => edge.nodeID)
        : data.edges
            .filter((edge) => !edges?.some((e) => e.nodeID === edge.nodeID))
            .map((edge) => edge.nodeID);

    const deleteEdges: string[] =
      edges === undefined || type === "create"
        ? []
        : edges
            .filter((edge) => !data.edges.some((e) => e.nodeID === edge.nodeID))
            .map((edge) => edge.nodeID);

    submitOrgaNodeForm.mutate(
      {
        node: { ...data, nodeType },
        type: type === "edit" ? "update" : "create",
        edges: { create: newEdges, delete: deleteEdges },
      },
      {
        onSuccess() {
          navigate("..");
        },
        onError() {
          console.error("Error on submitOrgaNodeForm");
        },
      }
    );
  };

  const nodeAlreadyFilled = watch("name") !== "" && watch("context") !== "";

  const setFormToDraft = (nodeID: string) => {
    if (nodeAlreadyFilled) {
      if (window.confirm(t("components.Resources.NodeForm.confirmDraft"))) {
        reset({ ...node, edges: [] });
        setVariantNodeID(nodeID);
      } else {
        return;
      }
    }
    reset({ ...node, edges: [] });
    setVariantNodeID(nodeID);
  };

  useEffect(() => {
    if (nodeID !== undefined && nodeID !== "") {
      logger("UseEffect", nodeID);
      reset({
        ...node.data,
        edges: getEdges(organization, allOrgaNodeNeighbors.data),
      });
    }
  }, [node.data, allOrgaNodeNeighbors.data]);

  const editIsLoading =
    type === "edit" && (node.isLoading || allOrgaNodeNeighbors.isLoading);
  const editIsError =
    type === "edit" && (node.isError || allOrgaNodeNeighbors.isError);
  const variantIsLoading =
    type === "create" &&
    variantNodeID !== "" &&
    (node.isLoading || allOrgaNodeNeighbors.isLoading);
  const variantIsError =
    type === "create" &&
    variantNodeID !== "" &&
    (node.isError || allOrgaNodeNeighbors.isError);

  if (editIsError || variantIsLoading || nodeType === undefined)
    return <Navigate to=".." />;
  if (variantIsError || editIsLoading) return <LoadingAnimation />;

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h2">
          {t(`types.OntoNodeType.${nodeType}`)}{" "}
          {t(`components.Resources.NodeForm.heading.${type}`)}
        </Heading>
      </BackButtonContainer>
      {type === "create" ? (
        <ResourcesNodeDraft
          nodeType={nodeType}
          setFormToDraft={setFormToDraft}
          nodeAlreadyFilled={nodeAlreadyFilled}
        />
      ) : null}

      <form className="flex w-full flex-col items-center justify-start gap-5 ">
        <Container width="full" direction="col" className="card">
          <Heading variant="h3">
            {t("components.Resources.NodeForm.general")}
          </Heading>
          <GeneralInput
            label="name"
            labelText={t("components.Resources.NodeForm.nodeName")}
            register={register}
            type="text"
          />
          <GeneralInput
            label="context"
            labelText={t("components.Resources.NodeForm.context")}
            register={register}
            type="text"
          />
        </Container>
        <ResourcesPropertyForm
          register={register}
          usePropertyArray={usePropertyArray}
          nodeType={nodeType}
        />

        {clientNodeTypes
          .filter((_nodeType) => _nodeType !== nodeType)
          .map((edgeType, index) => (
            <ResourcesEdgeForm
              key={index}
              nodeType={edgeType}
              useEdgeArray={useEdgeArray}
              register={register}
            />
          ))}

        <Button
          title={t(`general.button.${type}`)}
          onClick={handleSubmit(onSubmit)}
          loading={submitOrgaNodeForm.isLoading}
        />
      </form>
    </Container>
  );
};

export default ResourcesNodeForm;
