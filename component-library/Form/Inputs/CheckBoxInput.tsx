import {
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface CheckBoxInputProps<T extends FieldValues> {
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

const CheckBoxInput = <T extends FieldValues>(props: CheckBoxInputProps<T>) => {
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
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <div
        className="flex w-full flex-wrap items-center justify-start gap-5 md:w-fit"
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
          type="checkbox"
          id={label.toLowerCase()}
          {...register(label, { ...registerOptions, required })}
          className={`h-6 w-6 min-w-[600px] grow rounded-md border border-gray-300 bg-slate-100 p-2 text-center ${
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

export default CheckBoxInput;
