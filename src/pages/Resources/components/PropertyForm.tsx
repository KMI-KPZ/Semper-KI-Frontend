import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
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
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
  const { getSortIcon, handleSort, sortItems } =
    useSort<
      FieldArrayWithId<
        (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
        "properties",
        "id"
      >
    >();

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
      <Container
        width="full"
        className="overflow-auto"
        justify="start"
        align="start"
      >
        <table className="card-container w-full table-auto border-separate border-spacing-x-0 p-0">
          <thead className="">
            <tr>
              <th className="rounded-tl-xl bg-gray-50 p-3">
                <div className="m-0 flex items-center justify-start ">
                  <Button
                    variant="text"
                    title={t("Resources.components.Edge.table.name")}
                    onClick={() => handleSort("name")}
                    className="whitespace-nowrap p-0"
                  >
                    <div className="ml-6 flex flex-row items-center justify-center">
                      {t("Resources.components.Edge.table.name")}
                      {getSortIcon("name")}
                    </div>
                  </Button>
                </div>
              </th>
              <th className="bg-gray-50">
                <div className="flex items-center justify-start ">
                  <Button
                    variant="text"
                    title={t("Resources.components.Edit.table.value")}
                    onClick={() => handleSort("value")}
                    className="whitespace-nowrap"
                  >
                    <div className="ml-6 flex flex-row items-center justify-center">
                      {t("Resources.components.Edit.table.value")}
                      {getSortIcon("value")}
                    </div>
                  </Button>
                </div>
              </th>

              <th className="rounded-tr-xl bg-gray-50 p-3 text-left">
                {t("Resources.components.Edge.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {fields.length > 0 ? (
              fields.sort(sortItems).map((propField, index) =>
                propField.name === undefined || propField.name === "" ? (
                  <tr>
                    <td
                      colSpan={3}
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <Container width="full">
                        <Text>
                          {t("Resources.components.Edit.properties.type")}
                        </Text>
                        {
                          <select
                            className=" rounded-md border border-gray-300 p-2"
                            {...register(`properties.${index}.name`, {
                              onChange: (e) =>
                                handleOnChangePropertyType(e, index),
                            })}
                          >
                            {nodeProperties.map((property) => (
                              <option
                                key={property.name}
                                value={property.name}
                                disabled={propertyNameAlreadyUsed(
                                  property.name
                                )}
                              >
                                {propertyNameTranslation(property.name)}
                              </option>
                            ))}
                          </select>
                        }
                      </Container>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {propField.name}
                    </td>
                    <td
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <GeneralInput
                        label={`properties.${index}.value`}
                        labelText={""}
                        register={register}
                        type={mapInputTypes(propField.type)}
                      />
                    </td>
                    <td
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <Container width="full" direction="row" justify="start">
                        <Button
                          title={t(
                            "Resources.components.Edit.button.removeProperty"
                          )}
                          onClick={() => remove(index)}
                          size="sm"
                          variant="text"
                          children={<DeleteOutlineOutlinedIcon />}
                        />
                      </Container>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={3} className="border-t-2 p-3 text-center">
                  <Text>{t("Resources.components.Edge.table.noItems")}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default ResourcesPropertyForm;
