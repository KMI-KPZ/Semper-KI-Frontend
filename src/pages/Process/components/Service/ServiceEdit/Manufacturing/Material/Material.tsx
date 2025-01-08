import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
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
  Search,
  Text,
} from "@component-library/index";
import { ProcessMaterialCard } from "./components/Card";
import useSetMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useSetMaterial";
import { useProject } from "@/hooks/Project/useProject";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import useModal from "@/hooks/useModal";
import useSearch from "@/hooks/useSearch";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface Props {}

// interface State {
//   modalOpen: boolean;
//   material: MaterialProps | undefined;
// }

export const ManufacturingMaterials: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<MaterialProps>();
  const { process } = useManufacturingProcess();
  const { project } = useProject();
  const { projectID, processID } = useParams();
  const { deleteModal } = useModal();
  const navigate = useNavigate();
  const materialsQuery = useGetMaterials();
  const setMaterial = useSetMaterial();
  const {} = useSearch();
  const { group, groupID } = useContext(ManufacturingGroupContext);

  const [selectedMaterial, setSelectedMaterial] = useState<
    MaterialProps | undefined
  >(group.material);

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
  };

  const openMaterialView = (material: MaterialProps) => {
    const {} = material;
    // setState((prevState) => ({ ...prevState, modalOpen: true, material }));
  };

  // const closeMaterialView = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     modalOpen: false,
  //     material: undefined,
  //   }));
  // };

  const handleOnClickButtonSave = () => {
    if (selectedMaterial !== undefined) {
      setMaterial.mutate(
        {
          groupID: groupID,
          projectID: project.projectID,
          processID: process.processID,
          material: selectedMaterial,
        },
        {
          onSuccess() {
            deleteModal("ServiceRoutesManufacturingMaterials");
          },
        }
      );
    }
  };

  const handleOnButtonClickSelect = (material: MaterialProps) => {
    setSelectedMaterial(material);
  };

  const handleOnButtonClickDeselect = () => {
    setSelectedMaterial(undefined);
  };

  const isMaterialSelected = (material: MaterialProps): boolean => {
    return selectedMaterial?.id === material.id;
  };

  // const sortSelectedMaterialsFirst = (a: MaterialProps, b: MaterialProps) => {
  //   if (isMaterialSelected(a)) {
  //     return -1;
  //   }
  //   if (isMaterialSelected(b)) {
  //     return 1;
  //   }
  //   return 0;
  // };

  return (
    <Modal
      modalKey="ServiceRoutesManufacturingMaterials"
      open={true}
      closeModal={closeModal}
      className="justify-start"
    >
      <Container
        width="none"
        direction="col"
        justify="start"
        className="h-full w-screen max-w-6xl gap-5 p-5 pt-14"
      >
        <Search handleSearchInputChange={handleSearchInputChange} />
        <Container direction="col" width="full">
          <Container width="full" direction="col">
            <Container direction="row" width="full" justify="between">
              <Heading variant="h2">
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Material.available"
                )}
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
                    .filter((material) => filterDataBySearchInput(material))
                    // .sort(sortSelectedMaterialsFirst)
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
                              onClick={() => handleOnButtonClickDeselect()}
                              title={t("general.button.deselect")}
                            />
                          ) : (
                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleOnButtonClickSelect(material)
                              }
                              title={t("general.button.select")}
                            />
                          )}
                        </Container>
                      </ProcessMaterialCard>
                    ))}
                </Container>
              ) : (
                <Text className="w-full text-center">
                  {t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Material.error.noMaterials"
                  )}
                </Text>
              )}
            </LoadingSuspense>
          </Container>
        </Container>
        <Button
          className="fixed bottom-5 z-10  w-fit self-center pr-5 md:sticky md:self-end"
          variant="primary"
          width="fit"
          onClick={handleOnClickButtonSave}
          title={t("general.button.save")}
        />
      </Container>
    </Modal>
  );
};
