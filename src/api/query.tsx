import {
  QueriesResults,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { authorizedCustomAxios } from "./customAxios";
import logger from "@/hooks/useLogger";

export interface getQueryProps<T> {
  keys: string[];
  url: string;
  title: string;
  convertFn?: (data: any) => T;
  options?: UseQueryOptions<T, Error>;
}

export const getQuery = <T,>(
  props: getQueryProps<T>
): UseQueryResult<T, Error> => {
  const { keys, url, title, convertFn, options } = props;
  return useQuery<T, Error>({
    queryKey: keys,
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/${url}`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        logger(title, response.data);
        if (convertFn === undefined) {
          return response.data;
        } else {
          return convertFn(response.data);
        }
      });
    },
    ...options,
  });
};
