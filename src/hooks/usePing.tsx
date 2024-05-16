import useIsMagazinUp from "@/api/Ping/Querys/useIsMagazinUp";

interface ReturnProps {
  isMagazineUp(): boolean;
}

const usePing = (): ReturnProps => {
  const isMagazinUp = useIsMagazinUp();

  const isMagazineUp = (): boolean => {
    return (
      isMagazinUp.isFetched &&
      isMagazinUp.data !== undefined &&
      isMagazinUp.data === true
    );
  };

  return { isMagazineUp };
};

export default usePing;
