import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAddressProps } from "@/hooks/useUser";

export interface UpdateUser {
  changes?: UpdateUserChanges;
  deletions?: UpdateUserDeletions;
}
export interface UpdateUserChanges {
  displayName?: string;
  address?: UserAddressProps[];
  locale?: string;
  notifications?: {
    newsletter?: {
      event?: boolean;
      email?: boolean;
    };
  };
}

export interface UpdateUserDeletions {
  address?: string[];
}

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUser = async (props: UpdateUser) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/profile/user/update/`, {
        ...props,
      })
      .then((response) => {
        logger("useUpdateUser | updateUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateUser | updateUser ❌ |", error);
      });

  return useMutation<string, Error, UpdateUser>({
    mutationFn: updateUser,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUpdateUser;
