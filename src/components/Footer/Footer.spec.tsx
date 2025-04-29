import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

// Mock the components and hooks
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "components.Footer.imprint": "Imprint",
        "components.Footer.privacy": "Privacy",
        "components.Footer.contact": "Contact",
        "components.Footer.magazin": "Magazine",
        "components.Footer.instagram": "LinkedIn",
        "components.Footer.mastodon": "Mastodon",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("../Form/ContactForm", () => {
  return function MockedContactForm() {
    return <div data-testid="contact-form">Contact Form</div>;
  };
});

jest.mock("@component-library/index", () => ({
  Button: ({ title, children, onClick }: any) => (
    <button onClick={onClick} data-testid={`button-${title}`}>
      {title}
      {children}
    </button>
  ),
  Modal: ({ open, modalKey, children, closeModal }: any) =>
    open ? (
      <div data-testid={`modal-${modalKey}`}>
        {children}
        <button onClick={closeModal} data-testid="close-modal">
          Close
        </button>
      </div>
    ) : null,
}));

jest.mock("@icons/Mastodon.svg", () => ({
  ReactComponent: () => <div data-testid="mastodon-icon" />,
}));

jest.mock("@mui/icons-material/LinkedIn", () => {
  return function MockLinkedInIcon() {
    return <div data-testid="linkedin-icon" />;
  };
});

jest.mock("@mui/icons-material/Newspaper", () => {
  return function MockNewspaperIcon() {
    return <div data-testid="newspaper-icon" />;
  };
});

describe("Footer Component", () => {
  test("renders footer with all links", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    expect(screen.getByTestId("button-Imprint")).toBeInTheDocument();
    expect(screen.getByTestId("button-Privacy")).toBeInTheDocument();
    expect(screen.getByTestId("button-Contact")).toBeInTheDocument();
    expect(screen.getByTestId("button-Magazine")).toBeInTheDocument();
    expect(screen.getByTestId("button-LinkedIn")).toBeInTheDocument();
    expect(screen.getByTestId("button-Mastodon")).toBeInTheDocument();
  });

  test("renders copyright text", () => {
    render(<Footer />, { wrapper: BrowserRouter });
    expect(screen.getByText(/© 2023 Semper-KI/)).toBeInTheDocument();
  });

  test("opens modal when contact button is clicked", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    // Initially the modal should not be visible
    expect(screen.queryByTestId("modal-ContactForm")).not.toBeInTheDocument();

    // Click on contact button
    fireEvent.click(screen.getByTestId("button-Contact"));

    // Now modal should be visible
    expect(screen.getByTestId("modal-ContactForm")).toBeInTheDocument();
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    // Open the modal
    fireEvent.click(screen.getByTestId("button-Contact"));
    expect(screen.getByTestId("modal-ContactForm")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByTestId("close-modal"));
    expect(screen.queryByTestId("modal-ContactForm")).not.toBeInTheDocument();
  });
});
