import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Heading } from "@component-library/index";
import { OrganizationPriority } from "@/api/Organization/Querys/useGetOrganization";
import PrioritiesFormItem from "./PrioritiesFormItem";
import { twMerge } from "tailwind-merge";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";

interface PrioritiesFormProps {
  type: "orga" | "process";
  priorities: OrganizationPriority[] | undefined;
}

const PrioritiesForm: React.FC<PrioritiesFormProps> = (props) => {
  const { priorities = [], type } = props;
  const { t } = useTranslation();
  const updateOrganization = useUpdateOrganization();
  const updateProcess = useUpdateProcess();
  const { process } = useProcess();
  const [state, setState] = useState<OrganizationPriority[]>(priorities);

  const usedPoints = state.reduce((acc, priority) => acc + priority.value, 0);
  const maxPoints = state.length * 4;
  const freePoints = maxPoints - usedPoints;

  const updateState = (value: number, priority: OrganizationPriority) => {
    setState((prevState) => {
      const newPriorities = [...prevState];
      const index = newPriorities.findIndex((p) => p.type === priority.type);
      let remainingPoints = value - (newPriorities[index].value + freePoints);
      newPriorities[index] = {
        ...newPriorities[index],
        value: Math.max(value, 1),
      };

      let i = (index + 1) % newPriorities.length;
      while (remainingPoints > 0) {
        if (newPriorities[i].value > 1) {
          const reduciblePoints = Math.min(
            newPriorities[i].value - 1,
            remainingPoints
          );
          newPriorities[i] = {
            ...newPriorities[i],
            value: newPriorities[i].value - reduciblePoints,
          };
          remainingPoints -= reduciblePoints;
        }
        i = (i + 1) % newPriorities.length;
      }

      return newPriorities;
    });
  };

  const handleOnButtonClickSave = () => {
    uploadPriorities(state);
  };

  const uploadPriorities = (priorities: OrganizationPriority[]) => {
    if (type === "orga")
      updateOrganization.mutate({
        changes: {
          priorities: priorities.reduce((acc, p) => {
            acc[p.type] = { value: p.value };
            return acc;
          }, {} as Record<string, { value: number }>),
        },
      });
    else {
      updateProcess.mutate({
        processIDs: [process.processID],
        updates: {
          changes: {
            processDetails: {
              priorities: priorities.reduce((acc, p) => {
                acc[p.type] = { value: p.value };
                return acc;
              }, {} as Record<string, { value: number }>),
            },
          },
        },
      });
    }
  };

  const handleOnButtonClickReset = () => {
    const resetState: OrganizationPriority[] = [
      { type: "cost", value: 4 },
      { type: "time", value: 4 },
      { type: "quality", value: 4 },
      { type: "quantity", value: 4 },
      { type: "resilience", value: 4 },
      { type: "sustainability", value: 4 },
    ];
    setState(resetState);
    uploadPriorities(resetState);
  };

  return (
    <Container
      width="full"
      direction="col"
      id="PrioritiesForm"
      className="gap-2"
    >
      <Heading variant="h2">
        {t("components.Form.PrioritiesForm.header")}
      </Heading>
      <Divider />
      <Container className="overflow-auto" justify="start" direction="row">
        <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-1  ">
          <thead>
            <tr>
              <th rowSpan={3} className="text-left align-text-top">
                {t("components.Form.PrioritiesForm.type")}
              </th>
              <th
                colSpan={7}
                className={twMerge(
                  `text-center`,
                  freePoints < 0 ? "text-red-500" : "text-green-500"
                )}
              >
                {t("components.Form.PrioritiesForm.value")}
                {" | "}
                {t("components.Form.PrioritiesForm.points", { freePoints })}
              </th>
            </tr>
            <tr>
              <td>{t("components.Form.PrioritiesForm.low")}</td>
              <td />
              <td />
              <td colSpan={1} className="text-center">
                {t("components.Form.PrioritiesForm.medium")}
              </td>
              <td />
              <td />
              <td colSpan={1}>{t("components.Form.PrioritiesForm.high")}</td>
            </tr>
            <tr>
              <td className="w-10 text-center">1</td>
              <td className="w-10 text-center">2</td>
              <td className="w-10 text-center">3</td>
              <td className="w-10 text-center">4</td>
              <td className="w-10 text-center">5</td>
              <td className="w-10 text-center">6</td>
              <td className="w-10 text-center">7 </td>
            </tr>
          </thead>
          <tbody>
            {state.map((priority: OrganizationPriority, index) => (
              <PrioritiesFormItem
                priority={priority}
                key={index}
                updateState={updateState}
              />
            ))}
          </tbody>
        </table>
      </Container>
      <Container width="full" direction="row">
        <Button
          title={t("general.button.reset")}
          variant="secondary"
          size="sm"
          onClick={handleOnButtonClickReset}
        />
        <Button
          title={
            type === "process"
              ? t("components.Form.PrioritiesForm.button.save")
              : t("general.button.save")
          }
          variant="primary"
          size="sm"
          loading={updateOrganization.isLoading || updateProcess.isLoading}
          onClick={handleOnButtonClickSave}
        />
      </Container>
    </Container>
  );
};

export default PrioritiesForm;
