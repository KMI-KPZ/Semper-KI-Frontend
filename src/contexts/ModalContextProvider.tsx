import React, { PropsWithChildren, RefObject, useState } from "react";

interface ModalContextProviderProps {}

export interface ModalItem {
  title: string;
  ref: RefObject<HTMLDialogElement>;
}

export type ModalContext = {
  modals: ModalItem[];
  setModals: React.Dispatch<React.SetStateAction<ModalItem[]>>;
};

export const ModalContext = React.createContext<ModalContext>({
  modals: [],
  setModals: () => {},
});

const ModalContextProvider: React.FC<
  PropsWithChildren<ModalContextProviderProps>
> = (props) => {
  const { children } = props;
  const [modals, setModals] = useState<ModalItem[]>([]);

  console.log("ModalContext: ");
  console.log(props);
    // get all headings in this container
    // const headings = document.querySelectorAll(`#${id} h1, #${id} h2, #${id} h3, #${id} h4, #${id} h5, #${id} h6`);
    // headings.forEach((heading) => {
    //   console.log(heading.textContent);
    // });
  // }

  return (
    <ModalContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
