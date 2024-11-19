import React from "react";
import { Container } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { ContractorProps } from "@/api/Process/Querys/useGetContractors";
import { useTranslation } from "react-i18next";

interface ContractorCardProps {
  contractor: ContractorProps;
  selectContractor?: (contractorID: string) => void;
  process?: Process;
  selected?: boolean;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const { contractor, selected, selectContractor } = props;
  const { t } = useTranslation();

  return (
    <Container
      onClick={() => selectContractor && selectContractor(contractor.hashedID)}
      direction="row"
      width="full"
      justify="start"
      style={{
        backgroundColor: contractor.details.branding.colors.page_background,
        borderColor: contractor.details.branding.colors.primary,
      }}
      className={`
        ${
          selected === undefined
            ? "card"
            : selected
            ? `active-card`
            : `hover-card`
        }
        `}
    >
      <img className="h-20" src={contractor.details.branding.logo_url} />
      <Container direction="col" justify="center" align="center">
        <table className="w-full table-auto border-separate border-spacing-3">
          <tr>
            <th colSpan={2} className="text-center">
              {contractor.name}
            </th>
          </tr>
          <tr>
            <th>
              {t(
                "Process.components.ContractorSelection.components.ContractorCard.priceRange"
              )}
            </th>
            <td>
              {Math.round(contractor.price.pricePart[0] * 100) / 100}
              {" - "}
              {Math.round(contractor.price.pricePart[1] * 100) / 100}
              {" €"}
            </td>
          </tr>
        </table>
      </Container>
    </Container>
  );
};

export default ContractorCard;
