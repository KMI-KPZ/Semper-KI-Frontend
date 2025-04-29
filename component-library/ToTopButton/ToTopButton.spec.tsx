import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ToTopButton from "./ToTopButton";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ToTopButton", () => {
  it("should render without crashing", () => {
    const { getByTitle } = render(<ToTopButton />);
    expect(
      getByTitle("component-library.ToTopButton.button.toTop")
    ).toBeInTheDocument();
  });

  it("should scroll to top when clicked", () => {
    const { getByTitle } = render(<ToTopButton />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    const button = getByTitle("component-library.ToTopButton.button.toTop");
    fireEvent.click(button);
    expect(document.body.scrollTop).toBe(0);
  });
});
