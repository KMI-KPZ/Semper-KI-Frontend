import { Button, Container, Heading, Text } from "@component-library/index";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  ModelLevelOfDetail,
  ProcessModel,
} from "@/api/Process/Querys/useGetProcess";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManufacturingModelUploadData } from "../Upload/Upload";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import { useNavigate } from "react-router-dom";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface EditModelCardProps {
  model: ProcessModel;
}
const EditModelCard: React.FC<EditModelCardProps> = (props) => {
  const { model } = props;
  const { t } = useTranslation();
  const { process } = useManufacturingProcess();
  const updateProcess = useUpdateProcess();
  const navigate = useNavigate();
  const { prevGroups, nextGroups } = useContext(ManufacturingGroupContext);

  const formSchema = z.object({
    modelID: z.string().optional(),
    tags: z.string().optional(),
    scalingFactor: z.number().min(1).max(100000).optional(),
    licenses: z.string().min(
      1,
      t("zod.requiredName", {
        name: t(
          `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.license`
        ),
      })
    ),
    certificates: z.string().optional(),
    quantity: z
      .number()
      .min(1, t("zod.numberMin", { min: 1 }))
      .max(10000000, t("zod.numberMax", { max: 10000000 })),
    levelOfDetail: z.nativeEnum(ModelLevelOfDetail, {
      errorMap: () => ({
        message: t("zod.requiredName", {
          name: t(
            `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.levelOfDetail`
          ),
        }),
      }),
    }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ManufacturingModelUploadData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...model,
      tags: model.tags.join(", "),
      licenses: model.licenses.join(", "),
      certificates: model.certificates.join(", "),
      scalingFactor:
        model.scalingFactor !== undefined ? model.scalingFactor : 100,
    },
  });

  const onSubmit = (data: ManufacturingModelUploadData) => {
    updateProcess.mutate(
      {
        processIDs: [process.processID],
        updates: {
          changes: {
            serviceDetails: {
              groups: [
                ...prevGroups,
                {
                  model: [
                    {
                      ...model,
                      ...data,
                      certificates:
                        data.certificates === undefined
                          ? []
                          : data.certificates
                              .split(",")
                              .map((item) => item.trim()),
                      licenses:
                        data.licenses === undefined
                          ? []
                          : data.licenses.split(",").map((item) => item.trim()),
                      tags:
                        data.tags === undefined
                          ? []
                          : data.tags.split(",").map((item) => item.trim()),
                      quantity: data.quantity !== undefined ? data.quantity : 1,
                      levelOfDetail:
                        data.levelOfDetail !== undefined
                          ? data.levelOfDetail
                          : ModelLevelOfDetail.MEDIUM,
                      scalingFactor:
                        data.scalingFactor !== undefined
                          ? data.scalingFactor
                          : 100,
                    },
                  ],
                },
                ...nextGroups,
              ],
            },
          },
        },
      },
      {
        onSuccess: () => {
          navigate("../../../../..");
        },
      }
    );
  };

  return (
    <form className="flex w-full flex-col items-center justify-start gap-0  bg-white">
      <img src={model.imgPath} className="h-40 w-full object-contain " />
      <Container direction="col" width="full" className="">
        <Container width="full" className="relative">
          <Heading variant="h3">{model.fileName}</Heading>
        </Container>
        <table className="w-full table-auto border-separate border-spacing-x-5 border-spacing-y-2">
          <tbody>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.size`
              )}`}</th>
              <td>{model !== undefined ? "xxx" : null}</td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.date`
              )}`}</th>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.certificate`
              )}`}</th>
              <td>
                <input
                  className={`flex w-full rounded-md border-2 p-2
            ${errors.certificates ? "border-red-500 bg-red-500" : ""}
          }`}
                  placeholder={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.certificatePH"
                  )}
                  {...register(`certificates`)}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.license`
              )}`}</th>
              <td>
                <select
                  {...register(`licenses`)}
                  className={`flex w-full rounded-md border-2 p-2 ${
                    errors.licenses ? "border-red-500 " : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.selectLicense`
                    )}
                  </option>
                  <option value="CC BY">CC BY</option>
                  <option value="CC BY-NC">CC BY-NC</option>
                  <option value="CC BY-ND">CC BY-ND</option>
                  <option value="CC BY-SA">CC BY-SA</option>
                  <option value="CC BY-NC-ND">CC BY-NC-ND</option>
                  <option value="CC BY-NC-SA">CC BY-NC-SA</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="text-left ">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.tags`
              )}`}</th>
              <td>
                <input
                  className={`flex w-full rounded-md border-2 p-2
            ${errors.tags ? "border-red-500 bg-red-500" : ""}}`}
                  placeholder={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.tagsPH"
                  )}
                  {...register(`tags`)}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.quantity`
              )}`}</th>
              <td>
                <input
                  className={`flex w-full rounded-md border-2 p-2
            ${errors.quantity ? "border-red-500 bg-red-500" : ""}}`}
                  {...register(`quantity`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.levelOfDetail`
              )}`}</th>
              <td>
                <select
                  {...register(`levelOfDetail`, {
                    valueAsNumber: true,
                  })}
                  className={`flex w-full rounded-md border-2 p-2 ${
                    errors.levelOfDetail ? "border-red-500 " : ""
                  }`}
                >
                  <option value="" disabled selected>
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.selectLevelOfDetail`
                    )}
                  </option>
                  <option value={ModelLevelOfDetail.LOW}>
                    {t(`enum.ModelLevelOfDetail.LOW`)}
                  </option>
                  <option value={ModelLevelOfDetail.MEDIUM}>
                    {t(`enum.ModelLevelOfDetail.MEDIUM`)}
                  </option>
                  <option value={ModelLevelOfDetail.HIGH}>
                    {t(`enum.ModelLevelOfDetail.HIGH`)}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.scalingFactor`
              )}`}</th>
              <td>
                <Container direction="row">
                  <input
                    className={`flex w-full rounded-md border-2 p-2
                    ${
                      errors.scalingFactor ? "border-red-500 bg-red-500" : ""
                    }}`}
                    {...register(`scalingFactor`, {
                      valueAsNumber: true,
                    })}
                  />
                  <Text>%</Text>
                </Container>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="pt-2 ">
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.mandatory"
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          title={t("general.button.save")}
          variant="primary"
          size="sm"
          onClick={handleSubmit(onSubmit)}
        />
      </Container>
    </form>
  );
};

export default EditModelCard;
