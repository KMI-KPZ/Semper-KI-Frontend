import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodePropertyBoolean,
  OntoNodePropertyDate,
  OntoNodePropertyGeneral,
  OntoNodePropertyNumber,
  OntoNodePropertyText,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ResourcesNodeNewProps {
  node: OntoNodeNew;
}

const ResourcesNodeNew: React.FC<ResourcesNodeNewProps> = ({ node }) => {
  const { t } = useTranslation();

  const schema = yup.object({
    nodeName: yup.string().required(),
    nodeType: yup.string().required(),
    properties: yup
      .array()
      .of(
        yup.lazy((value) => {
          switch (value.type) {
            case "text":
              return yup.object<OntoNodePropertyText>({
                name: yup.string().required(),
                value: yup.string().required(),
                type: yup.string().required().oneOf(["text"]),
              });
            case "number":
              return yup.object<OntoNodePropertyNumber>({
                name: yup.string().required(),
                value: yup.number().required(),
                type: yup.string().required().oneOf(["number"]),
              });
            case "date":
              return yup.object<OntoNodePropertyDate>({
                name: yup.string().required(),
                value: yup.date().required(),
                type: yup.string().required().oneOf(["date"]),
              });
            case "boolean":
              return yup.object<OntoNodePropertyBoolean>({
                name: yup.string().required(),
                value: yup.boolean().required(),
                type: yup.string().required().oneOf(["boolean"]),
              });
            default:
              return yup.object<OntoNodePropertyGeneral>({
                name: yup.string().required(),
                value: yup.mixed().required(),
                type: yup
                  .string()
                  .required()
                  .oneOf(["text", "number", "date", "boolean"]),
              });
          }
        })
      )
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OntoNodeNew>({
    resolver: yupResolver(schema),
    defaultValues: node,
  });

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Resources.components.Edit.heading")}</Heading>
      <Container>{/* Form elements go here */}</Container>
    </Container>
  );
};

export default ResourcesNodeNew;
