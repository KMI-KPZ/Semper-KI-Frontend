import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import { IProcessItem } from "..";

const useSyncCart = (
  hasChanged: boolean,
  items: IProcessItem[],
  setChangesFalse: () => void
): void => {
  const { updateCart } = useCart();
  useEffect(() => {
    if (hasChanged === true)
      updateCart.mutate(items, {
        onSuccess(data, variables, context) {
          setChangesFalse();
        },
      });
  }, [items, hasChanged]);
};

export default useSyncCart;
