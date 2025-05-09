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
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import {
  OntoNode,
  OntoNodeNew,
  OntoNodePropertyName,
  OntoNodePropertyType,
  OntoNodeType,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import AddIcon from "@mui/icons-material/Add";
import { GeneralInput, InputType } from "@component-library/Form/GeneralInput";
import useSort from "@/hooks/useSort";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ResourcesNodeFormEdges } from "./NodeForm";
import useGetNodeProperties from "@/api/Graph/Querys/useGetNodeProperties";
import { Navigate } from "react-router-dom";

interface ResourcesPropertyFormProps {
  usePropertyArray: UseFieldArrayReturn<
    (OntoNode | OntoNodeNew) & ResourcesNodeFormEdges,
    "properties",
    "id"
  >;
  register: UseFormRegister<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>;
  errors?: FieldErrors<(OntoNode | OntoNodeNew) & ResourcesNodeFormEdges>;
  nodeType: OntoNodeType;
}

const ResourcesPropertyForm: React.FC<ResourcesPropertyFormProps> = (props) => {
  const { register, usePropertyArray, errors, nodeType } = props;
  const nodeProperties = useGetNodeProperties(nodeType);

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
      unit: "",
      key: "",
    });
  };

  const handleOnChangePropertyType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const propertyList =
      nodeProperties.data !== undefined ? nodeProperties.data : [];

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
    const propertyList =
      nodeProperties.data !== undefined ? nodeProperties.data : [];
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

  if (nodeProperties.isError) return <Navigate to=".." />;
  if (nodeProperties.isLoading) return <LoadingAnimation />;
  return (
    <Container width="full" direction="col" className="card bg-white">
      <Container width="full">
        <Heading variant="h3">
          {t("components.Resources.PropertyForm.properties.header")}
        </Heading>
        {/* {freePropertyNamesAvailable() ? (
          <Button
            title={t("components.Resources.PropertyForm.button.addProperty")}
            onClick={handleOnClickButtonAddProperty}
            variant="text"
            children={<AddIcon />}
          />
        ) : null} */}
      </Container>
      <Container
        width="full"
        className="overflow-auto"
        justify="start"
        items="start"
      >
        <table className="card-container w-full table-auto border-separate border-spacing-x-0 p-0">
          <thead className="">
            <tr>
              <th className="rounded-tl-xl bg-gray-50 p-3">
                <div className="m-0 flex items-center justify-start ">
                  <Button
                    variant="text"
                    title={t("components.Resources.PropertyForm.table.name")}
                    onClick={() => handleSort("name")}
                    className="whitespace-nowrap p-0"
                  >
                    <div className="ml-6 flex flex-row items-center justify-center">
                      {t("components.Resources.PropertyForm.table.name")}
                      {getSortIcon("name")}
                    </div>
                  </Button>
                </div>
              </th>
              <th className="bg-gray-50">
                <div className="flex items-center justify-start ">
                  <Button
                    variant="text"
                    title={t("components.Resources.PropertyForm.table.value")}
                    onClick={() => handleSort("value")}
                    className="whitespace-nowrap"
                  >
                    <div className="ml-6 flex flex-row items-center justify-center">
                      {t("components.Resources.PropertyForm.table.value")}
                      {getSortIcon("value")}
                    </div>
                  </Button>
                </div>
              </th>
              <th className="bg-gray-50">
                <div className="flex items-center justify-start ">
                  <Button
                    variant="text"
                    title={t("components.Resources.PropertyForm.table.unit")}
                    onClick={() => handleSort("unit")}
                    className="whitespace-nowrap"
                  >
                    <div className="ml-6 flex flex-row items-center justify-center">
                      {t("components.Resources.PropertyForm.table.unit")}
                      {getSortIcon("unit")}
                    </div>
                  </Button>
                </div>
              </th>

              <th className="rounded-tr-xl bg-gray-50 p-3 text-left">
                {t("components.Resources.PropertyForm.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {fields.length > 0 ? (
              fields.sort(sortItems).map((propField, index) =>
                propField.name === undefined || propField.name === "" ? (
                  <tr key={index}>
                    <td
                      colSpan={4}
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <Container width="full">
                        <Text>
                          {t(
                            "components.Resources.PropertyForm.properties.type"
                          )}
                        </Text>
                        {
                          <select
                            className=" rounded-md border border-gray-300 p-2"
                            {...register(`properties.${index}.name`, {
                              onChange: (e) =>
                                handleOnChangePropertyType(e, index),
                            })}
                          >
                            {nodeProperties.data
                              .filter(
                                (prop) =>
                                  (nodeType === "color" &&
                                    prop.key !== "colorHEX" &&
                                    prop.key !== "colorRAL") ||
                                  nodeType !== "color"
                              )
                              .map((property) => (
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
                      {propertyNameTranslation(propField.name)}
                    </td>
                    <td
                      className={`border-t-2 p-3  text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <GeneralInput
                        label={`properties.${index}.value`}
                        labelText={""}
                        register={register}
                        type={mapInputTypes(propField.type)}
                        error={errors?.properties?.[index]?.value}
                      />
                    </td>
                    <td
                      className={`border-t-2 p-3 text-center ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <Text>{propField.unit}</Text>
                    </td>
                    <td
                      className={`border-t-2 p-3 text-left ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <Container width="full" direction="row" justify="start">
                        <Button
                          title={t(
                            "components.Resources.PropertyForm.button.removeProperty"
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
                <td colSpan={4} className="border-t-2 p-3 text-center">
                  <Text>
                    {t("components.Resources.PropertyForm.table.noItems")}
                  </Text>
                </td>
              </tr>
            )}
            {freePropertyNamesAvailable() ? (
              <tr>
                <td
                  colSpan={4}
                  className={`border-t-2 p-3 text-left ${
                    fields.length % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <Container width="full" height="full">
                    <Button
                      width="full"
                      className="h-full w-full"
                      title={t(
                        "components.Resources.PropertyForm.button.addProperty"
                      )}
                      onClick={handleOnClickButtonAddProperty}
                      variant="text"
                      children={<AddIcon />}
                    />
                  </Container>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default ResourcesPropertyForm;
