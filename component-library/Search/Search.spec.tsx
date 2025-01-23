import { render, fireEvent } from "@test/render";
import { Search } from "./Search";

describe("Search", () => {
  it("should call handleSearchInputChange when input value changes", () => {
    const handleSearchInputChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Search handleSearchInputChange={handleSearchInputChange} />
    );
    const input = getByPlaceholderText("component-library.Search.placeholder");
    fireEvent.change(input, { target: { value: "example" } });
    expect(handleSearchInputChange).toHaveBeenCalledWith("example");
  });

  it("should prevent default when Enter key is pressed", () => {
    const handleSearchInputChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Search handleSearchInputChange={handleSearchInputChange} />
    );
    const input = getByPlaceholderText("component-library.Search.placeholder");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleSearchInputChange).not.toHaveBeenCalled();
  });
});
