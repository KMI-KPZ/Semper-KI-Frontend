import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/index";
import { OrganizationPriority } from "@/api/Organization/Querys/useGetOrganization";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";
import { useQueryClient } from "@tanstack/react-query";

interface PrioritiesFormItemProps {
  freePoints: number;
  priority: OrganizationPriority;
  type: "orga" | "process";
}

const PrioritiesFormItem: React.FC<PrioritiesFormItemProps> = (props) => {
  const { priority, freePoints, type } = props;
  const { invalidateQueries } = useQueryClient();
  const { t } = useTranslation();
  const updateOrganization = useUpdateOrganization();
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();

  const length = 7;

  const radioButtons = Array.from({ length }, (_, i) => i + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value, 10);
    const value =
      freePoints + priority.value - parsedValue >= 0
        ? parsedValue
        : freePoints + priority.value;

    if (type === "orga")
      updateOrganization.mutate({
        changes: {
          priorities: {
            [priority.type]: { value },
          },
        },
      });
    else {
      updateProcess.mutate({
        processIDs: [process.processID],
        updates: {
          changes: {
            processDetails: {
              priorities: {
                [priority.type]: { value },
              },
            },
          },
        },
      });
    }
  };

  return (
    <tr>
      <td>
        <Text>{t(`types.OrganizationPriorityType.${priority.type}`)}</Text>
      </td>
      {radioButtons.map((value) => (
        <td key={value} className="text-center">
          <input
            type="radio"
            value={value}
            onChange={handleChange}
            name={priority.type}
            checked={priority.value === value}
            disabled={freePoints + priority.value - value < 0}
            className="h-6 w-6"
          />
        </td>
      ))}
    </tr>
  );
};

export default PrioritiesFormItem;
