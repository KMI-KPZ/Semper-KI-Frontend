import { Button, Heading, Text } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextInput from "../../../component-library/Form/Inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import {
  GeneralInput,
  InputLabelProps,
} from "@component-library/Form/GeneralInput";

export interface ExampleDataProps {
  text: string;
  count: number;
  email: string;
  area: string;
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
    text: yup.string().required(t("yup.required")),
    count: yup.number().typeError(t("yup.number")).required(t("yup.required")),
    email: yup.string().email(t("yup.email")).required(t("yup.required")),
    area: yup.string().required(t("yup.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleDataProps>({
    resolver: yupResolver(schema),
    defaultValues: initialData !== undefined ? initialData : undefined,
  });

  const onSubmit = (data: ExampleDataProps) => {
    if (customSubmit !== undefined) {
      customSubmit(data);
    } else {
      // do something else
    }
    closeModal !== undefined ? closeModal() : null;
  };

  const labelItems: InputLabelProps<ExampleDataProps>[] = [
    { label: "text", type: "text" },
    { label: "count", type: "text" },
    { label: "email", type: "text" },
    { label: "area", type: "textarea" },
  ];

  const maxLength = getMaxLabelWidth(
    labelItems.map((labelItem) =>
      t(`components.Form.ExampleForm.${labelItem.label}`)
    )
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full w-full flex-col items-center justify-start gap-5 overflow-auto bg-white p-5 md:justify-center`}
    >
      <Heading variant="h1">{t("components.Form.ExampleForm.title")}</Heading>
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
      <Button
        variant="primary"
        title={t("components.Form.ExampleForm.button.save")}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default ExampleForm;
