import { Button } from "@component-library/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextInput from "../Inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser, { UserAddressProps } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/Typography";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

interface AddressFormProps {
  closeModal?(): void;
}

const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { closeModal } = props;
  const { t } = useTranslation();
  const { user, updateUserDetails } = useAuthorizedUser();

  const schema = yup.object().shape({
    firstName: yup.string().required(t("yup.required")),
    lastName: yup.string().required(t("yup.required")),
    company: yup.string(),
    street: yup.string().required(t("yup.required")),
    houseNumber: yup.string().required(t("yup.required")),
    zipcode: yup.string().required(t("yup.required")),
    city: yup.string().required(t("yup.required")),
    country: yup.string().required(t("yup.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddressProps>({
    resolver: yupResolver(schema),
    defaultValues: user.details.address,
  });

  const onSubmit = (data: UserAddressProps) => {
    updateUserDetails({ address: data });
    closeModal !== undefined ? closeModal() : null;
  };

  const labels: (keyof UserAddressProps)[] = [
    "firstName",
    "lastName",
    "company",
    "street",
    "houseNumber",
    "zipcode",
    "city",
    "country",
  ];

  const maxLength = Math.max(
    ...labels.map(
      (label) =>
        t(`component-library.Form.AddressForm.AddressForm.labels.${label}`)
          .length
    )
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-5"
    >
      <Heading variant="h1">
        {t("component-library.Form.AddressForm.AddressForm.header")}
      </Heading>
      {labels.map((label) => (
        <TextInput
          labelText={t(
            `component-library.Form.AddressForm.AddressForm.labels.${label}`
          )}
          label={label}
          register={register}
          error={errors[label]}
          labelMaxWidth={maxLength}
          key={label}
        />
      ))}
      <Text>{t("component-library.Form.AddressForm.AddressForm.hint")}</Text>
      <Button
        variant="primary"
        title={t("component-library.Form.AddressForm.AddressForm.buttons.save")}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default AddressForm;
