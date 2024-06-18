import { useTranslation } from "react-i18next";
import { FilterItemProps } from "../Filter/Filter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetMaterials, {
  MaterialProps,
} from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import { ProcessMaterialCard } from "./components/Card";
import useSetMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useSetMaterial";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";

interface Props {
  filters: FilterItemProps[];
  materials: MaterialProps[] | undefined;
  searchText: string;
}

interface State {
  modalOpen: boolean;
  material: MaterialProps | undefined;
}

export const ManufacturingMaterials: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filters, materials, searchText } = props;
  const [state, setState] = useState<State>({
    modalOpen: false,
    material: undefined,
  });
  const navigate = useNavigate();
  const { process } = useManufacturingProcess();
  const { project } = useProject();
  const materialsQuery = useGetMaterials(filters);
  const setMaterial = useSetMaterial();
  const deleteMaterial = useDeleteMaterial();
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

  const handleOnButtonClickSelect = (material: MaterialProps) => {
    setMaterial.mutate({
      projectID: project.projectID,
      processID: process.processID,
      material,
    });
  };
  const handleOnButtonClickDelete = (materialID: string) => {
    deleteMaterial.mutate({
      projectID: project.projectID,
      processID: process.processID,
      materialID,
    });
  };

  const filterSelectedMaterial = (material: MaterialProps) => {
    return (
      process.serviceDetails.materials?.find((m) => m.id === material.id) ===
      undefined
    );
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
                      >
                        <Container direction="row">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleOnButtonClickDelete(material.id)
                            }
                            title={t(
                              "Service.Manufacturing.Material.Material.button.delete"
                            )}
                          />
                        </Container>
                      </ProcessMaterialCard>
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
            <Container width="full" wrap="wrap" direction="row" align="start">
              {materialsQuery.data
                .filter(filterSelectedMaterial)
                .filter(filterBySearch)
                .map((material: MaterialProps, index: number) => (
                  <ProcessMaterialCard
                    material={material}
                    key={index}
                    openMaterialView={openMaterialView}
                  >
                    <Container direction="row">
                      <Button
                        variant="secondary"
                        onClick={() => handleOnButtonClickSelect(material)}
                        title={t(
                          "Service.Manufacturing.Material.Material.button.select"
                        )}
                      />
                    </Container>
                  </ProcessMaterialCard>
                ))}
            </Container>
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
