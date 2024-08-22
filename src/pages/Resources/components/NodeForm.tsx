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
import { GeneralInput, InputType } from "@component-library/Form/GeneralInput";
import { useNavigate } from "react-router-dom";
import useCreateOrgaNode from "@/api/Resources/Organization/Mutations/useCreateOrgaNode";
import useUpdateOrgaNode from "@/api/Resources/Organization/Mutations/useUpdateOrgaNode";
import ResourcesEdgeForm from "./EdgeForm";
import ResourcesPropertyForm from "./PropertyForm";
import ResourcesNodeDraft from "./NodeDraft";
import useCreateOrgaEntitieEdge from "@/api/Resources/Organization/Mutations/useCreateOrgaEntitieEdge";
import useDeleteOrgaEntitieEdge from "@/api/Resources/Organization/Mutations/useDeleteOrgaEntitieEdge";
import logger from "@/hooks/useLogger";
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
  const [array, setArray] = React.useState<string[]>([]);

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

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,

    formState: { errors },
  } = useForm<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>({
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

  const updateOrgaEdges = (
    nodeID: string,
    formEdges: ResourcesNodeFormEdge[]
  ) => {
    const newEdges: ResourcesNodeFormEdge[] = formEdges.filter(
      (edge) => !edges?.some((e) => e.nodeID === edge.nodeID)
    );
    const deleteEdges: ResourcesNodeFormEdge[] =
      edges === undefined
        ? []
        : edges.filter(
            (edge) => !formEdges.some((e) => e.nodeID === edge.nodeID)
          );

    newEdges.forEach((edge) => {
      setArray((prevState) => [...prevState, edge.nodeID]);
      createOrgaEntitieEdge.mutate(
        {
          entity1ID: nodeID,
          entity2ID: edge.nodeID,
          invalidate: false,
        },
        {
          onSuccess: () => {
            setArray((prevState) =>
              prevState.filter((id) => id !== edge.nodeID)
            );
            if (array.length === 0) {
              navigate("..");
            }
          },
        }
      );
    });

    deleteEdges.forEach((edge) => {
      setArray((prevState) => [...prevState, edge.nodeID]);
      deleteOrgaEntitieEdge.mutate(
        {
          entity1ID: nodeID,
          entity2ID: edge.nodeID,
          invalidate: false,
        },
        {
          onSuccess: () => {
            setArray((prevState) =>
              prevState.filter((id) => id !== edge.nodeID)
            );
            if (array.length === 0) {
              navigate("..");
            }
          },
        }
      );
    });

    if (
      newEdges.length === 0 &&
      deleteEdges.length === 0 &&
      array.length === 0
    ) {
      navigate("..");
    }
  };

  const onSubmit = (
    data: (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges
  ) => {
    // logger("ResourcesNodeEdit | onSubmit |", data);
    const newEdges: string[] = data.edges
      .filter((edge) => !edges?.some((e) => e.nodeID === edge.nodeID))
      .map((edge) => edge.nodeID);
    const deleteEdges: string[] =
      edges === undefined
        ? []
        : edges
            .filter((edge) => !data.edges.some((e) => e.nodeID === edge.nodeID))
            .map((edge) => edge.nodeID);
    const node = {
      ...data,
      nodeName: data.name,
      name: undefined,
      edges: undefined,
    };
    submitOrgaNodeForm.mutate(
      {
        node: node,
        type: type === "edit" ? "update" : "create",
        edges: { create: newEdges, delete: deleteEdges },
      },
      {
        onSuccess(data, variables, context) {
          navigate("..");
        },
      }
    );

    // switch (type) {
    //   case "edit":
    //     updateOrgaNode.mutate(data as OntoNode, {
    //       onSuccess: () => {
    //         updateOrgaEdges((data as OntoNode).nodeID, data.edges);
    //       },
    //     });
    //     break;
    //   case "create":
    //     createOrgaNode.mutate(
    //       { node: data },
    //       {
    //         onSuccess: (node) => {
    //           updateOrgaEdges(node.nodeID, data.edges);
    //         },
    //       }
    //     );
    //     break;
    //   case "variant":
    //     createOrgaNode.mutate(
    //       { node: data },
    //       {
    //         onSuccess: () => {
    //           updateOrgaEdges((data as OntoNode).nodeID, data.edges);
    //         },
    //       }
    //     );
    //     break;
    // }
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
