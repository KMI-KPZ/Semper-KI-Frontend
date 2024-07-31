import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading, Text } from "@component-library/index";
import { OrganizationPriority } from "@/api/Organization/Querys/useGetOrganization";
import PrioritiesFormItem from "./PrioritiesFormItem";
import logger from "@/hooks/useLogger";

interface PrioritiesFormProps {
  priorities: OrganizationPriority[] | undefined;
}

const PrioritiesForm: React.FC<PrioritiesFormProps> = (props) => {
  const { priorities = [] } = props;
  const { t } = useTranslation();

  const usedPoints = priorities.reduce(
    (acc, priority) => acc + priority.value,
    0
  );
  const maxPoints = priorities.length * 4;
  const freePoints = maxPoints - usedPoints;

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">
        {t("components.Form.PrioritiesForm.header")}
      </Heading>
      <Divider />
      <Container className="overflow-auto" justify="start" direction="row">
        <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-3  ">
          <thead>
            <tr>
              <th rowSpan={3} className="text-left align-text-top">
                {t("components.Form.PrioritiesForm.type")}
              </th>
              <th colSpan={7} className="text-center">
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
            {priorities.map((priority: OrganizationPriority, index) => (
              <PrioritiesFormItem
                priority={priority}
                key={index}
                freePoints={freePoints}
              />
            ))}
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default PrioritiesForm;
