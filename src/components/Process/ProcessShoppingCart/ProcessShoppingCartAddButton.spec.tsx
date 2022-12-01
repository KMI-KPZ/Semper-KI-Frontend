import { fireEvent, render, screen } from "@testing-library/react";
import { ShoppingCartAddButton } from "./ProcessShoppingCartAddButton";

const mockedAddShoppingCartItem = jest.fn();

describe(ShoppingCartAddButton, () => {
  it("should render", () => {
    render(
      <ShoppingCartAddButton addShoppingCartItem={mockedAddShoppingCartItem} />
    );
  });
  it("should call addShoppingCartItem when Button is clicked", () => {
    render(
      <ShoppingCartAddButton addShoppingCartItem={mockedAddShoppingCartItem} />
    );
    const button = screen.getByTestId("addButton");
    fireEvent.click(button);
    expect(mockedAddShoppingCartItem).toBeCalled;
  });
});
