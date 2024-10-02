import React from "react";
import { Container, Heading } from "@component-library/index";
import { twMerge } from "tailwind-merge";
import { useBreakpoint } from "@/hooks/useBreakePoints";

interface HomeHeaderProps {
  title: string;
  variant: "h1" | "h2" | "h3" | "h4" | "subtitle";
  headerClassName?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
  const { title, variant, headerClassName = "" } = props;

  const breakPoint = useBreakpoint();

  const numDots = Math.ceil(title.length * (breakPoint === "md" ? 0.8 : 0.45)); // Adjust based on your needs

  return (
    <Container
      width="fit"
      direction="col"
      justify="start"
      align="start"
      className="relative pb-10"
    >
      <Heading
        variant={variant}
        className={twMerge(
          "dotted-underline w-full hyphens-auto text-white ",
          headerClassName
        )}
      >
        {title}
      </Heading>
      <div className="absolute left-0 top-10 flex h-[6px] w-[calc(100%+40px)] flex-row items-center justify-start gap-4">
        {[...Array(numDots)].map((_, index) => (
          <div>
            <svg
              viewBox="0 0 12 12"
              className="h-[6px] w-[6px] fill-türkis"
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
