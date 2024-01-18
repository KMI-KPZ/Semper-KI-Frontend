import React from "react";
import { queryByText, render, screen } from "@test/render";
import { Badge, IconBadge } from "./Badge";

describe("Badge", () => {
  it("renders the children when count is 0", () => {
    const { getByText } = render(
      <Badge count={0}>
        <span>Badge Content</span>
      </Badge>
    );

    expect(getByText("Badge Content")).toBeInTheDocument();
  });

  it("renders the badge with count when count is not 0", () => {
    const { getByText } = render(
      <Badge count={5}>
        <span>Badge Content</span>
      </Badge>
    );

    expect(getByText("5")).toBeInTheDocument();
  });

  it("renders the badge without count when count is not 0 and showNumber is false", () => {
    const { getByText } = render(
      <Badge count={5} showNumber={false}>
        <span>Badge Content</span>
      </Badge>
    );

    expect(getByText("Badge Content")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeNull();
  });

  it("renders the badge with count when count is not 0 and showNumber is true", () => {
    const { getByText } = render(
      <Badge count={5} showNumber={true}>
        <span>Badge Content</span>
      </Badge>
    );

    expect(getByText("5")).toBeInTheDocument();
  });
});

describe("IconBadge", () => {
  it("renders the icon and children", () => {
    const { getByText } = render(
      <IconBadge icon={<span>Icon</span>}>
        <span>Badge Content</span>
      </IconBadge>
    );

    expect(getByText("Icon")).toBeInTheDocument();
    expect(getByText("Badge Content")).toBeInTheDocument();
  });
});
