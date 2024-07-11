import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import {
  GeneralInput,
  InputLabelProps,
} from "@component-library/Form/GeneralInput";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import useSendContactForm from "@/api/ContactForm/Muations/useSendContactForm";

interface ContactFormProps {
  closeEdit: () => void;
}

export interface ContactFormDataProps {
  message: string;
  email: string;
  name: string;
  subject: string;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { closeEdit } = props;
  const { t } = useTranslation();
  const sendContactForm = useSendContactForm();
  const { getMaxLabelWidth } = useGeneralInput();

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email(t("yup.email"))
        .required(
          t("yup.requiredName", { name: t("Organization.Info.email") })
        ),
      subject: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Footer.ContactForm.subject"),
        })
      ),
      name: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Footer.ContactForm.name"),
        })
      ),
      message: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Footer.ContactForm.message"),
        })
      ),
    })
    .required();

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      subject: "",
      name: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormDataProps) => {
    sendContactForm.mutate(data);
    closeEdit();
  };

  const labelItems: InputLabelProps<ContactFormDataProps>[] = [
    { label: "email", type: "text" },
    { label: "subject", type: "text" },
    { label: "name", type: "text" },
    { label: "message", type: "textarea" },
  ];

  const maxLength = getMaxLabelWidth(
    labelItems.map((labelItem) =>
      t(`components.Footer.ContactForm.${labelItem.label}`)
    )
  );

  return (
    <form
      className={`flex h-full w-full flex-col items-center justify-start gap-5 overflow-auto bg-white p-5 md:justify-center`}
    >
      <Heading variant="h2" className={`p-5 text-center`}>
        {t("components.Footer.ContactForm.title")}
      </Heading>
      {labelItems.map((label, index) => {
        return (
          <GeneralInput
            key={index}
            label={label.label}
            labelText={t(`components.Footer.ContactForm.${label.label}`)}
            type={label.type}
            register={register}
            error={errors[label.label]}
            labelMaxWidth={maxLength}
          />
        );
      })}
      <Button
        title={t(`components.Footer.ContactForm.button`)}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
export default ContactForm;
