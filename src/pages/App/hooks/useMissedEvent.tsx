import { Event } from "@/hooks/useUser/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useCustomAxios from "../../../hooks/useCustomAxios";

interface Props {
  isLoggedIn: boolean;
  onLoadMissedEvents(missedEvents: Event[]): void;
}

const useMissedEvent = (props: Props): void => {
  const { isLoggedIn, onLoadMissedEvents } = props;
  const { axiosCustom } = useCustomAxios();
  const { data, status, error } = useQuery<Event[], Error>({
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

  useEffect(() => {
    if (status === "success" && data.length > 0) onLoadMissedEvents(data);
  }, [status, data]);
};

export default useMissedEvent;
