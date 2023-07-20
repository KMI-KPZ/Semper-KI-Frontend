import { render } from "@test/render";
import Contact from "./Contact";

describe("<Contact>", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<Contact />);
    expect(getByTestId("contact")).toBeInTheDocument();
  });
  it("should have correct default Text", () => {
    const { getByText } = render(<Contact />);
    expect(getByText("Kontakt")).toBeInTheDocument();
    expect(getByText("Semper-KI:")).toBeInTheDocument();
    expect(getByText("Telefon: +49 341 229037 24")).toBeInTheDocument();
    expect(getByText("E-Mail: semper-ki@infai.org")).toBeInTheDocument();
    expect(getByText("KISS Projekt:")).toBeInTheDocument();
    expect(getByText("Förderkennzeichen: 01MK22001A-K")).toBeInTheDocument();
  });
});
