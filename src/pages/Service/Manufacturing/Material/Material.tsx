import { useTranslation } from "react-i18next";
import { FilterItemProps } from "../Filter/Filter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetMaterials from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  Container,
  Heading,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import { ProcessMaterialCard } from "./components/Card";

interface Props {
  filters: FilterItemProps[];
  materials: MaterialProps[] | undefined;
  searchText: string;
}

interface State {
  modalOpen: boolean;
  material: MaterialProps | undefined;
}

export interface MaterialProps {
  id: string;
  title: string;
  propList: string[];
  URI: string;
}

export const ManufacturingMaterials: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filters, materials, searchText } = props;
  const [state, setState] = useState<State>({
    modalOpen: false,
    material: undefined,
  });
  const navigate = useNavigate();
  const materialsQuery = useGetMaterials(filters);
  const openMaterialView = (material: MaterialProps) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, material }));
  };
  const closeMaterialView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
      material: undefined,
    }));
  };
  const filterBySearch = (material: MaterialProps): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      material.title.toLocaleLowerCase().includes(searchText) ||
      material.propList.filter((prop) =>
        prop.toLocaleLowerCase().includes(searchText)
      ).length > 0
    )
      return true;
    return false;
  };

  const handleOnButtonClickEdit = (index: number) => {
    navigate(
      `edit/${
        materials !== undefined && materials.length > 0
          ? materials[index].id
          : ""
      }`
    );
  };

  const selectMaterial = () => {};
  const deselectMaterial = () => {};

  return (
    <Container direction="col" width="full">
      {materials !== undefined && materials.length > 0 ? (
        <Container direction="col" width="full">
          <Heading variant="h2" className="w-full text-left">
            {t("Service.Manufacturing.Material.Material.selected")}
          </Heading>
          <Container width="full" wrap="wrap">
            {materials.length > 0
              ? materials
                  .filter((material, index) => filterBySearch(material))
                  .map((material: MaterialProps, index: number) => {
                    return (
                      <ProcessMaterialCard
                        material={material}
                        key={index}
                        openMaterialView={openMaterialView}
                      />
                    );
                  })
              : null}
          </Container>
        </Container>
      ) : null}
      <Container width="full" direction="col">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.Material.Material.available")}
        </Heading>
        <LoadingSuspense query={materialsQuery}>
          {materialsQuery.data !== undefined &&
          materialsQuery.data.length > 0 ? (
            <>
              {materialsQuery.data
                .filter((material, index) => filterBySearch(material))
                .map((material: MaterialProps, index: number) => (
                  <ProcessMaterialCard
                    material={material}
                    key={index}
                    openMaterialView={openMaterialView}
                  />
                ))}
            </>
          ) : (
            <Text className="w-full text-center">
              {t("Service.Manufacturing.Material.Material.error.noMaterials")}
            </Text>
          )}
        </LoadingSuspense>
      </Container>
    </Container>
  );
};
