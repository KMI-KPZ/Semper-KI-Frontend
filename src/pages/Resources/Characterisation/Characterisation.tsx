import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Divider,
  Heading,
  Search,
  Text,
} from "@component-library/index";
import Table from "@/components/Table/Table";
import TableContainer from "@/components/Table/TableContainer";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import useOrganization from "@/hooks/useOrganization";
import CharacterisationRow from "./CharacterisationRow";
import useCharacterisation from "./useCharacterisation";
import { CharacterisationItem } from "@/api/Resources/Organization/Querys/useGetVerification";

interface ResourcesCharacterisationProps {}

const ResourcesCharacterisation: React.FC<ResourcesCharacterisationProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<CharacterisationItem>();
  const {
    getSortIcon,
    handleSort,
    getNestedSortIcon,
    handleNestedSort,
    sortItems,
  } = useSort<CharacterisationItem>();
  const { organization } = useOrganization();
  const { items } = useCharacterisation(organization.hashedID);

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Characterisation.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" className="rounded-md border-2 p-3">
        <Text className="text-center">
          {t(`Resources.Characterisation.describtion`)}
        </Text>
      </Container>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleNestedSort}
                getSortIcon={getNestedSortIcon}
                title={t("Resources.Characterisation.printer")}
                objectKey="printer.name"
              />
              <TableHeaderButton
                handleSort={handleNestedSort}
                getSortIcon={getNestedSortIcon}
                title={t("Resources.Characterisation.material")}
                objectKey="material.name"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Resources.Characterisation.verified")}
                objectKey="status"
              />
              <th>{t("Resources.Characterisation.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {items.filter((item: CharacterisationItem) =>
              filterDataBySearchInput(item)
            ).length > 0 ? (
              items
                .filter((item: CharacterisationItem) =>
                  filterDataBySearchInput(item)
                )
                .sort(sortItems)
                .map((item: CharacterisationItem, index: number) => {
                  return <CharacterisationRow index={index} item={item} />;
                })
            ) : (
              <tr>
                <td className="text-center" colSpan={4}>
                  {t(
                    `Resources.Costing.${
                      items.length >
                      items.filter((costingItem: CharacterisationItem) =>
                        filterDataBySearchInput(costingItem)
                      ).length
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

export default ResourcesCharacterisation;
