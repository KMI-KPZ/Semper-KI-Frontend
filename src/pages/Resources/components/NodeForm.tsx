import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading } from "@component-library/index";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodeProperty,
  OntoNodeType,
  allOntoNodeTypes,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { useFieldArray, useForm } from "react-hook-form";
import { GeneralInput } from "@component-library/Form/GeneralInput";
import { useNavigate } from "react-router-dom";
import useCreateOrgaNode from "@/api/Resources/Organization/Mutations/useCreateOrgaNode";
import useUpdateOrgaNode from "@/api/Resources/Organization/Mutations/useUpdateOrgaNode";
import ResourcesEdgeForm from "./EdgeForm";
import ResourcesPropertyForm from "./PropertyForm";
import ResourcesNodeDraft from "./NodeDraft";
import useCreateOrgaEntitieEdge from "@/api/Resources/Organization/Mutations/useCreateOrgaEntitieEdge";
import useDeleteOrgaEntitieEdge from "@/api/Resources/Organization/Mutations/useDeleteOrgaEntitieEdge";
import useSubmitOrgaNode from "@/api/Resources/Organization/Mutations/useSubmitOrgaNode";

interface ResourcesNodePropsForm {
  type: "edit" | "create" | "variant";
  nodeType: OntoNodeType;
  node?: OntoNode;
  nodeProperties: OntoNodeProperty[];
  edges?: ResourcesNodeFormEdge[];
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

const ResourcesNodeForm: React.FC<ResourcesNodePropsForm> = (props) => {
  const { type, nodeType, nodeProperties, node, edges } = props;
  const { t } = useTranslation();
  const createOrgaNode = useCreateOrgaNode();
  const updateOrgaNode = useUpdateOrgaNode();
  const createOrgaEntitieEdge = useCreateOrgaEntitieEdge();
  const deleteOrgaEntitieEdge = useDeleteOrgaEntitieEdge();
  const submitOrgaNodeForm = useSubmitOrgaNode();

  const navigate = useNavigate();

  // const schema = yup.object({
  //   context: yup.string().required(),
  //   createdBy: yup.string().required(),
  //   nodeID: yup.string().required(),
  //   nodeName: yup.string().required(),
  //   nodeType: yup
  //     .mixed<OntoNodeType>()
  //     .oneOf([
  //       "organization",
  //       "printer",
  //       "material",
  //       "additionalRequirement",
  //       "color",
  //     ])
  //     .required(),
  //   properties: yup
  //     .array()
  //     .of(
  //       yup.object({
  //         name: yup.string().required(),
  //         type: yup
  //           .mixed<OntoNodePropertyType>()
  //           .oneOf(["text", "number", "date", "boolean"])
  //           .required(),
  //         value: yup.lazy((value, options) => {
  //           switch (options.parent.type) {
  //             case "text":
  //               return yup.string().required();
  //             case "number":
  //               return yup.number().required();
  //             case "date":
  //               return yup.date().required();
  //             case "boolean":
  //               return yup.boolean().required();
  //             default:
  //               return yup.mixed().required();
  //           }
  //         }),
  //       })
  //     )
  //     .required(),
  // });

  const { register, handleSubmit, control, reset, watch } = useForm<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges
  >({
    defaultValues:
      node === undefined ? { nodeType: nodeType, edges } : { ...node, edges },
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
      type === "create" || type === "variant"
        ? data.edges.map((edge) => edge.nodeID)
        : data.edges
            .filter((edge) => !edges?.some((e) => e.nodeID === edge.nodeID))
            .map((edge) => edge.nodeID);

    const deleteEdges: string[] =
      edges === undefined || type === "create" || type === "variant"
        ? []
        : edges
            .filter((edge) => !data.edges.some((e) => e.nodeID === edge.nodeID))
            .map((edge) => edge.nodeID);

    submitOrgaNodeForm.mutate(
      {
        node: { ...data },
        type: type === "edit" ? "update" : "create",
        edges: { create: newEdges, delete: deleteEdges },
      },
      {
        onSuccess() {
          navigate("..");
        },
      }
    );
  };

  const nodeAlreadyFilled = watch("name") !== "" && watch("context") !== "";
  const setFormToDraft = (node: OntoNode) => {
    if (nodeAlreadyFilled) {
      if (window.confirm(t("Resources.components.Edit.confirmDraft"))) {
        reset({ ...node, edges: [] });
      } else {
        return;
      }
    }
    reset({ ...node, edges: [] });
  };

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">
        {t(`types.OntoNodeType.${nodeType}`)}{" "}
        {t(`Resources.components.Edit.heading.${type}`)}
      </Heading>

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
            {t("Resources.components.Edit.general")}
          </Heading>
          <GeneralInput
            label="name"
            labelText={t("Resources.components.Edit.nodeName")}
            register={register}
            type="text"
          />
          <GeneralInput
            label="context"
            labelText={t("Resources.components.Edit.context")}
            register={register}
            type="text"
          />
        </Container>
        <ResourcesPropertyForm
          register={register}
          usePropertyArray={usePropertyArray}
          nodeProperties={nodeProperties}
        />

        {allOntoNodeTypes
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
          title={t(`Resources.components.Edit.button.${type}`)}
          onClick={handleSubmit(onSubmit)}
          loading={
            createOrgaNode.isLoading ||
            updateOrgaNode.isLoading ||
            createOrgaEntitieEdge.isLoading ||
            deleteOrgaEntitieEdge.isLoading
          }
        />
      </form>
    </Container>
  );
};

export default ResourcesNodeForm;
