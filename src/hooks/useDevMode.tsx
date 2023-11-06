import { getCustomAxios } from "./useCustomAxios";
import logger from "./useLogger";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

interface useDevModeReturnProps {
  mockedLoginMutation: UseMutationResult<
    string,
    Error,
    MockedUserType,
    unknown
  >;
}

export type MockedUserType = "user" | "organisation" | "admin";

const useDevMode = (): useDevModeReturnProps => {
  const { search } = useLocation();
  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };

  const mockedLoginMutation = useMutation<string, Error, MockedUserType>({
    mutationFn: async (usertype) => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/private/mockLogin/`, {
          headers: {
            Usertype: usertype,
          },
        })
        .then((response) => {
          logger("useDevMode | mockedLoginMutation |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      window.location.href = `${data}${getReplacedSearchParam()}`;
    },
  });

  return { mockedLoginMutation };
};

export default useDevMode;
