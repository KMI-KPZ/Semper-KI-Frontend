import { render } from "@test/render";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import TextInput from "./TextInput";

const mockedRegister = jest.fn();

describe("TextInput", () => {
  it("renders the input field with the provided label", () => {
    render(<TextInput label="Username" register={mockedRegister} />);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeInTheDocument();
  });

  it("registers the input field with the provided label", () => {
    const registerMock = jest.fn();
    render(<TextInput label="Username" register={registerMock} />);
    expect(registerMock).toHaveBeenCalledWith("Username", expect.any(Object));
  });

  it("displays the error message when error prop is provided", () => {
    const error = { message: "Invalid input" };
    render(
      <TextInput label="Username" register={mockedRegister} error={error} />
    );
    const errorMessage = screen.getByText("Invalid input");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not display the error message when error prop is not provided", () => {
    render(<TextInput label="Username" register={mockedRegister} />);
    const errorMessage = screen.queryByText("Invalid input");
    expect(errorMessage).toBeNull();
  });

  it("does not apply the required attribute when required prop is false", () => {
    render(
      <TextInput label="Username" register={mockedRegister} required={false} />
    );
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).not.toHaveAttribute("required");
  });

  it("triggers the register function when input value changes", () => {
    const registerMock = jest.fn();
    render(<TextInput label="Username" register={registerMock} />);
    const inputElement = screen.getByLabelText("Username");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(registerMock).toHaveBeenCalledWith("Username", expect.any(Object));
  });
});
