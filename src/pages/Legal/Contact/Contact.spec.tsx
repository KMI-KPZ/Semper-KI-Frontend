import { render } from "@test/render";
import Contact from "./Contact";

describe("<Contact>", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<Contact />);
    expect(getByTestId("contact")).toBeInTheDocument();
  });
  it("should have correct default Text", () => {
    const { getByText } = render(<Contact />);
    expect(getByText("Legal.Contact.heading.main")).toBeInTheDocument();
    expect(getByText("Legal.Contact.heading.semper")).toBeInTheDocument();
    expect(getByText("Legal.Contact.heading.infai")).toBeInTheDocument();
    expect(getByText("Legal.Contact.heading.kmi")).toBeInTheDocument();
  });
});
