import useUser, { UserType } from "@/hooks/useUser";
import { Event } from "@/pages/App/types";
import {
  DefinedUseQueryResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { customAxios } from "../customAxios";
import logger from "@/hooks/useLogger";

interface useEventsQuerysReturnProps {
  missedEventsQuery: UseQueryResult<Event[], Error>;
}

const useEventsQuerys = (): useEventsQuerysReturnProps => {
  const { user } = useUser();

  const missedEventsQuery = useQuery<Event[], Error>({
    queryKey: ["missedEvents"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getMissedEvents/`)
        .then((res) => {
          logger("useMissedEvent | getMissedEvents ✅ |", res.data);
          return res.data;
        }),
    enabled: user.usertype !== UserType.ANONYM,
  });

  return { missedEventsQuery };
};

export default useEventsQuerys;
