import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Search } from "@component-library/index";
import Table from "@/components/Table/Table";
import TableContainer from "@/components/Table/TableContainer";
import { OrganizationServiceCostingItem } from "@/api/Organization/Querys/useGetOrganization";
import useSort from "@/hooks/useSort";
import useSearch from "@/hooks/useSearch";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useOrganization from "@/hooks/useOrganization";

interface CostingTableProps {
  serviceType: keyof typeof ServiceType;
}

const CostingTable: React.FC<CostingTableProps> = (props) => {
  const { serviceType } = props;
  const { t } = useTranslation();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OrganizationServiceCostingItem>();
  const { getSortIcon, handleSort, sortItems } =
    useSort<OrganizationServiceCostingItem>();
  const { organization } = useOrganization();

  const costItems =
    organization.details.services !== undefined
      ? organization.details.services[serviceType]
      : [];
  const filteredCostItems =
    costItems !== undefined
      ? costItems
      : []
          .filter((costingItem: OrganizationServiceCostingItem) =>
            filterDataBySearchInput(costingItem)
          )
          .sort(sortItems);

  return (
    <Container width="full" direction="col">
      <Container width="full" direction="row" justify="between">
        <Heading variant="h3">{t(`enum.ServiceType.${serviceType}`)}</Heading>
        <Button
          title={t("general.button.edit")}
          to={serviceType}
          width="fit"
          variant="secondary"
          size="sm"
        />
      </Container>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Resources.Costing.name")}
                objectKey="name"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Resources.Costing.value")}
                objectKey="value"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Resources.Costing.unit")}
                objectKey="unit"
              />
            </tr>
          </thead>
          <tbody>
            {filteredCostItems.length > 0 ? (
              filteredCostItems.map(
                (service: OrganizationServiceCostingItem, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{service.name}</td>
                      <td className="text-center">{service.value}</td>
                      <td className="text-center">{service.unit}</td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td className="text-center" colSpan={3}>
                  {t(
                    `Resources.Costing.${
                      costItems !== undefined &&
                      costItems.length > filteredCostItems.length
                        ? "noItemsWithFilter"
                        : "noItems"
                    }`
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CostingTable;
