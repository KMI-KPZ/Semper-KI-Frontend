import { useQuery } from "@tanstack/react-query";
import { IOrderCollectionEvent } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface Props {
  isLoggedIn: boolean;
}

interface ReturnProps {
  data: IOrderCollectionEvent[];
  status: "error" | "success" | "loading";
  error: Error | null;
}

const useMissedEvent = (props: Props): ReturnProps => {
  const { isLoggedIn } = props;
  const { axiosCustom } = useCustomAxios();

  const { data, status, error } = useQuery<IOrderCollectionEvent[], Error>({
    queryKey: ["missedEvents"],
    queryFn: async () =>
      axiosCustom
        .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getMissedEvents/`)
        .then((res) => {
          console.log("useMissedEvent | loadMissedEvents ✅ |", res.data);
          return res.data;
        }),
    enabled: isLoggedIn === true,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return { data, status, error };
};

export default useMissedEvent;
