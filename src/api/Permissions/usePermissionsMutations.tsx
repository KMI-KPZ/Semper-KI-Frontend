import { Permission } from "@/hooks/usePermissions";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";

interface usePermissionsMutationsReturnProps {
  reloadPermissionsMutation: UseMutationResult<
    Permission[],
    Error,
    void,
    unknown
  >;
}

const usePermissionsMutations = (): usePermissionsMutationsReturnProps => {
  const queryClient = useQueryClient();

  const reloadPermissionsMutation = useMutation<Permission[], Error, void>({
    mutationFn: async () =>
      authorizedCustomAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getNewPermissions/`)
        .then((res) => {
          logger("usePermissions | relodePermissions ✅"); // |", res.data);
          return res.data;
        }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["permissions"]);
    },
  });

  return { reloadPermissionsMutation };
};

export default usePermissionsMutations;
