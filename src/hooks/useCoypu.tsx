import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import DOMPurify from "dompurify";
import { AssignmentReturned } from "@mui/icons-material";

interface ReturnProps {
  coypuQuery: UseQueryResult<CoypuProps[], Error>;
}

export interface CoypuProps {
  evt: string;
  rawhtml: string;
  date: Date;
  url: string;
}

const convertHTML = (_html: string): string => {
  let html = _html;
  const regex = /<.*?>|<\/.*?>/g;
  html = html.replace(regex, "");

  // logger("convertHTML |", html);
  return html;
};

const useCoypu = (): ReturnProps => {
  const coypuQuery = useQuery<CoypuProps[], Error>({
    queryKey: ["coypu"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/coypu/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
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

export default useCoypu;
