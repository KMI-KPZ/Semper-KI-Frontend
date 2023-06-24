import { useState } from "react";
import customAxios from "./useCustomAxios";
import logger from "@/hooks/useLogger";
export interface IStatistics {
  active: number;
  loggedIn: number;
}

interface ReturnProps {
  statistics: IStatistics;
}

const useStatistics = (): ReturnProps => {
  const [statistics, setStatistics] = useState<IStatistics>({
    active: 0,
    loggedIn: 0,
  });

  // const loadStatistics = () => {
  //   customAxios
  //     .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getStatistics/`)
  //     .then((response) => {
  //       logger(
  //         "useStatistics| loadStatistics Success",
  //         JSON.stringify(response.data)
  //       );
  //       setStatistics(response.data);
  //     })
  //     .catch((error) => {
  //       logger("useStatistics| loadStatistics Error", error);
  //     });
  // };

  // useEffect(() => {
  //   loadStatistics();
  // }, []);

  return { statistics };
};

export default useStatistics;
