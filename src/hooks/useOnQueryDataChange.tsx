import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

const useOnQueryDataChange = <T,>(
  query: UseQueryResult<T, Error>,
  condition: boolean,
  onChange: (data: T) => void
): void => {
  useEffect(() => {
    if (query.data !== undefined && condition) {
      onChange(query.data);
    }
  }, [query.data, condition, onChange]);
};

export default useOnQueryDataChange;
