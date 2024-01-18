import { render } from "@test/render";
import { Heading, Text } from "./Typography";

describe("Heading", () => {
  it("renders h1 correctly", () => {
    const { getByText } = render(<Heading variant="h1">Heading 1</Heading>);
    expect(getByText("Heading 1")).toBeInTheDocument();
    expect(getByText("Heading 1").tagName).toBe("H1");
  });

  it("renders h2 correctly", () => {
    const { getByText } = render(<Heading variant="h2">Heading 2</Heading>);
    expect(getByText("Heading 2")).toBeInTheDocument();
    expect(getByText("Heading 2").tagName).toBe("H2");
  });

  it("renders h3 correctly", () => {
    const { getByText } = render(<Heading variant="h3">Heading 3</Heading>);
    expect(getByText("Heading 3")).toBeInTheDocument();
    expect(getByText("Heading 3").tagName).toBe("H3");
  });

  it("renders h4 correctly", () => {
    const { getByText } = render(<Heading variant="h4">Heading 4</Heading>);
    expect(getByText("Heading 4")).toBeInTheDocument();
    expect(getByText("Heading 4").tagName).toBe("H4");
  });

  it("renders subtitle correctly", () => {
    const { getByText } = render(
      <Heading variant="subtitle">Subtitle</Heading>
    );
    expect(getByText("Subtitle")).toBeInTheDocument();
    expect(getByText("Subtitle").tagName).toBe("H4");
  });
});

describe("Text", () => {
  it("renders body text correctly", () => {
    const { getByText } = render(<Text>Body Text</Text>);
    expect(getByText("Body Text")).toBeInTheDocument();
    expect(getByText("Body Text").tagName).toBe("SPAN");
  });

  it("renders error text correctly", () => {
    const { getByText } = render(<Text variant="error">Error Text</Text>);
    expect(getByText("Error Text")).toBeInTheDocument();
    expect(getByText("Error Text").tagName).toBe("SPAN");
  });

  it("renders strong text correctly", () => {
    const { getByText } = render(<Text variant="strong">Strong Text</Text>);
    expect(getByText("Strong Text")).toBeInTheDocument();
    expect(getByText("Strong Text").tagName).toBe("SPAN");
  });

  it("renders small text correctly", () => {
    const { getByText } = render(<Text variant="small">Small Text</Text>);
    expect(getByText("Small Text")).toBeInTheDocument();
    expect(getByText("Small Text").tagName).toBe("SPAN");
  });

  it("renders button text correctly", () => {
    const { getByText } = render(
      <Text variant="button-text">Button Text</Text>
    );
    expect(getByText("Button Text")).toBeInTheDocument();
    expect(getByText("Button Text").tagName).toBe("SPAN");
  });

  it("renders quote text correctly", () => {
    const { getByText } = render(<Text variant="quote">Quote Text</Text>);
    expect(getByText("Quote Text")).toBeInTheDocument();
    expect(getByText("Quote Text").tagName).toBe("SPAN");
  });

  it("renders custom text correctly", () => {
    const { getByText } = render(<Text variant="custom">Custom Text</Text>);
    expect(getByText("Custom Text")).toBeInTheDocument();
    expect(getByText("Custom Text").tagName).toBe("SPAN");
  });
});
