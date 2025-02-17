import useGetAllOrgaNodeNeighborsFromList from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighborsFromList";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useGetVerification, {
  CharacterisationItem,
  CharacterisationStatus,
} from "@/api/Resources/Organization/Querys/useGetVerification";

interface useCharacterisationReturnProps {
  items: CharacterisationItem[];
}

const useCharacterisation = (
  orgaID: string
): useCharacterisationReturnProps => {
  const verification = useGetVerification();
  const printersQuery = useGetOrgaNodeNeighbors({
    nodeID: orgaID,
    nodeType: "printer",
  });

  // Wait for printers to load
  const printers = printersQuery.data ?? [];

  // Fetch materials for each printer using useQueries
  const materialQueries = useGetAllOrgaNodeNeighborsFromList(printers);
  // Extract materials from queries
  let printerMaterials: { printer: OntoNode; material: OntoNode }[] = [];

  materialQueries.forEach((query, index) => {
    if (query.data) {
      const materials = query.data.filter(
        (node) => node.nodeType === "material"
      );
      materials.forEach((material) => {
        printerMaterials.push({
          printer: printers[index],
          material,
        });
      });
    }
  });

  // Map to CharacterisationItem format
  const rawItems: CharacterisationItem[] = printerMaterials.map((item) => ({
    printer: item.printer,
    material: item.material,
    status: CharacterisationStatus.UNVERIFIED,
  }));

  const items = rawItems.map((item) => {
    const verificationItem = verification.data?.find(
      (vItem) =>
        vItem.printerID === item.printer.nodeID &&
        vItem.materialID === item.material.nodeID
    );

    if (verificationItem) {
      return {
        ...item,
        status: verificationItem.status,
        details: verificationItem.details,
      };
    }

    return item;
  });

  return { items };
};

export default useCharacterisation;
