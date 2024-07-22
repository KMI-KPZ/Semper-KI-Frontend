import {
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import TextInput from "./Inputs/TextInput";
import TextAreaInput from "./Inputs/TextAreaInput";
import NumberInput from "./Inputs/NumberInput";
import CheckBoxInput from "./Inputs/CheckBoxInput";
import ColorInput from "./Inputs/ColorInput";

export type InputType = "text" | "textarea" | "number" | "checkbox" | "color";

export interface InputLabelProps<T extends FieldValues> {
  type: InputType;
  label: Path<T>;
}

interface GeneralInputProps<T extends FieldValues> {
  type: InputType;
  label: Path<T>;
  register: UseFormRegister<T>;
  labelText?: string;
  registerOptions?: RegisterOptions<T>;
  labelMaxWidth?: number;
  required?: boolean;
  error?:
    | FieldError
    | Merge<FieldError, (FieldError | undefined)[]>
    | undefined;
}

export const GeneralInput = <T extends FieldValues>(
  props: GeneralInputProps<T>
) => {
  const { type } = props;
  switch (type) {
    case "text":
      return <TextInput {...props} />;
    case "textarea":
      return <TextAreaInput {...props} />;
    case "number":
      return <NumberInput {...props} />;
    case "checkbox":
      return <CheckBoxInput {...props} />;
    case "color":
      return <ColorInput {...props} />;
  }
};
