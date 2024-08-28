import { render } from "@test/render";
import { Error } from "./Error";

describe("<Error>", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<Error />);
    expect(getByTestId("error")).toBeTruthy();
  });
  it("should render with default text", () => {
    const { getByTestId, getByText } = render(<Error />);

    expect(getByTestId("error")).toBeInTheDocument();
    expect(getByText("Error.text")).toBeInTheDocument();
    expect(getByText("Error.text2")).toBeInTheDocument();
  });
  it("should render with custom text", () => {
    const { getByTestId, getByText } = render(<Error text="test" />);

    expect(getByTestId("error")).toBeInTheDocument();
    expect(getByText("test")).toBeInTheDocument();
  });
  it.todo("should navigate to /(home) when button is clicked");
  //   , () => {
  //     const { getByTestId, getByText } = render(<Error />);
  //     const button = getByText("Error.button");
  //     fireEvent.click(button);
  //     expect(getByTestId("error")).toBeInTheDocument();
  //   });
});
