import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodeProperty,
  OntoNodePropertyName,
  OntoNodePropertyType,
  OntoNodeType,
  isOntoNodePropertyName,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { InputLabelProps } from "@mui/material";
import { GeneralInput, InputType } from "@component-library/Form/GeneralInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useGetOntoNode from "@/api/Resources/Ontology/Querys/useGetOntoNode";
import useGetNodeProperties from "@/api/Graph/Querys/useGetNodeProperties";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import logger from "@/hooks/useLogger";
import useCreateOrgaNode from "@/api/Resources/Organization/Mutations/useCreateOrgaNode";
import useUpdateOrgaNode from "@/api/Resources/Organization/Mutations/useUpdateOrgaNode";
import ResourcesEdgeForm from "./EdgeForm";

interface ResourcesNodePropsForm {
  type: "edit" | "create" | "variant";
  nodeType: OntoNodeType;
  node?: OntoNode;
  nodeProperties: OntoNodeProperty[];
}

export interface ResourcesNodeFormEdges {
  edges: {
    nodeType: OntoNodeType;
    nodeID: string;
  }[];
}

const getMatchingEdges = (nodeType: OntoNodeType): OntoNodeType[] => {
  switch (nodeType) {
    case "organization":
      return ["printer", "material", "additionalRequirement"];
    case "printer":
      return ["material", "additionalRequirement"];
    case "material":
      return ["printer", "additionalRequirement"];
    case "additionalRequirement":
      return ["printer", "material"];
    default:
      return [];
  }
};

const ResourcesNodeForm: React.FC<ResourcesNodePropsForm> = (props) => {
  const { type, nodeType, nodeProperties, node } = props;
  const { t } = useTranslation();
  const createOrgaNode = useCreateOrgaNode();
  const updateOrgaNode = useUpdateOrgaNode();
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
    formState: { errors },
  } = useForm<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>({
    defaultValues:
      node === undefined
        ? { nodeType: nodeType, edges: getMatchingEdges() }
        : { ...node, edges: getMatchingEdges() },
  });

  const { append, fields, remove, update } = useFieldArray({
    control,
    name: "properties",
  });
  const useEdgeArray = useFieldArray({
    control,
    name: "edges",
  });

  const handleOnClickButtonAddProperty = () => {
    append({
      name: "",
      type: "text",
      value: "",
    });
  };

  const handleOnChangePropertyType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const propertyList = nodeProperties !== undefined ? nodeProperties : [];

    const property = propertyList.find((node) => node.name === e.target.value);
    if (property === undefined) return;
    update(index, property);
  };

  const mapInputTypes = (type: OntoNodePropertyType): InputType => {
    switch (type) {
      case "text":
        return "text";
      case "number":
        return "number";
      case "date":
        return "date";
      case "boolean":
        return "checkbox";
      default:
        return "text";
    }
  };

  const propertyNameTranslation = (name: string) => {
    return isOntoNodePropertyName(name)
      ? t(`types.OntoNodePropertyName.${name as OntoNodePropertyName}`)
      : name;
  };

  const propertyNameAlreadyUsed = (name: string): boolean => {
    return fields.find((node) => node.name === name) !== undefined;
  };

  const freePropertyNamesAvailable = (): boolean => {
    const propertyList = nodeProperties !== undefined ? nodeProperties : [];
    return fields.length < propertyList.length;
  };

  const onSubmit = (data: OntoNode | OntoNodeNew) => {
    logger("ResourcesNodeEdit | onSubmit |", data);
    switch (type) {
      case "edit":
        updateOrgaNode.mutate(
          { node: data as OntoNode },
          {
            onSuccess: () => {
              navigate("..");
            },
          }
        );
        break;
      case "create":
        createOrgaNode.mutate(
          { node: data },
          {
            onSuccess: () => {
              navigate("..");
            },
          }
        );
        break;
      case "variant":
        createOrgaNode.mutate(
          { node: data },
          {
            onSuccess: () => {
              navigate("..");
            },
          }
        );
        break;
    }
  };

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">
        {t(`types.OntoNodeType.${nodeType}`)}{" "}
        {t(`Resources.components.Edit.heading.${type}`)}
      </Heading>
      <form className="flex w-full flex-col items-center justify-start gap-5 p-5">
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
        {/* <GeneralInput
          label="nodeType"
          labelText={t("Resources.components.Edit.nodeType")}
          register={register}
          type="text"
        /> */}
        {/* <Container width="full">
          <Text>{t("Resources.components.Edit.nodeType")}</Text>
          <Text>{t(`types.OntoNodeType.${nodeType}`)}</Text>
        </Container> */}
        {/* <GeneralInput
          label="createdBy"
          labelText={t("Resources.components.Edit.createdBy")}
          register={register}
          type="text"
        /> */}
        <Heading variant="h3">
          {t("Resources.components.Edit.properties.header")}
        </Heading>
        {fields.map((field, index) => (
          <Container
            key={index}
            direction="col"
            width="fit"
            className="card relative min-w-full md:min-w-[300px]"
          >
            <Button
              title={t("Resources.components.Edit.button.removeProperty")}
              onClick={() => remove(index)}
              className="absolute right-1 top-1"
              size="sm"
              variant="text"
              children={<ClearIcon />}
            />
            {field.name === undefined || field.name === "" ? (
              <Container width="full">
                <Text>{t("Resources.components.Edit.properties.type")}</Text>
                {
                  <select
                    className=" rounded-md border border-gray-300 p-2"
                    {...register(`properties.${index}.name`, {
                      onChange: (e) => handleOnChangePropertyType(e, index),
                    })}
                  >
                    {nodeProperties.map((property) => (
                      <option
                        key={property.name}
                        value={property.name}
                        disabled={propertyNameAlreadyUsed(property.name)}
                      >
                        {propertyNameTranslation(property.name)}
                      </option>
                    ))}
                  </select>
                }
              </Container>
            ) : (
              <>
                <Container width="full">
                  <Text>{t("Resources.components.Edit.properties.name")}</Text>
                  <Text>{propertyNameTranslation(field.name)}</Text>
                </Container>

                <GeneralInput
                  label={`properties.${index}.value`}
                  labelText={t("Resources.components.Edit.properties.value")}
                  register={register}
                  type={mapInputTypes(field.type)}
                />
              </>
            )}
          </Container>
        ))}

        {freePropertyNamesAvailable() ? (
          <Button
            title={t("Resources.components.Edit.button.addProperty")}
            onClick={handleOnClickButtonAddProperty}
            variant="text"
            children={<AddIcon />}
          />
        ) : null}
        {getMatchingEdges(nodeType).map((edgeType) => (
          <ResourcesEdgeForm nodeType={edgeType} />
        ))}

        <Button
          title={t(`Resources.components.Edit.button.${type}`)}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </Container>
  );
};

export default ResourcesNodeForm;
