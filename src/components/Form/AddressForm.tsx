import { Button } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserAddressProps } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/index";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import {
  GeneralInput,
  InputLabelProps,
} from "@component-library/Form/GeneralInput";
import useUpdateUser, {
  NewUserAddressProps,
} from "@/api/User/Mutations/useUpdateUser";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";

interface AddressFormProps {
  closeModal?(): void;
  type?: "user" | "organization";
  title?: string;
  initialAddress?: UserAddressProps;
}

const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { closeModal, initialAddress, title, type = "user" } = props;
  const { t } = useTranslation();
  const updateUser = useUpdateUser();
  const updateOrganization = useUpdateOrganization();
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
    defaultValues:
      initialAddress !== undefined ? { ...initialAddress } : undefined,
  });

  const updateAddress = (data: NewUserAddressProps) => {
    if (type === "user") updateUser.mutate({ changes: { address: data } });
    else updateOrganization.mutate({ changes: { address: data } });
  };

  const createAddress = (data: NewUserAddressProps, id: string) => {
    if (type === "user")
      updateUser.mutate({
        changes: { address: { ...data, id } },
      });
    else
      updateOrganization.mutate({
        changes: { address: { ...data, id } },
      });
  };

  const onSubmit = (data: NewUserAddressProps) => {
    if (existingAddressID !== undefined) createAddress(data, existingAddressID);
    else updateAddress(data);

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
        title={t("general.button.save")}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default AddressForm;
