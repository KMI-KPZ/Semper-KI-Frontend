import React from "react";
import { render, fireEvent } from "@test/render";
import CkBanner from "./CkBanner";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe.skip("CookieBanner", () => {
  it("renders correctly", () => {
    const acceptCookies = jest.fn();
    const rejectCookies = jest.fn();

    const { getByText } = render(<CkBanner />);

    expect(getByText("Cookie Banner Heading")).toBeInTheDocument();
    expect(getByText("Cookie Banner Message")).toBeInTheDocument();
    expect(getByText("Accept")).toBeInTheDocument();
    expect(getByText("Reject")).toBeInTheDocument();
    expect(getByText("Show Settings")).toBeInTheDocument();
    expect(getByText("Cookie Policy")).toBeInTheDocument();
    expect(getByText("Data Protection")).toBeInTheDocument();
    expect(getByText("Imprint")).toBeInTheDocument();
  });

  it("calls acceptCookies when Accept button is clicked", () => {
    const acceptCookies = jest.fn();
    const rejectCookies = jest.fn();

    const { getByText } = render(<CkBanner />);

    fireEvent.click(getByText("Accept"));

    expect(acceptCookies).toHaveBeenCalled();
  });

  it("calls rejectCookies when Reject button is clicked", () => {
    const acceptCookies = jest.fn();
    const rejectCookies = jest.fn();

    const { getByText } = render(<CkBanner />);

    fireEvent.click(getByText("Reject"));

    expect(rejectCookies).toHaveBeenCalled();
  });

  it("toggles showSettings when Show Settings button is clicked", () => {
    const acceptCookies = jest.fn();
    const rejectCookies = jest.fn();

    const { getByText } = render(<CkBanner />);

    fireEvent.click(getByText("Show Settings"));

    expect(getByText("Functional Heading")).toBeInTheDocument();
    expect(getByText("Always Active")).toBeInTheDocument();
    expect(getByText("Functional Message")).toBeInTheDocument();

    fireEvent.click(getByText("Show Settings"));

    expect(getByText("Functional Heading")).not.toBeInTheDocument();
    expect(getByText("Always Active")).not.toBeInTheDocument();
    expect(getByText("Functional Message")).not.toBeInTheDocument();
  });
});
