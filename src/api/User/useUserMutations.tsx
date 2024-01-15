import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import logger from "@/hooks/useLogger";
import { UpdateUserProps, UserDetailsProps } from "@/hooks/useUser";

interface useUserMutationsReturnProps {
  deleteUserMutation: UseMutationResult<void, Error, void, unknown>;
  updateUserDetailsMutation: UseMutationResult<
    void,
    Error,
    UpdateUserProps,
    unknown
  >;
}

const useUserMutations = (): useUserMutationsReturnProps => {
  const navigate = useNavigate();

  const deleteUserMutation = useMutation<void, Error, void>({
    mutationFn: async () =>
      customAxios
        .delete(`${process.env.VITE_HTTP_API_URL}/public/profileDeleteUser/`)
        .then((response) => {
          logger("useUser | profileDeleteUser ✅ |");
          navigate("/logout");
        })
        .catch((error) => {
          logger("useUser | deleteUser ❌ |", error);
        }),
  });

  const updateUserDetailsMutation = useMutation<void, Error, UpdateUserProps>({
    mutationFn: async (details) =>
      customAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/updateUserDetails/`, {
          details,
        })
        .then((response) => {
          logger("useUser | updateUser ✅ |", response);
          return response.data;
        })
        .catch((error) => {
          logger("useUser | updateUser ❌ |", error);
        }),
  });

  return {
    deleteUserMutation,
    updateUserDetailsMutation,
  };
};

export default useUserMutations;
