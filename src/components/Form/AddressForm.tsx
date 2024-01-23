import { Button } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextInput from "../../../component-library/Form/Inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser, { UserAddressProps } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";

interface AddressFormProps {
  closeModal?(): void;
  initialAddress?: UserAddressProps;
  customSubmit?(data: UserAddressProps): void;
}

const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { closeModal, customSubmit, initialAddress } = props;
  const { t } = useTranslation();
  const { user, updateUserDetails } = useAuthorizedUser();
  const { getMaxLabelWidth } = useGeneralInput();

  const schema = yup.object().shape({
    firstName: yup.string().required(t("yup.required")),
    lastName: yup.string().required(t("yup.required")),
    company: yup.string(),
    street: yup.string().required(t("yup.required")),
    houseNumber: yup
      .number()
      .typeError(t("yup.number"))
      .required(t("yup.required")),
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
    defaultValues:
      initialAddress !== undefined ? initialAddress : user.details.address,
  });

  const onSubmit = (data: UserAddressProps) => {
    if (customSubmit !== undefined) {
      customSubmit(data);
    } else {
      updateUserDetails({ address: data });
    }
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

  const maxLength = getMaxLabelWidth(
    labels.map((label) => t(`components.Form.AddressForm.labels.${label}`))
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full w-full flex-col items-center justify-start gap-5 overflow-auto bg-white p-5 md:justify-center`}
    >
      <Heading variant="h1">{t("components.Form.AddressForm.header")}</Heading>
      {labels.map((label) => (
        <TextInput
          labelText={t(`components.Form.AddressForm.labels.${label}`)}
          label={label}
          register={register}
          error={errors[label]}
          labelMaxWidth={maxLength}
          key={label}
        />
      ))}
      <Text>{t("components.Form.AddressForm.hint")}</Text>
      <Button
        variant="primary"
        title={t("components.Form.AddressForm.buttons.save")}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default AddressForm;
