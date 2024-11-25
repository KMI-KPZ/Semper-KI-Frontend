import React from "react";
import { Container } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { ContractorProps } from "@/api/Process/Querys/useGetContractors";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ContractorCardProps {
  contractor: ContractorProps;
  selectContractor?: (contractorID: string) => void;
  process?: Process;
  selected?: boolean;
  className?: string;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const { contractor, selected, selectContractor, className = "" } = props;
  const { t } = useTranslation();

  return (
    <Container
      onClick={() => selectContractor && selectContractor(contractor.hashedID)}
      direction="row"
      width="full"
      justify="start"
      style={{
        backgroundColor: contractor.branding.colors.page_background,
        borderColor: contractor.branding.colors.primary,
      }}
      className={twMerge(
        `
        ${
          selected === undefined
            ? "card"
            : selected
            ? `active-card`
            : `hover-card`
        }
        `,
        className
      )}
    >
      <img className="h-20" src={contractor.branding.logo_url} />
      <Container direction="col" justify="center" align="center">
        <table className="w-full table-auto border-separate border-spacing-3">
          <tbody>
            <tr>
              <th colSpan={2} className="text-center">
                {contractor.name}
              </th>
            </tr>
            <tr>
              <th>{t("components.Process.ContractorCard.priceRange")}</th>
              <td>
                {Math.round(contractor.price.priceQuantity[0] * 100) / 100}
                {" - "}
                {Math.round(contractor.price.priceQuantity[1] * 100) / 100}
                {" €"}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default ContractorCard;
