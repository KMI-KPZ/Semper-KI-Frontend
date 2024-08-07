import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface TestDynamicProps {
  title: string;
  icon: string;
  action: string;
  payload: { number: number };
}

const useGetDynamicTestButtons = () => {
  const queryClient = useQueryClient();
  const getDynamicTestButtons = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/dynamic/`)
      .then((response) => {
        const data: TestDynamicProps[] = response.data.Buttons;

        logger(
          "useGetDynamicTestButtons | getDynamicTestButtons ✅ |",
          response
        );
        return data;
      });

  return useQuery<TestDynamicProps[], Error>({
    queryKey: ["testDynamicQuery"],
    queryFn: getDynamicTestButtons,
    enabled: false,
  });
};

export default useGetDynamicTestButtons;
