import React from "react";
import { Container, Heading } from "@component-library/index";
import { twMerge } from "tailwind-merge";
import { TWBreakpoint, useBreakpoint } from "@/hooks/useBreakePoints";

interface HomeHeaderProps {
  title: string;
  variant: "h1" | "h2" | "h3" | "h4" | "subtitle";
  headerClassName?: string;
  color?: "light" | "dark";
}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
  const { title, variant, headerClassName = "", color = "dark" } = props;

  const breakPoint = useBreakpoint();

  const numDots = Math.ceil(
    title.length * (breakPoint >= TWBreakpoint.md ? 0.75 : 0.5)
  ); // Adjust based on your needs

  return (
    <Container
      width="fit"
      direction="col"
      justify="start"
      items="start"
      className="relative pb-10"
    >
      <Heading
        variant={variant}
        className={twMerge(
          "dotted-underline w-full hyphens-auto  ",
          color === "dark" ? "text-white" : "text-ultramarinblau-dark",
          headerClassName
        )}
      >
        {title}
      </Heading>
      <div className="absolute left-0 top-10  flex h-[6px] w-[calc(100%+40px)] flex-row items-center justify-start gap-4 overflow-clip md:overflow-visible">
        {[...Array(numDots)].map((_, index) => (
          <div>
            <svg
              viewBox="0 0 12 12"
              className={`h-[6px] w-[6px] ${
                color === "dark" ? "fill-türkis" : "fill-ultramarinblau-dark"
              }`}
              key={index}
            >
              <ellipse cx="6" cy="6" rx="6" ry="6" />
            </svg>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomeHeader;
