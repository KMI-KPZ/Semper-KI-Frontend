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
  OntoNodeProperty,
  OntoNodeType,
  getNodeTypes,
  isOntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
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
import NodeCustomForm from "./NodeCustomForm/NodeCustomForm";

interface ResourcesNodePropsForm {
  type: ResourcesAction;
}

export type ResourcesAction = "create" | "edit";

export interface OptionalProps {
  technology?: string;
  materialCategory?: string;
  materialType?: string;
  ralColor?: string;
  hexColors?: string[];
}

export interface ResourcesNodeFormEdges {
  edges: ResourcesNodeFormEdge[];
}

export interface ResourcesNodeFormEdge {
  nodeID: string;
  nodeType: OntoNodeType;
  nodeName: string;
  createdBy: string;
}
export type NodeFormData = (OntoNode | OntoNodeNew) &
  ResourcesNodeFormEdges &
  OptionalProps;

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
const getNodeByType = (nodeType: OntoNodeType, nodes?: OntoNode[]): string => {
  return nodes?.find((node) => node.nodeType === nodeType)?.nodeID || "none";
};

const getRalColor = (props?: OntoNodeProperty[]): string => {
  return (
    props?.find((prop) => prop.key === "colorRAL")?.value.toString() || "none"
  );
};
const getHexColors = (props?: OntoNodeProperty[]): string[] => {
  const prop = props?.find((prop) => prop.key === "colorHEX");
  if (prop === undefined || prop.type !== "array") return [];
  return prop.value.split(",");
};
const useGetNodeProperties = (
  nodeType: OntoNodeType,
  properties?: OntoNodeProperty[]
): OntoNodeProperty[] => {
  if (properties === undefined) return [];
  const props = properties.filter(
    (prop) =>
      (nodeType === "color" &&
        prop.key !== "colorHEX" &&
        prop.key !== "colorRAL") ||
      nodeType !== "color"
  );
  return props;
};

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

  const edges = getEdges(
    organization,
    allOrgaNodeNeighbors.data?.filter(
      (node) =>
        node.nodeType !== "technology" && node.nodeType !== "materialCategory"
    )
  );

  const { register, handleSubmit, control, setValue, reset, watch } =
    useForm<NodeFormData>({
      defaultValues:
        nodeID === undefined
          ? {
              nodeType,
              edges,
              technology: nodeType === "printer" ? "none" : undefined,
              materialCategory: nodeType === "material" ? "none" : undefined,
              materialType: nodeType === "material" ? "none" : undefined,
              ralColor: nodeType === "color" ? "none" : undefined,
              hexColors: nodeType === "color" ? ["#000000"] : undefined,
            }
          : {
              ...node.data,
              technology:
                nodeType === "printer"
                  ? getNodeByType("technology", allOrgaNodeNeighbors.data)
                  : undefined,
              materialCategory:
                nodeType === "material"
                  ? getNodeByType("materialCategory", allOrgaNodeNeighbors.data)
                  : undefined,
              materialType:
                nodeType === "material"
                  ? getNodeByType("materialType", allOrgaNodeNeighbors.data)
                  : undefined,
              ralColor:
                nodeType === "color"
                  ? getRalColor(node.data?.properties)
                  : undefined,
              hexColors:
                nodeType === "color"
                  ? getHexColors(node.data?.properties)
                  : undefined,
              edges,
            },
    });

  const usePropertyArray = useFieldArray({
    control,
    name: "properties",
  });
  const useEdgeArray = useFieldArray({
    control,
    name: "edges",
  });

  const onSubmit = (data: NodeFormData) => {
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
    const newTechnology: string[] =
      data.technology !== undefined &&
      data.technology !== "" &&
      nodeType === "printer"
        ? [data.technology]
        : [];
    const deleteTechnology: string[] =
      data.technology !== undefined &&
      data.technology !== "" &&
      nodeType === "printer"
        ? edges
            .filter((edge) => edge.nodeType === "technology")
            .map((edge) => edge.nodeID)
        : [];
    const newMaterialCategory: string[] =
      data.materialCategory !== undefined &&
      data.materialCategory !== "" &&
      nodeType === "material"
        ? [data.materialCategory]
        : [];

    const deleteMaterialCategory: string[] =
      data.materialCategory !== undefined &&
      data.materialCategory !== "" &&
      nodeType === "material"
        ? edges
            .filter((edge) => edge.nodeType === "materialCategory")
            .map((edge) => edge.nodeID)
        : [];
    const newMaterialType: string[] =
      data.materialType !== undefined &&
      data.materialType !== "" &&
      nodeType === "material"
        ? [data.materialType]
        : [];

    const deleteMaterialType: string[] =
      data.materialType !== undefined &&
      data.materialType !== "" &&
      nodeType === "material"
        ? edges
            .filter((edge) => edge.nodeType === "materialType")
            .map((edge) => edge.nodeID)
        : [];
    const hexColors: OntoNodeProperty | undefined =
      data.hexColors !== undefined && data.hexColors.length > 0
        ? {
            key: "colorHEX",
            value: data.hexColors.toString(),
            type: "array",
            name: "Farbe (Hexadezimal)",
            unit: "",
          }
        : undefined;
    const ralColor: OntoNodeProperty | undefined =
      data.ralColor !== "none" &&
      data.ralColor !== "" &&
      data.ralColor !== undefined
        ? {
            key: "colorRAL",
            value: data.ralColor,
            type: "text",
            name: "Farbe (RAL)",
            unit: "",
          }
        : undefined;
    const colorProps: OntoNodeProperty[] =
      nodeType === "color"
        ? ([hexColors, ralColor].filter(
            (prop) => prop !== undefined
          ) as OntoNodeProperty[])
        : [];

    submitOrgaNodeForm.mutate(
      {
        node: {
          ...data,
          nodeType,
          properties: [...data.properties, ...colorProps],
        },
        type: type === "edit" ? "update" : "create",
        edges: {
          create: [
            ...newEdges,
            ...newTechnology,
            ...newMaterialCategory,
            ...newMaterialType,
          ],
          delete: [
            ...deleteEdges,
            ...deleteTechnology,
            ...deleteMaterialCategory,
            ...deleteMaterialType,
          ],
        },
      },
      {
        onSuccess() {
          navigate(type === "edit" ? "../.." : "..");
        },
        onError() {
          console.error("Error on submitOrgaNodeForm");
        },
      }
    );
  };

  const nodeAlreadyFilled = watch("name") !== "" && watch("context") !== "";

  const setFormToDraft = (nodeID: string) => {
    logger("setFormToDraft", nodeID, nodeAlreadyFilled.toString());
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
      reset({
        ...node.data,
        properties: useGetNodeProperties(nodeType, node.data?.properties),
        technology:
          nodeType === "printer"
            ? getNodeByType("technology", allOrgaNodeNeighbors.data)
            : undefined,
        materialCategory:
          nodeType === "material"
            ? getNodeByType("materialCategory", allOrgaNodeNeighbors.data)
            : undefined,
        materialType:
          nodeType === "material"
            ? getNodeByType("materialType", allOrgaNodeNeighbors.data)
            : undefined,
        ralColor:
          nodeType === "color" ? getRalColor(node.data?.properties) : undefined,
        hexColors:
          nodeType === "color"
            ? getHexColors(node.data?.properties)
            : undefined,
        edges: getEdges(
          organization,
          allOrgaNodeNeighbors.data?.filter(
            (node) =>
              node.nodeType !== "technology" &&
              node.nodeType !== "materialCategory"
          )
        ),
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

  if (editIsError || variantIsError || nodeType === undefined)
    return <Navigate to=".." />;
  if (variantIsLoading || editIsLoading) return <LoadingAnimation />;

  return (
    <Container width="full" direction="col">
      <BackButtonContainer backPath="../..">
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
        <Container width="full" direction="col" className="card bg-white">
          <Heading variant="h3">
            {t("components.Resources.NodeForm.general")}
          </Heading>
          <GeneralInput
            label="name"
            labelText={t("components.Resources.NodeForm.nodeName")}
            register={register}
            type="text"
            required
          />
          <GeneralInput
            label="context"
            labelText={t("components.Resources.NodeForm.context")}
            register={register}
            type="text"
            required
          />
          <NodeCustomForm
            setValue={setValue}
            watch={watch}
            nodeType={nodeType}
            register={register}
            control={control}
          />
        </Container>
        <ResourcesPropertyForm
          register={register}
          usePropertyArray={usePropertyArray}
          nodeType={nodeType}
        />

        {getNodeTypes(nodeType)
          .filter(
            (_nodeType) =>
              _nodeType !== nodeType &&
              _nodeType !== "materialCategory" &&
              _nodeType !== "materialType" &&
              _nodeType !== "technology"
          )
          .map((edgeType, index) => (
            <ResourcesEdgeForm
              key={index}
              nodeType={edgeType}
              useEdgeArray={useEdgeArray}
              register={register}
            />
          ))}

        <Button
          title={t(`general.button.${type === "create" ? "create" : "save"}`)}
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          loading={submitOrgaNodeForm.isLoading}
        />
      </form>
    </Container>
  );
};

export default ResourcesNodeForm;
