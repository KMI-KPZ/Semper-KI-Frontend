// import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ErrorDisplayProps<T extends FieldValues> {
  errors: FieldErrors<T> | undefined;
  className?: string;
}

const ErrorDisplay = <T extends FieldValues>(props: ErrorDisplayProps<T>) => {
  const { errors, className = "" } = props;
  // const { t } = useTranslation();

  const getCompressedErrors = (errors: FieldErrors<T>): string[] => {
    const uniqueErrors = new Set<string>();

    const traverseErrors = (errObj: FieldErrors<T> | unknown) => {
      if (!errObj || typeof errObj !== "object") return;

      if (
        "message" in errObj &&
        typeof errObj.message === "string" &&
        "ref" in errObj &&
        typeof errObj.ref === "object" &&
        "type" in errObj &&
        typeof errObj.type === "string"
      ) {
        uniqueErrors.add(errObj.message);
      } else {
        Object.values(errObj).forEach(traverseErrors); // Recursively traverse objects and arrays
      }
    };

    traverseErrors(errors);
    return Array.from(uniqueErrors);
  };

  return errors !== undefined && getCompressedErrors(errors).length > 0 ? (
    <Container
      className={twMerge("rounded-md border-2 bg-white p-3", className)}
      direction="col"
    >
      {getCompressedErrors(errors).map((error, index) => (
        <Text key={index} className=" text-red-500">
          {error}
        </Text>
      ))}
    </Container>
  ) : null;
};

export default ErrorDisplay;
