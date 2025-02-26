import React from "react";
import { OntoNodeType } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { NodeFormData } from "../NodeForm";
import NodeCustomFormTechnology from "./components/Technology";
import NodeCustomFormMaterialCategory from "./components/MaterialCategory";
import NodeCustomFormHexColors from "./components/HexColors";
import { Container } from "@component-library/index";
import NodeCustomFormMaterialType from "./components/MaterialType";

interface NodeCustomFormProps {
  nodeType: OntoNodeType;
  register: UseFormRegister<NodeFormData>;
  control: Control<NodeFormData, any>;
  watch: UseFormWatch<NodeFormData>;
  setValue: UseFormSetValue<NodeFormData>;
}

const NodeCustomForm: React.FC<NodeCustomFormProps> = (props) => {
  const { nodeType, register, control, watch, setValue } = props;

  switch (nodeType) {
    case "printer":
      return <NodeCustomFormTechnology register={register} />;
    case "material":
      return (
        <Container direction="col" width="full" justify="start">
          <NodeCustomFormMaterialCategory register={register} />
          <NodeCustomFormMaterialType register={register} />
        </Container>
      );
    case "color":
      return (
        <NodeCustomFormHexColors
          setValue={setValue}
          control={control}
          register={register}
          watch={watch}
        />
      );
  }
  return null;
};

export default NodeCustomForm;
