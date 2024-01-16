import logger from "@/hooks/useLogger";
import { ErrorSharp } from "@mui/icons-material";
import React from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Merge,
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
  error?:
    | FieldError
    | Merge<FieldError, (FieldError | undefined)[]>
    | undefined;
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
    <div
      className="mb-4 flex w-full flex-wrap items-center justify-start gap-5 md:w-fit"
      key={label}
    >
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
        className={`grow rounded-md border border-gray-300 p-2 md:w-[400px] ${
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
