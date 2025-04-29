import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Breadcrumb, isDataNaviagtionTranlationType } from "./Breadcrumb";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("@component-library/index", () => ({
  Button: ({ children, title, testid }: any) => (
    <button data-testid={testid}>{title || children}</button>
  ),
}));

jest.mock("@mui/icons-material/Home", () => () => "HomeIcon");

describe("isDataNaviagtionTranlationType", () => {
  it("should return true for valid navigation types", () => {
    expect(isDataNaviagtionTranlationType("home")).toBe(true);
    expect(isDataNaviagtionTranlationType("projects")).toBe(true);
    expect(isDataNaviagtionTranlationType("login")).toBe(true);
  });

  it("should return false for invalid navigation types", () => {
    expect(isDataNaviagtionTranlationType("invalid-type")).toBe(false);
    expect(isDataNaviagtionTranlationType("")).toBe(false);
    expect(isDataNaviagtionTranlationType("nonexistent")).toBe(false);
  });
});

describe("Breadcrumb", () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it("should not render breadcrumbs for root path", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/",
    });

    render(<Breadcrumb />);
    const breadcrumbButtons = screen.queryAllByTestId(/breadcrumb/);
    expect(breadcrumbButtons.length).toBe(0);
  });

  it("should render home breadcrumb for simple paths", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/account",
    });

    render(<Breadcrumb />);

    const homeButton = screen.getByTestId("breadcrumb-home-button");
    const regularButton = screen.getByTestId("breadcrumb-button");

    expect(homeButton).toBeInTheDocument();
    expect(regularButton).toBeInTheDocument();
  });

  it("should render correct breadcrumbs for /projects path", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/projects",
    });

    render(<Breadcrumb />);

    const homeButton = screen.getByTestId("breadcrumb-home-button");
    const projectsButton = screen.getByTestId("breadcrumb-button");

    expect(homeButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
  });

  it("should render correct breadcrumbs for projects with ID", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/projects/123",
    });

    render(<Breadcrumb />);

    const breadcrumbButtons = screen.getAllByTestId(/breadcrumb/);
    expect(breadcrumbButtons.length).toBe(3);
  });

  it("should render correct breadcrumbs for projects with process", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/projects/123/process",
    });

    render(<Breadcrumb />);

    const breadcrumbButtons = screen.getAllByTestId(/breadcrumb/);
    expect(breadcrumbButtons.length).toBe(4);
  });

  it("should render correct breadcrumbs for complex project paths", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/projects/123/process/456",
    });

    render(<Breadcrumb />);

    const breadcrumbButtons = screen.getAllByTestId(/breadcrumb/);
    expect(breadcrumbButtons.length).toBe(4);
  });

  it("should handle arbitrary paths correctly", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/materials/metal/steel",
    });

    render(<Breadcrumb />);

    const breadcrumbButtons = screen.getAllByTestId(/breadcrumb/);
    expect(breadcrumbButtons.length).toBe(4);
  });
});
