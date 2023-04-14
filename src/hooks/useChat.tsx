import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IChatMessage } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  uploadChatMessage: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IChatMessage,
    unknown
  >;
}

const useChat = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();

  const uploadChatMessage = useMutation<AxiosResponse, Error, IChatMessage>({
    mutationFn: async (chatMessage: IChatMessage) =>
      axiosCustom
        .post(
          `${process.env.REACT_APP_HTTP_API_URL}/public/uploadChatMessage/`,
          {
            chatMessage,
          }
        )
        .then((res) => {
          console.log(
            "useChat | uploadChatMessage ✅ |",
            res.data,
            chatMessage
          );
          return res;
        }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return { uploadChatMessage };
};

export default useChat;
