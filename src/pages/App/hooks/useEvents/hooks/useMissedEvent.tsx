import { Event } from "@/pages/App/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";

interface Props {
  isLoggedIn: boolean;
  onLoadMissedEvents(missedEvents: Event[]): void;
}

const useMissedEvent = (props: Props): void => {
  const { isLoggedIn, onLoadMissedEvents } = props;

  const { data, status, error } = useQuery<Event[], Error>({
    queryKey: ["missedEvents"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getMissedEvents/`)
        .then((res) => {
          logger("useMissedEvent | getMissedEvents ✅ |", res.data);
          return res.data;
        }),
    enabled: isLoggedIn === true,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  useEffect(() => {
    if (status === "success" && data.length > 0) onLoadMissedEvents(data);
  }, [status, data]);
};

export default useMissedEvent;
