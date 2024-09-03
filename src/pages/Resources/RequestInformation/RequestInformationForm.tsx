import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading } from "@component-library/index";
import { useSearchParams } from "react-router-dom";
import { OntoNodeType } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { useForm } from "react-hook-form";
import { GeneralInput } from "@component-library/Form/GeneralInput";
import useSubmitRequestInformation from "@/api/Resources/Organization/Mutations/useSubmitRequestInformation";

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

  const selectedType: OntoNodeType = parseOntoNodeType(
    searchParams.get("type")
  );

  const { register, handleSubmit } = useForm<NodeRequestInformation>({
    defaultValues: { type: selectedType },
  });

  const onSubmit = (data: NodeRequestInformation) => {
    submitRequestInformation.mutate(data);
  };

  return (
    <Container width="full" direction="col">
      <form className="flex flex-col items-center justify-start gap-5">
        <Heading variant="h1">
          {t("Resources.components.RequestInformationForm.header")}
        </Heading>
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
        <GeneralInput register={register} label="name" type="text" />
        <GeneralInput register={register} label="url" type="text" />
        <GeneralInput register={register} label="manufacturer" type="text" />
        <Button
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
