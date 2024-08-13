import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import {
  OntoNode,
  OntoNodeType,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { InputLabelProps } from "@mui/material";
import { InputType } from "zlib";
import { GeneralInput } from "@component-library/Form/GeneralInput";

interface ResourcesNodeEditProps {
  node: OntoNode;
}

const ResourcesNodeEdit: React.FC<ResourcesNodeEditProps> = (props) => {
  const { node } = props;
  const { t } = useTranslation();

  const schema = yup.object({
    nodeName: yup.string().required(),
    context: yup.string().required(),
    nodeType: yup
      .mixed<OntoNodeType>()
      .oneOf([
        "organization",
        "printer",
        "material",
        "additionalRequirement",
        "color",
      ])
      .required(),
    createdBy: yup.string().required(),
    nodeID: yup.string().required(),
    properties: yup.array().of(
      yup
        .object({
          name: yup.string().required(),
          value: yup.mixed().required(),
          type: yup
            .string()
            .required()
            .oneOf(["text", "number", "date", "boolean"]),
        })
        .required()
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OntoNode>({
    // resolver: yupResolver(schema),
    defaultValues: node,
  });

  const {} = useFieldArray({
    control,
    name: "properties",
  });

  const labels: [keyof OntoNode, InputType][] = [
    ["nodeName", "text"],
    ["nodeID", "text"],
    ["context", "text"],
    ["nodeType", "color"],
  ];

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Resources.components.Edit.heading")}</Heading>
      <form></form>
    </Container>
  );
};

export default ResourcesNodeEdit;
