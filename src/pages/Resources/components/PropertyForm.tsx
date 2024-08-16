import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodeProperty,
  OntoNodePropertyName,
  OntoNodePropertyType,
  isOntoNodePropertyName,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { ResourcesNodeFormEdges } from "./NodeForm";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { GeneralInput, InputType } from "@component-library/Form/GeneralInput";

interface ResourcesPropertyFormProps {
  usePropertyArray: UseFieldArrayReturn<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
    "properties",
    "id"
  >;
  register: UseFormRegister<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>;
  nodeProperties: OntoNodeProperty[];
}

const ResourcesPropertyForm: React.FC<ResourcesPropertyFormProps> = (props) => {
  const { register, usePropertyArray, nodeProperties } = props;
  const { t } = useTranslation();
  const { fields, append, remove, update } = usePropertyArray;

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

  return (
    <Container width="full" direction="col" className="card">
      <Container width="full">
        <Heading variant="h3">
          {t("Resources.components.Edit.properties.header")}
        </Heading>
        {freePropertyNamesAvailable() ? (
          <Button
            title={t("Resources.components.Edit.button.addProperty")}
            onClick={handleOnClickButtonAddProperty}
            variant="text"
            children={<AddIcon />}
          />
        ) : null}
      </Container>
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
    </Container>
  );
};

export default ResourcesPropertyForm;
