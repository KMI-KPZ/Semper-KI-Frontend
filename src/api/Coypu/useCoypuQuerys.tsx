import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";

interface useCoypuQuerysReturnProps {
  coypuQuery: UseQueryResult<CoypuProps[], Error>;
}

const convertHTML = (_html: string): string => {
  let html = _html;
  const regex = /<.*?>|<\/.*?>/g;
  html = html.replace(regex, "");

  // logger("convertHTML |", html);
  return html;
};

export interface CoypuProps {
  evt: string;
  rawhtml: string;
  date: Date;
  url: string;
}

const useCoypuQuerys = (): useCoypuQuerysReturnProps => {
  const coypuQuery = useQuery<CoypuProps[], Error>({
    queryKey: ["coypu"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/coypu/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useCoypu | ✅ |", response.data);
        const coypu = response.data
          .filter((data: any) => data.rawhtml.url !== "")
          .map((data: any) => ({
            ...data,
            rawhtml: convertHTML(DOMPurify.sanitize(data.rawhtml.value)),
            date: new Date(data.date.value),
            evt: data.evt.value,
            url: data.rawhtml.url,
          }))
          .sort((a: CoypuProps, b: CoypuProps) => {
            if (a.date > b.date) {
              return -1;
            }
            if (a.date < b.date) {
              return 1;
            }
            return 0;
          });
        return coypu;
      });
    },
    staleTime: 1000 * 60 * 1, // 24 hours
  });

  return { coypuQuery };
};

export default useCoypuQuerys;
