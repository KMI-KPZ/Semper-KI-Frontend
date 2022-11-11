import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Process, ProcessState } from "../Interface";
import { ShoppingCart } from "../Process/ShoppingCart/ShoppingCart";

const mockedState: ProcessState = {
  activeProcess: 0,
  nextID: 2,
  progressState: 0,
  activeProcessList: [0, 1],
  processList: [{ processId: 0 }, { processId: 1 }],
};

const mockedDeleteProcess = jest.fn((index: number): void => {});
const mockedAddProcess = (process: Process): void => {};
const mockedSelectProcess = jest.fn((id: number): void => {});
const mockedSetProgressState = jest.fn(
  (progressStateIndex: number): void => {}
);
const mockedSetShoppingCardItemExpanded = jest.fn(
  (processId: number, expand: boolean): void => {}
);

jest.mock("react-router-dom", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useNavigate: jest.fn(),
  };
});

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

describe(ShoppingCart, () => {
  it("should render", () => {
    render(
      <ShoppingCart
        addProcess={mockedAddProcess}
        deleteProcess={mockedDeleteProcess}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        state={mockedState}
      />
    );
  });
  it("should have shoppingCardItems", () => {
    render(
      <ShoppingCart
        addProcess={mockedAddProcess}
        deleteProcess={mockedDeleteProcess}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        state={mockedState}
      />
    );
    const shoppingCardItems: never[] = screen.getAllByTestId("item");
    expect(shoppingCardItems).toHaveLength(2);
  });
  it("should have an addButton", () => {
    render(
      <ShoppingCart
        addProcess={mockedAddProcess}
        deleteProcess={mockedDeleteProcess}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        state={mockedState}
      />
    );
    const addButton = screen.findByTestId("addButton");
    expect(addButton).toBeInTheDocument;
  });
  it("should call deleteProcess when deleteButton is clicked", () => {
    render(
      <ShoppingCart
        addProcess={mockedAddProcess}
        deleteProcess={mockedDeleteProcess}
        selectProcess={mockedSelectProcess}
        setProgressState={mockedSetProgressState}
        setShoppingCardItemExpanded={mockedSetShoppingCardItemExpanded}
        state={mockedState}
      />
    );
    const deleteButton = screen.getAllByTestId("deleteButton");
    fireEvent.click(deleteButton[0]);
    expect(mockedDeleteProcess).toHaveBeenCalledWith(0);
  });
});
