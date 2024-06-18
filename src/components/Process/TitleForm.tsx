import useCreateProject from "@/api/Project/Mutations/useCreateProject";
import { Button, Container, Heading, Text } from "@component-library/index";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import OwnerGate from "../OwnerGate/OwnerGate";
import PermissionGate from "../PermissionGate/PermissionGate";

interface TitleFormProps {
  close: () => void;
  onSubmit: (title: string) => void;
  heading: string;
  buttonTitle: string;
  buttonPermissionGate: string;
  inputPlaceholder: string;
}

interface FormData {
  title: string;
}

const TitleForm: React.FC<PropsWithChildren<TitleFormProps>> = (props) => {
  const {
    close,
    heading,
    children,
    buttonTitle,
    onSubmit: _onSubmit,
    inputPlaceholder,
    buttonPermissionGate,
  } = props;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (
    data: FormData,
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    e?.preventDefault();
    _onSubmit(data.title);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      handleSubmit(onSubmit)();
    }
  };

  return (
    <OwnerGate>
      <form>
        <Container direction="col">
          <Heading variant="h1">{heading}</Heading>
          {children}
          <Container
            direction="col"
            gap={3}
            className="flex-wrap md:flex-nowrap"
          >
            <input
              autoFocus
              {...register("title", { required: true })}
              onKeyDown={handleKeyDown}
              placeholder={inputPlaceholder}
              className="w-fit rounded-xl border-2 bg-gray-100 p-2"
            />
            {errors.title ? (
              <Text variant="error">
                {t("Projects.components.TitleForm.error")}
              </Text>
            ) : null}
            <PermissionGate element={buttonPermissionGate}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="primary"
                title={buttonTitle}
                size="sm"
                width="fit"
              />
            </PermissionGate>
          </Container>
        </Container>
      </form>
    </OwnerGate>
  );
};

export default TitleForm;
