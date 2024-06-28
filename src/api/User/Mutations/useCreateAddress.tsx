import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface NewUserAddressProps {
  standard: boolean;
  country: string;
  city: string;
  zipcode: string;
  houseNumber: number;
  street: string;
  company?: string;
  lastName: string;
  firstName: string;
}

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const createAddress = async (address: NewUserAddressProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/createAddress/`, {
        ...address,
      })
      .then((response) => {
        logger("useCreateAddress | createAddress ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateAddress | createAddress ❌ |", error);
      });

  return useMutation<void, Error, NewUserAddressProps>({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useCreateAddress;
