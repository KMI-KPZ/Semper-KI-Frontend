import { Button } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingSuspense } from "@component-library/index";
import logger from "@/hooks/useLogger";
import useGetOntologyMaterial from "@/api/Ontology/Querys/useGetOntologyMaterial";
import useGetFlatOntologyMaterials from "@/api/Ontology/Querys/useGetFlatOntologyMaterials";

interface ResourcesMaterialsFormProps {}

const ResourcesMaterialsForm: React.FC<ResourcesMaterialsFormProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const [materialID, setMaterialID] = useState<string>("");
  const materialsQuery = useGetFlatOntologyMaterials();

  const schema = yup
    .object({
      name: yup.string().required(
        t("yup.requiredName", {
          name: t("Organization.Roles.Roles.name"),
        })
      ),
      description: yup.string().required(
        t("yup.requiredName", {
          name: t("Organization.Roles.Roles.description"),
        })
      ),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    logger("onSubmitInvite", data);
  };

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5"
      data-testid="resources-material-form"
    >
      <Heading variant="h2">{t("Resources.Materials.form.header")}</Heading>
      <div className="flex w-full flex-col items-center justify-start gap-5 md:flex-row">
        <input
          type="search"
          className="borde-2 w-full border-2 border-slate-800 p-3 pl-5"
        />
        <Button
          startIcon={<SearchIcon />}
          title={t("Resources.Materials.form.button.search")}
        />
      </div>
      <LoadingSuspense
        query={materialsQuery}
        errorText={t("Resources.Materials.form.empty")}
      >
        {materialsQuery.data !== undefined && materialsQuery.data.length > 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-5">
            {materialsQuery.data.map((material, index) => (
              <div
                key={index}
                className="flex w-full flex-row items-center justify-between"
              >
                <Text variant="body">{material.title}</Text>
                <Text variant="body">{material.URI}</Text>
              </div>
            ))}
          </div>
        ) : (
          <Text variant="body">{t("Resources.Materials.form.empty")}</Text>
        )}
      </LoadingSuspense>
      <form></form>
    </div>
  );
};

export default ResourcesMaterialsForm;
