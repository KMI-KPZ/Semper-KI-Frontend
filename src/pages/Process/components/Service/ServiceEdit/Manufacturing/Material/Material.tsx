import { useTranslation } from "react-i18next";
import { FilterItemProps } from "../Filter/Filter";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetMaterials, {
  MaterialProps,
} from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
  Modal,
  Text,
} from "@component-library/index";
import { ProcessMaterialCard } from "./components/Card";
import useSetMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useSetMaterial";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import useModal from "@/hooks/useModal";
import ServiceSearch from "../Search/Search";
import useSearch from "@/hooks/useSearch";

interface Props {}

interface State {
  modalOpen: boolean;
  material: MaterialProps | undefined;
}

export const ManufacturingMaterials: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const [state, setState] = useState<State>({
    modalOpen: false,
    material: undefined,
  });
  const [searchText, setSearchText] = useState<string>("");
  const { process } = useManufacturingProcess();
  const { project } = useProject();
  const { projectID, processID } = useParams();
  const { deleteModal } = useModal();
  const navigate = useNavigate();
  const materialsQuery = useGetMaterials();
  const setMaterial = useSetMaterial();
  const {} = useSearch();

  const [selectedMaterials, setSelectedMaterials] = useState<MaterialProps[]>(
    process.serviceDetails.materials || []
  );

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
  };

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

  const handleOnClickButtonSave = () => {
    setMaterial.mutate(
      {
        projectID: project.projectID,
        processID: process.processID,
        materials: selectedMaterials,
      },
      {
        onSuccess(data, variables, context) {
          deleteModal("ServiceRoutesManufacturingMaterials");
        },
      }
    );
  };

  const handleOnButtonClickSelect = (material: MaterialProps) => {
    setSelectedMaterials((prevState) => [...prevState, material]);
  };

  const handleOnButtonClickDeselect = (materialID: string) => {
    setSelectedMaterials((prevState) =>
      prevState.filter((material) => material.id !== materialID)
    );
  };

  const filterBySearch = (material: MaterialProps): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      material.title.toLocaleLowerCase().includes(searchText) ||
      material.propList.filter(
        (prop) =>
          prop.name.toLocaleLowerCase().includes(searchText) ||
          prop.value.toString().toLocaleLowerCase().includes(searchText)
      ).length > 0
    )
      return true;
    return false;
  };

  const isMaterialSelected = (material: MaterialProps): boolean => {
    return selectedMaterials.find((m) => m.id === material.id) !== undefined;
  };

  const sortSelectedMaterialsFirst = (a: MaterialProps, b: MaterialProps) => {
    if (isMaterialSelected(a)) {
      return -1;
    }
    if (isMaterialSelected(b)) {
      return 1;
    }
    return 0;
  };

  return (
    <Modal
      modalKey="ServiceRoutesManufacturingMaterials"
      open={true}
      closeModal={closeModal}
    >
      <Container
        width="none"
        direction="col"
        justify="start"
        className="h-full w-screen max-w-6xl gap-5 p-5 pt-14"
      >
        <ServiceSearch searchText={searchText} setSearchText={setSearchText} />
        <Container direction="col" width="full">
          <Container width="full" direction="col">
            <Container direction="row" width="full" justify="between">
              <Heading variant="h2">
                {t("Service.Manufacturing.Material.Material.available")}
              </Heading>
            </Container>
            <LoadingSuspense query={materialsQuery}>
              {materialsQuery.data !== undefined &&
              materialsQuery.data.length > 0 ? (
                <Container
                  width="full"
                  wrap="wrap"
                  direction="row"
                  align="start"
                >
                  {materialsQuery.data
                    .filter(filterBySearch)
                    .sort(sortSelectedMaterialsFirst)
                    .map((material: MaterialProps, index: number) => (
                      <ProcessMaterialCard
                        material={material}
                        key={index}
                        openMaterialView={openMaterialView}
                        selected={isMaterialSelected(material)}
                      >
                        <Container direction="row">
                          {isMaterialSelected(material) ? (
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleOnButtonClickDeselect(material.id)
                              }
                              title={t(
                                "Service.Manufacturing.Material.Material.button.deselect"
                              )}
                            />
                          ) : (
                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleOnButtonClickSelect(material)
                              }
                              title={t(
                                "Service.Manufacturing.Material.Material.button.select"
                              )}
                            />
                          )}
                        </Container>
                      </ProcessMaterialCard>
                    ))}
                </Container>
              ) : (
                <Text className="w-full text-center">
                  {t(
                    "Service.Manufacturing.Material.Material.error.noMaterials"
                  )}
                </Text>
              )}
            </LoadingSuspense>
          </Container>
        </Container>
        <Container
          width="fit"
          direction="col"
          className="fixed bottom-5 z-10 rounded-xl border-2 bg-white px-5 py-3 md:sticky md:right-10 md:mt-5"
        >
          <Button
            className=""
            variant="primary"
            width="fit"
            onClick={handleOnClickButtonSave}
            title={t("Service.Manufacturing.Material.Material.button.save")}
          />
        </Container>
      </Container>
    </Modal>
  );
};
