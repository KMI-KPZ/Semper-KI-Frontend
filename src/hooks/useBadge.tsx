import useEvents from "./useEvents/useEvents";

interface useBadgeReturnProps {
  calcBadge: (title: string) => number | undefined;
}

export const useBadge = (): useBadgeReturnProps => {
  const { totalOrgaEventCount, totalProjectEventCount } = useEvents();

  const calcBadge = (title: string): number | undefined => {
    switch (title) {
      case "projects":
        return totalProjectEventCount;
      case "organization":
        return totalOrgaEventCount;
      default:
        return undefined;
    }
  };

  return { calcBadge };
};

export default useBadge;
