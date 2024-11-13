import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import { useNavigate, useParams } from "react-router-dom";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useOrganization from "@/hooks/useOrganization";
import Table from "@/components/Table/Table";
import TableContainer from "@/components/Table/TableContainer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationServiceCostingItem } from "@/api/Organization/Querys/useGetOrganization";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";

interface CostingFormProps {}

const CostingForm: React.FC<CostingFormProps> = (props) => {
  const {} = props;
  const { serviceType: unsafeServiceType } = useParams();
  const { t } = useTranslation();
  const serviceType = unsafeServiceType as keyof typeof ServiceType;
  const { organization } = useOrganization();
  const updateOrganization = useUpdateOrganization();
  const navigate = useNavigate();

  const costItems =
    organization.details.services !== undefined
      ? organization.details.services[serviceType]
      : [];

  const costItemSchema = z.object({
    items: z.array(
      z.object({
        value: z.number({
          invalid_type_error: t("zod.number"),
        }),
        key: z.string(),
        name: z.string(),
        unit: z.string(),
      })
    ),
  });

  interface FormData {
    items: OrganizationServiceCostingItem[];
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(costItemSchema),
    defaultValues: {
      items: costItems,
    },
  });

  const onSubmit = (data: FormData) => {
    updateOrganization.mutate(
      {
        changes: {
          services: {
            ...organization.details.services,
            [serviceType]: data.items,
          },
        },
      },
      {
        onSuccess: () => {
          navigate("..");
        },
      }
    );
  };

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h2">
          {t(`Resources.Costing.Form.heading`)}
          {" ("}
          {t(`enum.ServiceType.${serviceType}`)}
          {" )"}
        </Heading>
        <Text></Text>
      </BackButtonContainer>
      <Divider />
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>{t("Resources.Costing.name")}</th>
                <th>{t("Resources.Costing.value")}</th>
                <th>{t("Resources.Costing.unit")}</th>
              </tr>
            </thead>
            <tbody>
              {costItems !== undefined && costItems.length > 0 ? (
                costItems.map((costingItem, index) => {
                  return (
                    <tr key={index}>
                      <td>{costingItem.name}</td>
                      <td>
                        <Container width="full" direction="col">
                          <input
                            className={`w-full rounded-md border-2 p-2 text-center ${
                              errors.items?.[index]?.value
                                ? "border-red-500"
                                : ""
                            }`}
                            {...register(`items.${index}.value`, {
                              valueAsNumber: true,
                            })}
                          />
                          {errors.items?.[index]?.value && (
                            <Text className=" text-red-500">
                              {errors.items?.[index]?.value?.message}
                            </Text>
                          )}
                        </Container>
                      </td>
                      <td>{costingItem.unit}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Item 1</td>
                  <td>Amount 1</td>
                  <td>Unit 1</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
        <Button
          title={t("general.button.save")}
          size="sm"
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </Container>
  );
};

export default CostingForm;
