import logger from "@/hooks/useLogger";
import { ErrorSharp } from "@mui/icons-material";
import React from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label: Path<T>;
  register: UseFormRegister<T>;
  labelText?: string;
  registerOptions?: RegisterOptions<T>;
  labelMaxWidth?: number;
  required?: boolean;
  error?: FieldError;
}

const TextInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  const {
    label,
    register,
    required = true,
    labelMaxWidth,
    labelText,
    error,
    registerOptions,
  } = props;

  return (
    <div className="mb-4 flex items-center justify-start gap-5" key={label}>
      <label
        htmlFor={label.toLowerCase()}
        style={{
          width: labelMaxWidth !== undefined ? `${labelMaxWidth * 8}px` : "",
        }}
      >
        {labelText !== undefined ? labelText : label}
      </label>
      <input
        type="text"
        id={label.toLowerCase()}
        {...register(label, { ...registerOptions, required })}
        className={`w-full rounded-md border border-gray-300 p-2 md:w-80 ${
          error !== undefined ? "border-2 border-red-500" : ""
        }`}
      />

      {error !== undefined ? (
        <span className="text-red-500">{error.message}</span>
      ) : null}
    </div>
  );
};

export default TextInput;
