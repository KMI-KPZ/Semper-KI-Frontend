import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";

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

const useGetCoypuData = () => {
  const queryClient = useQueryClient();
  const getCoypuData = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/coypu/`)
      .then((response) => {
        const responseData = response.data;
        const data: CoypuProps[] = response.data
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

        logger("useGetCoypuData | getCoypuData ✅ |", response);
        return data;
      });

  return useQuery<CoypuProps[], Error>({
    queryKey: ["coypu"],
    queryFn: getCoypuData,
    staleTime: 1000 * 60 * 1, // 24 hours
  });
};

export default useGetCoypuData;
