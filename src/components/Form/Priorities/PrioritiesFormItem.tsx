import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { OrganizationPriority } from "@/api/Organization/Querys/useGetOrganization";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import logger from "@/hooks/useLogger";

interface PrioritiesFormItemProps {
  freePoints: number;
  priority: OrganizationPriority;
}

const PrioritiesFormItem: React.FC<PrioritiesFormItemProps> = (props) => {
  const { priority, freePoints } = props;
  const { t } = useTranslation();
  const updateOrganization = useUpdateOrganization();

  const length = 7;

  const radioButtons = Array.from({ length }, (_, i) => i + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value, 10);
    const value =
      freePoints + priority.value - parsedValue >= 0
        ? parsedValue
        : freePoints + priority.value;
    updateOrganization.mutate({
      changes: {
        priorities: {
          [priority.type]: { value },
        },
      },
    });
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
