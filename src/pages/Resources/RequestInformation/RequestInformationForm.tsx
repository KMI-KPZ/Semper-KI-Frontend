import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Heading } from "@component-library/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OntoNodeType } from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import { useForm } from "react-hook-form";
import { GeneralInput } from "@component-library/Form/GeneralInput";
import useSubmitRequestInformation from "@/api/Resources/Organization/Mutations/useSubmitRequestInformation";
import logger from "@/hooks/useLogger";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

interface RequestInformationFormProps {}

const allNodeTypes: OntoNodeType[] = [
  "printer",
  "material",
  "additionalRequirement",
];

const parseOntoNodeType = (type: string | null): OntoNodeType => {
  if (type === null) return "printer";
  if (allNodeTypes.map((type) => type as string).includes(type))
    return type as OntoNodeType;
  return "printer";
};

export interface NodeRequestInformation {
  type: OntoNodeType;
  name?: string;
  url?: string;
  manufacturer?: string;
}

const RequestInformationForm: React.FC<RequestInformationFormProps> = (
  props
) => {
  const {} = props;
  const [searchParams, _] = useSearchParams();
  const { t } = useTranslation();
  const submitRequestInformation = useSubmitRequestInformation();
  const navigate = useNavigate();

  const selectedType: OntoNodeType = parseOntoNodeType(
    searchParams.get("type")
  );

  const { register, handleSubmit } = useForm<NodeRequestInformation>({
    defaultValues: { type: selectedType },
  });

  const onSubmit = (data: NodeRequestInformation) => {
    submitRequestInformation.mutate(data, {
      onSuccess: () => {
        logger("RequestInformationForm", "onSubmit", "success");
        navigate("..");
      },
    });
  };

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h2">
          {t("Resources.components.RequestInformationForm.header")}
        </Heading>
      </BackButtonContainer>

      <form className="flex w-full flex-col items-center justify-start gap-5">
        <Divider />
        <select
          className="rounded-xl border-2 p-3 text-center"
          {...register("type")}
        >
          {allNodeTypes.map((type, index) => (
            <option key={index} value={type}>
              {t(`types.OntoNodeType.${type}`)}
            </option>
          ))}
        </select>
        <GeneralInput
          register={register}
          required={false}
          label="name"
          type="text"
        />
        <GeneralInput
          register={register}
          required={false}
          label="url"
          type="text"
        />
        <GeneralInput
          register={register}
          required={false}
          label="manufacturer"
          type="text"
        />
        <Button
          loading={submitRequestInformation.isLoading}
          size="sm"
          variant="primary"
          title={t("Resources.components.RequestInformationForm.button.send")}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </Container>
  );
};

export default RequestInformationForm;
