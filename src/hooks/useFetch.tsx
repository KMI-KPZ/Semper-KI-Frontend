import { useEffect, useState } from "react";
import axios from "axios";
import logger from "@/hooks/useLogger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props<T> {
  url: string;
}

interface ReturnProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export const useFetch = <T extends unknown>({ url }: Props<T>): ReturnProps => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        logger("Fetch Hook Loaded Data", response.data.length, url);
        setData(response.data);
      })
      .catch((error) => {
        logger("Fetch Hook Error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, error };
};
