import { fireEvent, render, screen } from "@testing-library/react";
import { Process } from "../../../interface/Interface";
import { ShoppingCartItem } from "./ShoppingCartItem";

const mockedT = jest.fn();
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: mockedT, //(str: string): string => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const mockedFile = new File([], "test.stl");
const mockedDeleteShoppingCartItem = jest.fn((index: number): void => {});
const mockedSelectProcess = jest.fn((id: number): void => {});
const mockedSetProgressState = jest.fn(
  (progressStateIndex: number): void => {}
);
const mockedSetShoppingCardItemExpanded = jest.fn(
  (processId: number, expand: boolean): void => {}
);
const mockedProcess: Process = {
  processId: 0,
  model: {
    file: mockedFile,
  },
};

describe(ShoppingCartItem, () => {
  it("should render", () => {
    render(
      <ShoppingCartItem
        expanded={true}
        deleteShoppingCartItem={mockedDeleteShoppingCartItem}
        process={{ processId: 0 }}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        isActiveProcess={true}
      />
    );
  });
  it("should minimize maximized item when minimizeButton is click", () => {
    render(
      <ShoppingCartItem
        expanded={true}
        deleteShoppingCartItem={mockedDeleteShoppingCartItem}
        process={{
          processId: 0,
          model: {
            file: mockedFile,
          },
        }}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        isActiveProcess={true}
      />
    );
    expect(screen.findByTestId("minimizeText")).not.toBeInTheDocument;
    const minimizeButton = screen.getByTestId("minimizeButton");
    fireEvent.click(minimizeButton);
    expect(screen.findByTestId("minimizeText")).toBeInTheDocument;
    expect(mockedSetShoppingCardItemExpanded).toHaveBeenCalledWith(0, false);
  });
  it("should maximize minimized item when maximizeButton is click", () => {
    render(
      <ShoppingCartItem
        expanded={false}
        deleteShoppingCartItem={mockedDeleteShoppingCartItem}
        process={{
          processId: 0,
          model: {
            file: mockedFile,
          },
        }}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        isActiveProcess={true}
      />
    );
    expect(screen.findByTestId("minimizeText")).toBeInTheDocument;
    const maximizeButton = screen.getByTestId("maximizeButton");
    fireEvent.click(maximizeButton);
    expect(screen.findByTestId("minimizeText")).not.toBeInTheDocument;
    expect(mockedSetShoppingCardItemExpanded).toHaveBeenCalledWith(0, true);
  });
  it("should delete item when deleteButton is click", () => {
    render(
      <ShoppingCartItem
        expanded={false}
        deleteShoppingCartItem={mockedDeleteShoppingCartItem}
        process={{
          processId: 1,
        }}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        isActiveProcess={true}
      />
    );
    const deleteButton = screen.getByTestId("deleteButton");
    fireEvent.click(deleteButton);
    expect(mockedDeleteShoppingCartItem).toHaveBeenCalledWith(1);
  });
  describe("test click on prop", () => {
    beforeEach(() => {
      render(
        <ShoppingCartItem
          expanded={true}
          deleteShoppingCartItem={mockedDeleteShoppingCartItem}
          process={{
            processId: 1,
            model: {
              file: mockedFile,
            },
            material: {
              name: "testMaterial",
            },
            manufacturer: {
              name: "testManufacturer",
            },
            postProcessing: {
              specificationList: [{ name: "spec1" }],
            },
            additive: { file: "mockedFile.txt", text: "additiveText" },
          }}
          selectProcess={mockedSelectProcess}
          setProgressState={mockedSetProgressState}
          setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
          isActiveProcess={true}
        />
      );
    });
    it("should call SelectProcess with processId 1 and setProgressState to propId when prop is clicked", () => {
      const props: never[] = screen.getAllByTestId("prop");
      props.forEach((prop: never, index: number) => {
        fireEvent.click(prop);
        expect(mockedSetProgressState).toHaveBeenCalledWith(index);
      });
      expect(mockedSetProgressState).toHaveBeenCalledTimes(5);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(5);
    });
    it("should call SelectProcess with processId 1 and setProgressState to 0 when Model is clicked", () => {
      const id = 0;
      const props: never[] = screen.getAllByTestId("prop");
      fireEvent.click(props[id]);
      expect(mockedSetProgressState).toHaveBeenCalledWith(id);
      expect(mockedSetProgressState).toHaveBeenCalledTimes(1);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(1);
    });
    it("should call SelectProcess with processId 1 and setProgressState to 1 when Material is clicked", () => {
      const id = 1;
      const props: never[] = screen.getAllByTestId("prop");
      fireEvent.click(props[id]);
      expect(mockedSetProgressState).toHaveBeenCalledWith(id);
      expect(mockedSetProgressState).toHaveBeenCalledTimes(1);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(1);
    });
    it("should call SelectProcess with processId 1 and setProgressState to 2 when Manufacturer is clicked", () => {
      const id = 2;
      const props: never[] = screen.getAllByTestId("prop");
      fireEvent.click(props[id]);
      expect(mockedSetProgressState).toHaveBeenCalledWith(id);
      expect(mockedSetProgressState).toHaveBeenCalledTimes(1);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(1);
    });
    it("should call SelectProcess with processId 1 and setProgressState to 3 when PostProcessing is clicked", () => {
      const id = 3;
      const props: never[] = screen.getAllByTestId("prop");
      fireEvent.click(props[id]);
      expect(mockedSetProgressState).toHaveBeenCalledWith(id);
      expect(mockedSetProgressState).toHaveBeenCalledTimes(1);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(1);
    });
    it("should call SelectProcess with processId 1 and setProgressState to 4 when Additive is clicked", () => {
      const id = 4;
      const props: never[] = screen.getAllByTestId("prop");
      fireEvent.click(props[id]);
      expect(mockedSetProgressState).toHaveBeenCalledWith(id);
      expect(mockedSetProgressState).toHaveBeenCalledTimes(1);
      expect(mockedSelectProcess).toHaveBeenCalledWith(1);
      expect(mockedSelectProcess).toHaveBeenCalledTimes(1);
    });
  });
  it("should call selectProcess when Process is clicked", () => {
    render(
      <ShoppingCartItem
        expanded={false}
        deleteShoppingCartItem={mockedDeleteShoppingCartItem}
        process={{ processId: 0 }}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        isActiveProcess={false}
      />
    );
    const process = screen.getByTestId("item");
    fireEvent.click(process);
    expect(mockedSelectProcess).toHaveBeenCalledWith(0);
  });
});
