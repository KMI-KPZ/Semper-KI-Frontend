import React, { useMemo } from "react";
import { Container, Text } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { ContractorProps } from "@/api/Process/Querys/useGetContractors";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContractorMap from "./ContractorMap";

interface ContractorCardProps {
  contractor: ContractorProps;
  selectContractor?: (contractor: ContractorProps) => void;
  process?: Process;
  selected?: boolean;
  className?: string;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const {
    contractor,
    selected,
    process,
    selectContractor,
    className = "",
  } = props;
  const { t } = useTranslation();

  const contractorCoordinates: [number, number] =
    contractor.contractorCoordinates !== undefined
      ? contractor.contractorCoordinates
      : [0, 0];
  const clientCoordinates: [number, number] =
    process !== undefined &&
    process.processDetails.clientBillingAddress !== undefined &&
    process.processDetails.clientBillingAddress.coordinates !== undefined &&
    process.processDetails.clientBillingAddress.coordinates.length === 2
      ? process.processDetails.clientBillingAddress.coordinates
      : [0, 0];

  const usePriceSums = (
    prices: [number, number][]
  ): { minSum: number; maxSum: number } =>
    useMemo(() => {
      let minSum = 0;
      let maxSum = 0;

      prices.forEach((price) => {
        minSum += price[0];
        maxSum += price[1];
      });

      return { minSum, maxSum };
    }, [prices]);

  return (
    <Container
      onClick={() => selectContractor && selectContractor(contractor)}
      direction="row"
      width="full"
      justify="start"
      style={{
        backgroundColor: contractor.branding.colors.page_background,
        borderColor: contractor.branding.colors.primary,
      }}
      className={twMerge(
        `
        relative
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
      {selected ? (
        <div className="absolute bottom-2 right-2 z-[2000000] h-fit w-fit rounded-full ">
          <CheckCircleOutlineIcon
            style={{
              color: "green",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
        </div>
      ) : null}
      <img
        className="h-20 w-1/3 object-contain"
        src={contractor.branding.logo_url}
      />
      <Container
        direction="col"
        justify="center"
        align="center"
        className="w-2/3"
      >
        <table className="w-full table-auto border-separate border-spacing-3">
          <tbody>
            <tr>
              <th colSpan={3} className="whitespace-nowrap">
                {contractor.name}
              </th>
            </tr>
            <tr>
              <th className="whitespace-nowrap  text-left">
                {t("components.Process.ContractorCard.priceRange")}
              </th>
              <th className="whitespace-nowrap">{t("general.min")}</th>
              <th className="whitespace-nowrap">{t("general.max")}</th>
            </tr>
            {contractor.prices.groupCosts.map((group, groupID) => (
              <tr key={groupID}>
                <th className="whitespace-nowrap  text-left">{`${t(
                  "general.group"
                )} ${groupID + 1}`}</th>
                <td className="whitespace-nowrap text-right">
                  {Math.round(group[0] * 100) / 100}
                  {" €"}
                </td>
                <td className="whitespace-nowrap text-right">
                  {Math.round(group[1] * 100) / 100}
                  {" €"}
                </td>
              </tr>
            ))}
            <tr>
              <th className="whitespace-nowrap text-left">
                {t("general.total")}
              </th>
              <td className="whitespace-nowrap text-right">
                {Math.round(
                  usePriceSums(contractor.prices.groupCosts).minSum * 100
                ) / 100}
                {" €"}
              </td>
              <td className="whitespace-nowrap text-right">
                {Math.round(
                  usePriceSums(contractor.prices.groupCosts).maxSum * 100
                ) / 100}
                {" €"}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
      {process !== undefined ? (
        <Container direction="col">
          <Text>
            {t("components.Process.ContractorCard.distance", {
              distance: contractor.distance,
            })}
          </Text>
          {clientCoordinates[0] !== 0 &&
          clientCoordinates[1] !== 0 &&
          contractorCoordinates[0] !== 0 &&
          contractorCoordinates[1] !== 0 ? (
            <ContractorMap
              clientCoordinates={clientCoordinates}
              contractorCoordinates={contractorCoordinates}
            />
          ) : null}
        </Container>
      ) : null}
    </Container>
  );
};

export default ContractorCard;
