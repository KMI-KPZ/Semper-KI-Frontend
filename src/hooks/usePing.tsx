import usePingQuerys from "@/api/Ping/usePingQuerys";

interface ReturnProps {
  isMagazineUp(): boolean;
}

const usePing = (): ReturnProps => {
  const { pingQuery } = usePingQuerys();

  const isMagazineUp = (): boolean => {
    return (
      pingQuery.isFetched &&
      pingQuery.data !== undefined &&
      pingQuery.data === true
    );
  };

  return { isMagazineUp };
};

export default usePing;
