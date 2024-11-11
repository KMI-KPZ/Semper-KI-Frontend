import { Button, Container, Heading } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import {
  GeneralInput,
  InputLabelProps,
} from "@component-library/Form/GeneralInput";
import logger from "@/hooks/useLogger";

export interface ExampleDataProps {
  text: string;
  count: number;
  email: string;
  area: string;
  isTrue: boolean;
}

interface ExampleFormProps {
  closeModal?(): void;
  initialData?: ExampleDataProps;
  customSubmit?(data: ExampleDataProps): void;
}

const ExampleForm: React.FC<ExampleFormProps> = (props) => {
  const { closeModal, customSubmit, initialData } = props;
  const { t } = useTranslation();
  const { getMaxLabelWidth } = useGeneralInput();

  const schema = yup.object().shape({
    text: yup
      .string()
      .required(
        t("yup.requiredName", { name: t("components.Form.ExampleForm.text") })
      ),
    count: yup.number().typeError(t("yup.number")).required(t("yup.required")),
    email: yup
      .string()
      .email(t("yup.email"))
      .required(
        t("yup.requiredName", { name: t("components.Form.ExampleForm.email") })
      ),
    area: yup.string().required(t("yup.required")),
    isTrue: yup.boolean().required(t("yup.required")),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleDataProps>({
    resolver: yupResolver(schema),
    defaultValues: initialData !== undefined ? initialData : undefined,
  });

  const handleOnClickButtonSubmit = (data: ExampleDataProps) => {
    logger("ExampleForm", data);
    if (customSubmit !== undefined) {
      customSubmit(data);
    } else {
      // do something else
    }
    closeModal !== undefined ? closeModal() : null;
  };

  const handleOnClickButtonReset = () => {
    reset();
  };

  const labelItems: InputLabelProps<ExampleDataProps>[] = [
    { label: "text", type: "text" },
    { label: "count", type: "number" },
    { label: "email", type: "text" },
    { label: "area", type: "textarea" },
    { label: "isTrue", type: "checkbox" },
  ];

  const maxLength = getMaxLabelWidth(
    labelItems.map((labelItem) =>
      t(`components.Form.ExampleForm.${labelItem.label}`)
    )
  );

  return (
    <form
      onSubmit={handleSubmit(handleOnClickButtonSubmit)}
      className={`flex h-full w-full flex-col items-center justify-start gap-5 overflow-auto bg-white p-5 md:justify-center`}
    >
      <Heading variant="h1">{t("components.Form.ExampleForm.heading")}</Heading>
      {labelItems.map((label, index) => (
        <GeneralInput
          key={index}
          label={label.label}
          labelText={t(`components.Form.ExampleForm.${label.label}`)}
          type={label.type}
          register={register}
          error={errors[label.label]}
          labelMaxWidth={maxLength}
        />
      ))}
      <Container>
        <Button
          variant="primary"
          title={t("general.button.reset")}
          onClick={handleOnClickButtonReset}
        />
        <Button
          variant="primary"
          title={t("general.button.submit")}
          onClick={handleSubmit(handleOnClickButtonSubmit)}
        />
      </Container>
    </form>
  );
};

export default ExampleForm;
