import React, { useEffect, useState } from "react";
import useCustomAxios from "./useCustomAxios";

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
  const { axiosCustom } = useCustomAxios();

  const loadStatistics = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/getStatistics/`)
      .then((response) => {
        console.log(
          "useStatistics| loadStatistics Successful",
          JSON.stringify(response.data)
        );
        setStatistics(response.data);
      })
      .catch((error) => {
        console.log("useStatistics| loadStatistics Error", error);
      });
  };

  // useEffect(() => {
  //   loadStatistics();
  // }, []);

  return { statistics };
};

export default useStatistics;
