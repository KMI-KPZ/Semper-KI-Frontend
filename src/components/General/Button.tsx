import React, { ReactNode } from "react";

interface Props {
  title?: string;
  onClick(): void;
  icon?: any;
  active?: boolean;
  children?: ReactNode;
}

const Button: React.FC<Props> = (props) => {
  const { active, icon, onClick, title, children } = props;

  return (
    <div
      title={
        title !== undefined
          ? title
          : typeof children === "string"
          ? children
          : ""
      }
      className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer text-white"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
