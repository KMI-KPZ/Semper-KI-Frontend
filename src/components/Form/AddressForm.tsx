import { Button } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextInput from "../../../component-library/Form/Inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser, {
  NewUserAddressProps,
  UserAddressProps,
} from "@/hooks/useUser";
import { Heading, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import {
  GeneralInput,
  InputLabelProps,
} from "@component-library/Form/GeneralInput";

interface AddressFormProps {
  closeModal?(): void;
  title?: string;
  initialAddress?: UserAddressProps;
}

const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { closeModal, initialAddress, title } = props;
  const { t } = useTranslation();
  const { updateAddress, createAddress } = useAuthorizedUser();
  const { getMaxLabelWidth } = useGeneralInput();
  const existingAddressID = initialAddress?.id;

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
    standard: yup.boolean().required(t("yup.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserAddressProps>({
    resolver: yupResolver(schema),
    defaultValues: initialAddress !== undefined ? initialAddress : undefined,
  });

  const onSubmit = (data: NewUserAddressProps) => {
    if (existingAddressID !== undefined) {
      updateAddress.mutate({ ...data, id: existingAddressID });
    } else {
      createAddress.mutate(data);
    }
    closeModal !== undefined ? closeModal() : null;
  };

  const labelItems: InputLabelProps<NewUserAddressProps>[] = [
    { label: "firstName", type: "text" },
    { label: "lastName", type: "text" },
    { label: "company", type: "text" },
    { label: "street", type: "text" },
    { label: "houseNumber", type: "text" },
    { label: "zipcode", type: "text" },
    { label: "city", type: "text" },
    { label: "country", type: "text" },
    { label: "standard", type: "checkbox" },
  ];

  const maxLength = getMaxLabelWidth(
    labelItems.map((labelItem) =>
      t(`components.Form.AddressForm.labels.${labelItem.label}`)
    )
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full w-full flex-col items-center justify-start gap-5 overflow-auto bg-white p-5 md:justify-center`}
    >
      <Heading variant="h1">
        {title !== undefined ? title : t("components.Form.AddressForm.header")}
      </Heading>
      {labelItems.map((labelItem, index) => (
        <GeneralInput
          key={index}
          label={labelItem.label}
          labelText={t(`components.Form.AddressForm.labels.${labelItem.label}`)}
          type={labelItem.type}
          register={register}
          error={errors[labelItem.label]}
          labelMaxWidth={maxLength}
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
