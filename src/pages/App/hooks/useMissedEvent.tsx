import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../hooks/useCustomAxios";
import { OrderCollectionEvent } from "../../../hooks/useUser/types";

interface Props {
  isLoggedIn: boolean;
}

interface ReturnProps {
  initialMissedEvents: OrderCollectionEvent[];
  status: "error" | "success" | "loading";
  error: Error | null;
}

const useMissedEvent = (props: Props): ReturnProps => {
  const { isLoggedIn } = props;
  const { axiosCustom } = useCustomAxios();

  const { data, status, error } = useQuery<OrderCollectionEvent[], Error>({
    queryKey: ["missedEvents"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getMissedEvents/`)
        .then((res) => {
          console.log("useMissedEvent | getMissedEvents ✅ |", res.data);
          return res.data;
        }),
    enabled: isLoggedIn === true,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return { initialMissedEvents: data, status, error };
};

export default useMissedEvent;
