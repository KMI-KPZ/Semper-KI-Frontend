import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface HomeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * HomeContainer component is a React functional component that wraps its children
 * inside a styled div element. It accepts custom styles and class names as props.
 *
 * @param {PropsWithChildren<HomeContainerProps>} props - The props for the HomeContainer component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the container.
 * @param {React.CSSProperties} [props.style] - Optional custom styles to be applied to the container.
 * @param {string} [props.className] - Optional custom class names to be applied to the container.
 * @param {object} [props.restProps] - Any additional props to be spread onto the container div.
 *
 * @returns {JSX.Element} The rendered HomeContainer component.
 */
const HomeContainer: React.FC<PropsWithChildren<HomeContainerProps>> = (
  props
) => {
  const { children, style, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge(
        "relative z-10 flex w-full flex-col items-center justify-normal gap-5  bg-white p-5   ",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default HomeContainer;
