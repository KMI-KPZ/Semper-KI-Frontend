import useEvents from "./useEvents/useEvents";
import { getProjectEventAmount } from "./useEvents/hooks/useProjectEvent";
import { getOrgaEventAmount } from "./useEvents/hooks/useOrgaEvent";

interface useBadgeReturnProps {
  calcBadge: (title: string) => number | undefined;
}

export const useBadge = (): useBadgeReturnProps => {
  const { events } = useEvents();

  const calcBadge = (title: string): number | undefined => {
    switch (title) {
      case "projects":
        // logger("useBadge | calcBadge | projects", events);
        return getProjectEventAmount(events);
      case "organization":
        return getOrgaEventAmount(events);
      default:
        return undefined;
    }
  };

  return { calcBadge };
};

export default useBadge;
