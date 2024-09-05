import {
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface ColorInputProps<T extends FieldValues> {
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

const ColorInput = <T extends FieldValues>(props: ColorInputProps<T>) => {
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
    <div className="flex w-full flex-col items-start justify-center gap-3">
      <div
        className="flex w-full flex-wrap items-start justify-start gap-5 md:w-fit"
        key={label}
      >
        <label
          htmlFor={label.toLowerCase()}
          style={{
            width: labelMaxWidth !== undefined ? `${labelMaxWidth}px` : "",
          }}
        >
          {labelText !== undefined ? labelText : label}
        </label>
        <input
          type="color"
          id={label.toLowerCase()}
          {...register(label, { ...registerOptions, required })}
          className={` w-32  rounded-md border border-gray-300 bg-slate-100 ${
            error !== undefined ? "border-2 border-red-500" : ""
          }`}
        />
      </div>
      {error !== undefined ? (
        <span className="text-red-500">{error.message}</span>
      ) : null}
    </div>
  );
};

export default ColorInput;
